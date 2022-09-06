import { BlocklyEditorSheet } from "./BlocklyEditorSheet.js";
import { ToolboxManager } from "./ToolboxManager.js";
import { BlockManager } from "./BlockManager.js";
import { Helpers } from "./Helpers.js";
import { WorkspaceLoader } from "./WorkspaceManager.js";

export class LibBlockly {

    constructor() {
        Blockly.ShortcutRegistry.registry.reset();
        this._moduleId = "lib-blockly";
        this._toolboxManager = new ToolboxManager();
        this._blockManager = new BlockManager();
        this._helpers = new Helpers();
        this._definitions = {};
        this._workspaceManager = new WorkspaceLoader();
        this.backpack = [];

        this._registerHooks();
        this._registerSettings();
        game.modules.get(this.MODULE_ID).toolboxManager = this._toolboxManager;
        game.modules.get(this.MODULE_ID).blockManager = this._blockManager;
        game.modules.get(this.MODULE_ID).helpers = this._helpers;

    }

    _registerSettings() {
        game.settings.register(this.MODULE_ID, "collapse", {
            name: game.i18n.localize("LibBlockly.Settings.Collapse.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Collapse.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "comments", {
            name: game.i18n.localize("LibBlockly.Settings.Comments.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Comments.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "disable", {
            name: game.i18n.localize("LibBlockly.Settings.Disable.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Disable.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "trashcan", {
            name: game.i18n.localize("LibBlockly.Settings.Trashcan.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Trashcan.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "horizontalLayout", {
            name: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: false
        });

        game.settings.register(this.MODULE_ID, "zoom-show-controls", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.ShowControls.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.ShowControls.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "zoom-wheel", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.Wheel.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.Wheel.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(this.MODULE_ID, "zoom-startScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.StartScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.StartScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 1.0
        });

        game.settings.register(this.MODULE_ID, "zoom-maxScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.MaxScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.MaxScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 3
        });

        game.settings.register(this.MODULE_ID, "zoom-minScale", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.MinScale.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.MinScale.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 0.3
        });

        game.settings.register(this.MODULE_ID, "zoom-scaleSpeed", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.ScaleSpeed.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.ScaleSpeed.Description"),
            scope: "client",
            config: true,
            type: Number,
            default: 1.2
        });

        game.settings.register(this.MODULE_ID, "zoom-pinch", {
            name: game.i18n.localize("LibBlockly.Settings.Zoom.Pinch.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Zoom.Pinch.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });
    }

    _registerHooks() {
        if (typeof libWrapper !== undefined) {
            libWrapper.register(this.MODULE_ID, "Macro.prototype.execute", function (wrapped, ...args) {
                libBlockly._handleMacroExecution(this, wrapped, ...args);
            }, libWrapper.WRAPPER);
        }
    }

    _handleMacroExecution(macro, wrapped, ...args) {
        if (macro.sheet instanceof BlocklyEditorSheet) {

            const code = [
                `const helpers = libBlockly.helpers;`,
                this._workspaceManager.generateCode(macro)
            ].join("").replaceAll(";", ";\r\n");

            const initialCommand = macro.command;
            const initialType = macro.type;
            let result = undefined;
            try {                
                macro.command = code;
                macro.type = "script";
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
    }

    _buildWorkspaceConfig() {
        return {
            collapse: game.settings.get(this.MODULE_ID, "collapse"),
            comments: game.settings.get(this.MODULE_ID, "comments"),
            disable: game.settings.get(this.MODULE_ID, "disable"),
            trashcan: game.settings.get(this.MODULE_ID, "trashcan"),
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: false
            },
            zoom: {
                controls: game.settings.get(this.MODULE_ID, "zoom-show-controls"),
                wheel: game.settings.get(this.MODULE_ID, "zoom-wheel"),
                startScale: game.settings.get(this.MODULE_ID, "zoom-startScale"),
                maxScale: game.settings.get(this.MODULE_ID, "zoom-maxScale"),
                minScale: game.settings.get(this.MODULE_ID, "zoom-minScale"),
                scaleSpeed: game.settings.get(this.MODULE_ID, "zoom-scaleSpeed"),
                pinch: game.settings.get(this.MODULE_ID, "zoom-pinch"),
            },
            horizontalLayout: game.settings.get(this.MODULE_ID, "horizontalLayout"),
            toolbox: this._toolboxManager.toJson()
        };
    }

    /**
     *
     * @param {!Array.<CustomBlock>} blocks
     */
    registerBlocks(blocks) {
        Blockly.defineBlocksWithJsonArray(
            blocks.map(block =>
                mergeObject({ type: block.key, ...block.init() })
            )
        );
        for (let block of blocks) {
            if (!block || block.constructor.name === "CustomBlock") continue;
            Blockly.JavaScript[block.key] = block.generateCode;
            const category = this._toolboxManager.getCategory(block.category, true);
            category.addBlock(block.kind, block.key);
        };
    }

    registerDefinitions(definitions) {
        this._definitions = mergeObject(this._definitions, definitions);
    }

    getDefinition(definitionName) {
        if (definitionName.indexOf(".") >= 0) {
            let parts = definitionName.split(".");
            let iterator = this._definitions[parts[0]];
            parts.shift();
            while (parts.length > 0) {
                iterator = iterator[parts[0]];
                parts.shift();
            }
            return iterator;
        } else
            return this._definitions[definitionName];
    }

    get MODULE_ID() { return this._moduleId; }
    get helpers() { return this._helpers; }

    /**
     * @deprecated Replace with libBlockly.registerBlocks()
     */
    get blockManager() { return this._blockManager; }

}
Object.freeze(LibBlockly);


Hooks.once("init", async () => {

    const libBlockly = new LibBlockly();
    Object.defineProperty(globalThis, "libBlockly", {
        get: () => libBlockly,
        set: () => { console.error("Can't redefine libBlocky") },
        configurable: false
    });

    Macros.registerSheet(libBlockly.MODULE_ID, BlocklyEditorSheet, {
        label: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
        makeDefault: false
    });
})

