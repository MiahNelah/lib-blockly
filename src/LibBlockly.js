import {BlocklyEditorSheet} from "./BlocklyEditorSheet.js";
import {ToolboxManager} from "./ToolboxManager.js";
import {BlockManager} from "./BlockManager.js";

export const LibBlockly = {
    ID: "libblockly",
    toolboxManager: new ToolboxManager(),
    blockManager: new BlockManager(),
    backpack: [],

    init: function () {
        Blockly.ShortcutRegistry.registry.reset();
        this._registerHooks();
        this._registerSettings();
        game.modules.get(this.ID).toolboxManager = this.toolboxManager;
        game.modules.get(this.ID).blockManager = this.blockManager;
    },

    _registerSettings: function () {
        game.settings.register(LibBlockly.ID, "collapse", {
            name: game.i18n.localize("LibBlockly.Settings.Collapse.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Collapse.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "comments", {
            name: game.i18n.localize("LibBlockly.Settings.Comments.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Comments.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "disable", {
            name: game.i18n.localize("LibBlockly.Settings.Disable.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Disable.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "trashcan", {
            name: game.i18n.localize("LibBlockly.Settings.Trashcan.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Trashcan.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "horizontalLayout", {
            name: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: false
        });

        game.settings.register(LibBlockly.ID, "zoom-show-controls", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.ShowControls.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.ShowControls.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "zoom-wheel", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.Wheel.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.Wheel.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID, "zoom-startScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.StartScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.StartScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 1.0
        });

        game.settings.register(LibBlockly.ID, "zoom-maxScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.MaxScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.MaxScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 3
        });

        game.settings.register(LibBlockly.ID, "zoom-minScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.MinScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.MinScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 0.3
        });

        game.settings.register(LibBlockly.ID, "zoom-scaleSpeed", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.ScaleSpeed.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.ScaleSpeed.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 1.2
        });

        game.settings.register(LibBlockly.ID, "zoom-pinch", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.Pinch.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.Pinch.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });
    },

    _registerHooks: function () {
        if (typeof libWrapper !== undefined) {
            libWrapper.register(LibBlockly.ID, "Macro.prototype.execute", function (wrapped, ...args) {
                LibBlockly._handleMacroExecution(this, wrapped, ...args);
            }, libWrapper.WRAPPER);
        }
    },

    _handleMacroExecution: function (macro, wrapped, ...args) {
        if (macro.sheet instanceof BlocklyEditorSheet) {
            const workspace = this._loadWorkspace(macro, this._buildWorkspaceConfig());
            const initialCommand = macro.command;
            const initialType = macro.type;
            macro.command = Blockly.JavaScript.workspaceToCode(workspace);
            macro.type = "script";
            let result;
            try {
                result = wrapped(...args);
            } catch (e) {
                console.error(e);
                alert(e.message);
            } finally {
                macro.command = initialCommand;
                macro.type = initialType;
            }
            return result;
        } else {
            return wrapped(...args);
        }
    },

    _loadWorkspace: function (macroObject, config) {
        let workspace = mergeObject(new Blockly.Workspace(), config);
        Blockly.JavaScript.addReservedWords(workspace);
        Blockly.serialization.workspaces.load(JSON.parse(macroObject.flags.blockly?.workspace), workspace);
        return workspace;
    },

    _buildWorkspaceConfig: function () {
        return {
            collapse: game.settings.get(LibBlockly.ID, "collapse"),
            comments: game.settings.get(LibBlockly.ID, "comments"),
            disable: game.settings.get(LibBlockly.ID, "disable"),
            trashcan: game.settings.get(LibBlockly.ID, "trashcan"),
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: false
            },
            zoom: {
                controls: game.settings.get(LibBlockly.ID, "zoom-show-controls"),
                wheel: game.settings.get(LibBlockly.ID, "zoom-wheel"),
                startScale: game.settings.get(LibBlockly.ID, "zoom-startScale"),// 1.0,
                maxScale: game.settings.get(LibBlockly.ID, "zoom-maxScale"),//3,
                minScale: game.settings.get(LibBlockly.ID, "zoom-minScale"),//0.3,
                scaleSpeed: game.settings.get(LibBlockly.ID, "zoom-scaleSpeed"),//1.2,
                pinch: game.settings.get(LibBlockly.ID, "zoom-pinch"),//true
            },
            horizontalLayout: game.settings.get(LibBlockly.ID, "horizontalLayout"),
            toolbox: this.toolboxManager.toJson()
        };
    }
}


Hooks.once("init", async () => {
    LibBlockly.init();

    Macros.registerSheet(LibBlockly.ID, BlocklyEditorSheet, {
        label: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
        makeDefault: false
    });
})

