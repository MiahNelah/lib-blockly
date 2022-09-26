class PayloadError extends Error {
    constructor(message, payload) {
        super(message);
        this._payload = payload;
    }

    get payload() { return this._payload }
}

class WorkspaceError extends PayloadError {
    constructor(message, payload) {
        super(message, payload);
    }
}

export class WorkspaceLoader {
    constructor(workspace) {
        this.workspace = workspace;
    }

    loadFromString(originalWorkspace, context) {
        const workspace = this._resolveWorkspace(originalWorkspace);
        const updatedContext = context ?? this._createEmptyWorkspace();
        Blockly.serialization.workspaces.load(JSON.parse(workspace), updatedContext);
        return updatedContext;
    }

    _resolveWorkspace(originalWorkspace) {
        if (!originalWorkspace || originalWorkspace.trim().length === 0) return "{}";
        let migratedWorkspace = undefined;
        const originalWorkspaceErrors = this.analyseWorkspace(originalWorkspace);
        if (originalWorkspaceErrors && originalWorkspaceErrors.length > 0) {

            migratedWorkspace = this._migrate(originalWorkspace);
            const migratedWorkspaceErrors = this.analyseWorkspace(migratedWorkspace);

            if (migratedWorkspaceErrors && migratedWorkspaceErrors.length > 0) {
                throw new WorkspaceError("Macro is corrupted", {
                    system: {
                        id: game.system.id,
                        version: game.system.version
                    },
                    core: {
                        language: game.settings.get("core", "language")
                    },
                    libBlockly: {
                        version: game.modules.get(libBlockly.ID).version
                    },
                    state: {
                        pre: originalWorkspace,
                        post: migratedWorkspace
                    },
                    errors: {
                        pre: originalWorkspaceErrors,
                        post: migratedWorkspaceErrors
                    }
                });
            }
            return migratedWorkspace;
        }
        return originalWorkspace
    }

    loadFromJson(json, context) {
        return this.loadFromString(JSON.stringify(json), context);
    }

    loadFromMacro(macroObject, context) {
        if (!macroObject) throw Error(`macroObject is undefined`);
        return this.loadFromString(macroObject.flags?.blockly?.workspace, context);
    }

    generateCode(macroObject) {
        const workspace = this.loadFromMacro(macroObject);
        return Blockly.JavaScript.workspaceToCode(workspace);
    }

    _createEmptyWorkspace() {
        const workspace = mergeObject(new Blockly.Workspace(), libBlockly._buildWorkspaceConfig());
        Blockly.JavaScript.addReservedWords(workspace);
        return workspace;
    }

    isValid(macroObject) {
        try {
            this.loadFromMacro(macroObject);
        }
        catch (e) {
            return false;
        }
        return true;
    }

    getErrors(macroObject) {
        try {
            this.loadFromMacro(macroObject);
            return undefined;
        } catch (e) {
            return e.payload;
        }
    }

    inject(selector, macroObject) {
        const context = Blockly.inject(selector, libBlockly._buildWorkspaceConfig());
        Blockly.JavaScript.addReservedWords(context);
        return this.loadFromMacro(macroObject, context);
    }

    _showErrorsDialog(oldWorkspace, migratedWorkspace, errors) {
        const bugReport = {
            libBlockly: {
                version: game.modules.get(this.ID).version,
            },
            state: {
                pre: oldWorkspace,
                post: migratedWorkspace,
            },
            errors: errors
        };
        const base64Report = btoa(JSON.stringify(bugReport));


        let message = game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Message");
        message = message.replace("%GITHUB_ISSUE_URL%", game.modules.get(libBlockly.ID).bugs);

        const dialog = new Dialog({
            title: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
            content: `${message}<textarea readonly="readonly" rows="5">${base64Report}</textarea>`,
            buttons: {
                copy: {
                    icon: '<i class="fas fa-copy"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Copy"),
                    callback: async () => await navigator.clipboard.writeText(base64Report)
                },
                close: {
                    icon: '<i class="fas fa-door-closed"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Close"),
                }
            },
            defaultYes: "close"
        });
        dialog.render(true);
        return undefined;
    }

    _loadWorkspace(macroObject, config) {
        const workspace = mergeObject(new Blockly.Workspace(), config);
        Blockly.JavaScript.addReservedWords(workspace);
        this.safeLoadWorkspace(macroObject.flags.blockly?.workspace, workspace);
        return workspace;
    }

    safeLoadWorkspace(serialisedWorkspace, originalWorkspace) {
        const migratedWorkspace = this._migrate(serialisedWorkspace);
        if (!migratedWorkspace) return undefined;
        Blockly.serialization.workspaces.load(JSON.parse(migratedWorkspace), originalWorkspace);
        return migratedWorkspace;
    }

    _migrate(oldWorkspace) {
        if (!oldWorkspace || oldWorkspace.trim().length === 0) throw Error("Macro is empty");
        const changes = {
            "foundry_token_toggle_tokens_visibility": "Foundry.Token.ToggleVisibility",
            "foundry_token_show_tokens": "Foundry.Token.Show",
            "foundry_token_hide_tokens": "Foundry.Token.Hide",
            "foundry_token_rotate_tokens": "Foundry.Token.Rotate",
            "foundry_set_token_scale": "Foundry.Token.SetScale",
            "foundry_reset_token_scale": "Foundry.Token.ResetScale",
            "foundry_move_token": "Foundry.Token.Move",
            
            "foundry_utils_delay": "Foundry.Utils.Wait",
            "foundry_utils_show_notification": "Foundry.Utils.ShowNotification",

            "foundry_chat_send_message": "Foundry.Chat.SendMessage",

            "foundry_actor_get_actor_by_name_or_id":"Foundry.Actor.GetActorByNameOrId",
            "foundry_actor_get_actor_from_token":"Foundry.Actor.GetTokenFromActorCustomBlock",
            "foundry_actor_get_all_actors":"Foundry.Actor.GetAllActors",
            "foundry_actor_get_tokens_of_actor_in_current_scene":"Foundry.Actor.GetTokensOfActorInCurrentScene",

            "foundry_macro_get_all_macros": "Foundry.Macro.GetAll",
            "foundry_macro_get_macro_by_name_or_id":"Foundry.Macro.GetByNameOrId",
            "foundry_macro_run_macro": "Foundry.Macro.Run",
            
            "foundry_roll_roll": "Foundry.Roll.Roll",

            "foundry_rolltable_get_tableresult_data":"Foundry.RollTable.GetTableResultData",
            "foundry_rolltable_get_roltable_by_name_or_id":"Foundry.RollTable.GetByNameOrId",
            "foundry_rolltable_roll_table":"Foundry.RollTable.Roll",

            "foundry_journal_get_journal_by_name_or_id":"Foundry.Journal.GetByNameOrId",
            "foundry_journal_open_journal":"Foundry.Journal.Open",
            "foundry_journal_show_journal_as":"Foundry.Journal.ShowAs",

            "foundry_combat_create_combat":"Foundry.Combat.Create",
            "foundry_combat_get_active_combat":"Foundry.Combat.GetActive",
            "foundry_combat_is_combat_active":"Foundry.Combat.IsActive",
            "foundry_combat_start_combat":"Foundry.Combat.Start",
            "foundry_combat_activate_combat":"Foundry.Combat.Activate",
            "foundry_combat_delete_combat":"Foundry.Combat.Delete",
            "foundry_combat_reset_combat":"Foundry.Combat.Reset",
            "foundry_combat_next_combat_round":"Foundry.Combat.NextRound",
            "foundry_combat_previous_combat_round":"Foundry.Combat.PreviousRound",
            "foundry_combat_next_combat_turn":"Foundry.Combat.NextTurn",
            "foundry_combat_previous_combat_turn":"Foundry.Combat.PreviousTurn",

            "foundry_item_get_item_by_name_or_id":"Foundry.Item.GetByNameOrId",
            "foundry_items_get_items_from_actor_or_token":"Foundry.Item.GetFromActorOrToken",
            "foundry_item_add_item_to_token_or_actor":"Foundry.Item.AddToActorOrToken",
            "foundry_items_remove_items_from_actor_or_token":"Foundry.Item.RemoveFromActorOrToken",

            "foundry_playlist_get_playlist_by_name_or_id":"Foundry.Playlist.GetByNameOrId",
            "foundry_playlist_play_playlist":"Foundry.Playlist.Play",
            "foundry_playlist_play_next_track":"Foundry.Playlist.PlayNext",
            "foundry_playlist_play_previous_track":"Foundry.Playlist.PlayPrevious",
            "foundry_playlist_get_all_playlists":"Foundry.Playlist.GetAll",
            "foundry_playlist_get_playing_playlists":"Foundry.Playlist.GetPlaying",
            "foundry_playlist_stop_playlist":"Foundry.Playlist.Stop",
            "foundry_playlist_cycle_playlist_mode":"Foundry.Playlist.CycleMode",

            "foundry_scene_activate_scene":"Foundry.Scene.Activate",
            "foundry_scene_view_scene":"Foundry.Scene.View",
            "foundry_scene_get_all_scenes":"Foundry.Scene.GetAll",
            "foundry_scene_get_current_scene":"Foundry.Scene.GetCurrent",
            "foundry_scene_get_scene_by_name_or_id":"Foundry.Scene.GetByNameOrId",

            "foundry_user_get_all_user":"Foundry.User.GetAll",
            "foundry_user_get_user_actor":"Foundry.User.GetActor",
            "foundry_user_get_user_token_in_scene":"Foundry.User.GetTokenInScene",
            "foundry_user_get_user_by_name_or_id":"Foundry.User.GetByNameOrId",
            "foundry_user_pull_to_scene":"Foundry.User.PullToScene",
            "foundry_user_ban_user":"Foundry.User.Ban",
            "foundry_user_unban_user":"Foundry.User.Unban",
        };
        let migratedWorkspace = oldWorkspace;
        for (let c in changes) {
            migratedWorkspace = migratedWorkspace.replaceAll(c, changes[c]);
        }

        return migratedWorkspace;
    }

    _showErrorsDialog(oldWorkspace, migratedWorkspace, originalWorkspaceErrors) {
        const bugReport = {
            libBlockly: {
                version: game.modules.get(libBlockly.ID).version,
            },
            state: {
                pre: oldWorkspace,
                post: migratedWorkspace,
            },
            errors: originalWorkspaceErrors
        };
        const base64Report = btoa(JSON.stringify(bugReport));


        let message = game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Message");
        message = message.replace("%GITHUB_ISSUE_URL%", game.modules.get(libBlockly.ID).bugs);

        const dialog = new Dialog({
            title: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
            content: `${message}<textarea readonly="readonly" rows="5">${base64Report}</textarea>`,
            buttons: {
                copy: {
                    icon: '<i class="fas fa-copy"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Copy"),
                    callback: async () => await navigator.clipboard.writeText(base64Report)
                },
                close: {
                    icon: '<i class="fas fa-door-closed"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Close"),
                }
            },
            defaultYes: "close"
        });
        dialog.render(true);
        return undefined;
    }


    analyseWorkspace(originalWorkspace) {
        if (!originalWorkspace) return undefined;
        const json = JSON.parse(originalWorkspace);
        if (!json.blocks?.blocks) return undefined;
        return json.blocks.blocks.flatMap(block => this._analyseBlock(block));
    }

    _analyseBlock(block, parentBlock = undefined) {
        const errors = [];

        if (block.type === undefined) errors.push({ id: block.id, type: block.type, block: block, parent: parentBlock, error: "no-type" });
        if (!Object.keys(Blockly.Blocks).includes(block.type)) errors.push({ id: block.id, type: block.type, block: block, parent: parentBlock, error: "unregistered-type" });
        if (block.next) {
            if (!block.next.block) errors.push({ id: block.id, type: block.type, block: block, parent: parentBlock, error: "empty-next-block" });
            else
                errors.push(...this._analyseBlock(block.next.block, block));
        }
        if (block.inputs) {
            for (let input of Object.keys(block.inputs)) {
                if (!block.inputs[input].block) errors.push({ id: block.id, type: block.type, block: block, parent: parentBlock, input: input, error: "empty-input" });
                else
                    errors.push(...this._analyseBlock(block.inputs[input].block, block));
            }
        }
        return errors;
    }



}
Object.freeze(WorkspaceLoader);