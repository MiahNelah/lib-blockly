import { WorkspaceLoader } from "./WorkspaceLoader.js";
import { ZoomToFitControl } from "../libs/plugins/zoom-to-fit/zoom-to-fit.js";
import { Backpack } from "../libs/plugins/workspace-backpack/index.js";

export class BlocklyEditorSheet extends DocumentSheet {
    constructor(object, options) {
        super(object, options);
        this._loader = new WorkspaceLoader();
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            class: ["sheet", "macro-sheet"],
            popOut: true,
            title: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
            template: `modules/${libBlockly.MODULE_ID}/templates/blockly-editor-sheet.hbs`,
            width: 960,
            height: 720,
            resizable: true,
            dragDrop: [{ dropSelector: null }],
            id: "blockly-editor",
            sheetConfig: true
        });
    }

    /* overrides */
    get document() {
        return this.object;
    }

    /* overrides */
    get isEditable() {
        return true;
    }

    /* overrides */
    get title() {
        return `Blockly: ${this.object.name}`;
    }

    /* overrides */
    _canDragDrop(selector) {
        return true;
    }

    /* overrides */
    get id() {
        return `blockly-editor-${this.object.id}`;
    }

    /* overrides */
    async _onDrop(event) {
        const data = JSON.parse(event.dataTransfer.getData("text"));
        if (data) {
            const uuid = `${data.pack ? data.pack + "." : ""}${data.type}.${data.id}`;
            switch (data.type) {
                case "Scene":
                    await this._onDropScene(event, data, uuid);
                    break;
                case "Actor":
                    await this._onDropActor(event, data, uuid);
                    break;
                case "Item":
                    await this._onDropItem(event, data, uuid);
                    break;
                case "JournalEntry":
                    await this._onDropJournal(event, data, uuid);
                    break;
                case "RollTable":
                    await this._onDropRollTable(event, data, uuid);
                    break;
                case "Playlist":
                    await this._onDropPlaylist(event, data, uuid);
                    break;
                case "Compendium":
                    await this._onDropCompendium(event, data, uuid);
                    break;
                case "Macro":
                    await this._onDropMacro(event, data, uuid);
                    break;
            }
        }
    }

    async _injectEditor(event) {        
        this.context = this._loader.inject(`#blockly-macro-${this.object.id}`, this.object);

        // Enable "Zoom to fit" feature
        this.zoomToFit = new ZoomToFitControl(this.context);
        this.zoomToFit.init();

        // Enable "Backpack" feature
        this.backpack = new Backpack(this.context);
        this.backpack.init();
    }

    async _onExecute(event) {
        event.preventDefault();
        await this._onSubmit(event, { preventClose: true, preventRender: true });
        this.object.execute();
    }

    async _onConvert(event) {
        const dialog = new Dialog({
            title: game.i18n.localize("LibBlockly.JavascriptPreview.Title"),
            // TODO: convert to template
            content: `<textarea class="blockly-javascript-preview" rows="12" cols="80">${Blockly.JavaScript.workspaceToCode(this.context)}</textarea>`,
            buttons: {
                one: {
                    icon: `<i class="fas fa-copy"></i>`,
                    label: game.i18n.localize("LibBlockly.JavascriptPreview.Copy"),
                    callback: async () => {
                        await navigator.clipboard.writeText(Blockly.JavaScript.workspaceToCode(this.context));
                    }
                },
                two: {
                    icon: `<i class="fas door-closed"></i>`,
                    label: game.i18n.localize("LibBlockly.JavascriptPreview.Close")
                }
            },
            default: "two"
        }
        );
        dialog.render(true);
    }

    async _render(force=false, options={}) {
        if (!this._loader.isValid(this.object)) {
            this._showErrorDialog();
            await this.close();
            return false;
        };
        super._render(force, options)
    }

    async _showErrorDialog() {
        const errors = this._loader.getErrors(this.object);

        let message = game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Message");
        message = message.replace("%GITHUB_ISSUE_URL%", game.modules.get(libBlockly.MODULE_ID).bugs);

        const dialog = new Dialog({
            title: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
            content: `${message}<textarea readonly="readonly" rows="15">${JSON.stringify(errors.errors)}</textarea>`,
            buttons: {
                copy: {
                    icon: '<i class="fas fa-copy"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Copy"),
                    callback: async () => await navigator.clipboard.writeText(JSON.stringify(errors.errors))
                },
                close: {
                    icon: '<i class="fas fa-door-closed"></i>',
                    label: game.i18n.localize("LibBlocky.CorruptedMacro.Dialog.Button.Close"),
                }
            },
            defaultYes: "close"
        });
        return dialog.render(true);
    }

    /* overrides */
    _injectHTML(html) {
        
        super._injectHTML(html);
        this._injectEditor();
    }

    /* overrides */
    setPosition(position) {
        super.setPosition(position);
        Blockly.svgResize(this.context);
    }

    /* overrides */
    getData(options) {
        const context = super.getData();
        return context;
    }

    /* overrides */
    activateListeners(html) {
        super.activateListeners(html);
        html.find("button.execute").click(this._onExecute.bind(this));
        html.find("button.convert").click(this._onConvert.bind(this));
        if (this.isEditable) html.find('img[data-edit="img"]').click(ev => this._onEditImage(ev));
        this.context.addChangeListener(this._onWorkspaceChanged.bind(this));
    }

    _onWorkspaceChanged(event) {
        if (event.isUiEvent && event.type === "backpack_change") {
            libBlockly.backpack = this.backpack.getContents();
        }
        if (event.isUiEvent && event.type === "backpack_open") {
            this.backpack.setContents(libBlockly.backpack);
        }
    }

    _loadWorkspace(workspace) {
        Blockly.JavaScript.addReservedWords(workspace);
        const serialisedWorkspace = this.object.flags.blockly?.workspace;
        return serialisedWorkspace ? libBlockly.safeLoadWorkspace(serialisedWorkspace, workspace) : undefined;
    }

    /* overrides */
    async _updateObject(event, formData) {
        if (!this.object.id) {
            return Macro.create(formData);
        } else {
            formData.flags = {
                blockly: {
                    workspace: JSON.stringify(Blockly.serialization.workspaces.save(this.context))
                }
            }
            return super._updateObject(event, formData);
        }
    }

    /**
     * Handle changing the actor profile image by opening a FilePicker
     * @private
     */
    _onEditImage(event) {
        const fp = new FilePicker({
            type: "image",
            current: this.object.img,
            callback: path => {
                event.currentTarget.src = path;
                this._onSubmit(event, { preventClose: true, preventRender: true });
            },
            top: this.position.top + 40,
            left: this.position.left + 10
        });
        return fp.browse();
    }

    async _onDropScene(event, data, uuid) {
        const scene = await fromUuid(uuid);

        const getSceneBlock = this.context.newBlock("foundry_scene_get_scene_by_name_or_id");
        getSceneBlock.getField("lookupType").setValue("name");
        getSceneBlock.initSvg();
        getSceneBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(scene.name);
        text.initSvg();
        text.render();

        getSceneBlock.getInput("input").connection.connect(text.outputConnection);
    }

    async _onDropActor(event, data, uuid) {
        const actor = await fromUuid(uuid);

        const getActorNyNameBlock = this.context.newBlock("foundry_actor_get_actor_by_name_or_id");
        getActorNyNameBlock.getField("lookupType").setValue("name");
        getActorNyNameBlock.initSvg();
        getActorNyNameBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(actor.name);
        text.initSvg();
        text.render();

        getActorNyNameBlock.getInput("input").connection.connect(text.outputConnection);
    }

    async _onDropItem(event, data, uuid) {
        const item = await fromUuid(uuid);

        const getItemNyNameBlock = this.context.newBlock("foundry_item_get_item_by_name_or_id");
        getItemNyNameBlock.getField("lookupType").setValue("name");
        getItemNyNameBlock.initSvg();
        getItemNyNameBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(item.name);
        text.initSvg();
        text.render();

        getItemNyNameBlock.getInput("input").connection.connect(text.outputConnection);
    }

    async _onDropJournal(event, data, uuid) {
        const journal = await fromUuid(uuid);

        const getJournalBlock = this.context.newBlock("foundry_journal_get_journal_by_name_or_id");
        getJournalBlock.getField("lookupType").setValue("name");
        getJournalBlock.initSvg();
        getJournalBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(journal.name);
        text.initSvg();
        text.render();

        getJournalBlock.getInput("input").connection.connect(text.outputConnection);
    }

    async _onDropRollTable(event, data, uuid) {
        const rolltable = await fromUuid(uuid);

        const getRolltableBlock = this.context.newBlock("foundry_rolltable_get_roltable_by_name_or_id");
        getRolltableBlock.getField("lookupType").setValue("name");
        getRolltableBlock.initSvg();
        getRolltableBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(rolltable.name);
        text.initSvg();
        text.render();

        getRolltableBlock.getInput("input").connection.connect(text.outputConnection);

        const rollTableBlock = this.context.newBlock("foundry_rolltable_roll_table");
        rollTableBlock.initSvg();
        rollTableBlock.render();
        rollTableBlock.getInput("rolltable").connection.connect(getRolltableBlock.outputConnection);
    }

    async _onDropPlaylist(event, data, uuid) {
        const playlist = await fromUuid(uuid);

        const getPlaylistNyNameBlock = this.context.newBlock("foundry_playlist_get_playlist_by_name_or_id");
        getPlaylistNyNameBlock.getField("lookupType").setValue("name");
        getPlaylistNyNameBlock.initSvg();
        getPlaylistNyNameBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(playlist.name);
        text.initSvg();
        text.render();

        getPlaylistNyNameBlock.getInput("input").connection.connect(text.outputConnection);
    }

    async _onDropCompendium(event, data, uuid) {
        ui.notifications.warn("Drag & dropping Compendium is not yet implemented !");
    }

    async _onDropMacro(event, data, uuid) {
        const macro = await fromUuid(uuid);

        const getMacroBlock = this.context.newBlock("foundry_macro_get_macro_by_name_or_id");
        getMacroBlock.getField("lookupType").setValue("name");
        getMacroBlock.initSvg();
        getMacroBlock.render();

        const text = this.context.newBlock("text");
        text.getField("TEXT").setValue(macro.name);
        text.initSvg();
        text.render();

        getMacroBlock.getInput("input").connection.connect(text.outputConnection);

        const runMacroBlock = this.context.newBlock("foundry_macro_run_macro");
        runMacroBlock.initSvg();
        runMacroBlock.render();
        runMacroBlock.getInput("macro").connection.connect(getMacroBlock.outputConnection);
    }
}
Object.freeze(BlocklyEditorSheet);