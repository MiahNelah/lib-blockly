import { BlocklyEditor } from "./BlocklyEditor.js";

export class LibBlocky {
    /**
     * 
     * @param {Object} options 
     */
    constructor(options) {
        try {
            console.log(`[${LibBlocky.name}] Initialising...`);
            this._registerHooks();
            this._registerSettings();
            this._toolbox = options?.toolbox;
            this._customToolbox = {};
            game.modules.get(LibBlocky.ID()).instance = this;
        }
        catch (e) {
            console.log(`[${LibBlocky.name}] Something wrong happned while initialising!`);
            throw Error(e);
        }
        finally {
            console.log(`[${LibBlocky.name}] Successfuly initialised`);
        }
    }

    /**
     * 
     * @param {Object} toolbox 
     */
    updateToolbox(toolbox) {
        this._customToolbox = mergeObject(this._customToolbox, toolbox);
        console.log(`[${LibBlocky.name}] Toolbox updated`);
    }

    /**
     * 
     * @returns 
     */
    createWorkspace() {
        const workspace = mergeObject(new Blockly.Workspace(), config);
        Blockly.JavaScript.addReservedWords(workspace);
        return workspace;
    }

    /**
     * 
     * @param {Blockly.Workspace} workspace 
     * @returns 
     */
    saveWorkspace(workspace) {
        const json = Blockly.serialization.workspaces.save(workspace);
        return JSON.stringify(json);
    }

    /**
     * 
     * @param {Macro} macroObject 
     * @returns 
     */
    loadWorkspace(macroObject) {
        let workspace = this.createWorkspace();
        Blockly.serialization.workspaces.load(JSON.parse(macroObject.data.flags.blockly?.workspace), workspace);
        return workspace;
    }

    /**
     * 
     * @param {Blockly.Workspace} workspace 
     * @returns 
     */
    toJavascript(workspace) {
        return Blockly.JavaScript.workspaceToCode(workspace);
    }

    /**
     * 
     */
    _registerHooks() {
        if (typeof libWrapper !== undefined) {
            const that = this;
            libWrapper.register(LibBlocky.ID(), "Macro.prototype.execute", function (wrapped, ...args) {
                that._handleBlocklyMacroExecution(this, wrapped, ...args);
            }, libWrapper.WRAPPER);
        }
        Hooks.on("renderMacroConfig", this._onMacroConfigRender.bind(this));
    }

    /**
     * 
     * @param {Object} data 
     * @param {*} html 
     * @param {Object} others 
     */
    _onMacroConfigRender(data, html, others) {
        new BlocklyEditor(html, data, this._buildWorkspaceConfig());
    }

    /**
     * 
     * @param {Macro} macro 
     * @param {Function} wrapped 
     * @param  {...any} args 
     * @returns 
     */
    _handleBlocklyMacroExecution(macro, wrapped, ...args) {
        if (macro.data.flags.blockly?.enabled !== "true") {
            return wrapped(...args);
        }
        else {
            const workspace = this.loadWorkspace(macro);
            const code = this.toJavascript(workspace);
            const intialCommand = macro.data.command;
            const intialType = macro.data.type;
            macro.data.command = code;
            macro.data.type = "script";
            const result = wrapped(...args);
            macro.data.command = intialCommand;
            macro.data.type = intialType;
            return result;

        }
    }

    /**
     * 
     * @returns 
     */
    _buildWorkspaceConfig() {
        return {
            collapse: game.settings.get(LibBlocky.ID(), "collapse"),
            comments: game.settings.get(LibBlocky.ID(), "comments"),
            disable: game.settings.get(LibBlocky.ID(), "disable"),
            trashcan: game.settings.get(LibBlocky.ID(), "trashcan"),
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: false
            },
            horizontalLayout: game.settings.get(LibBlocky.ID(), "horizontalLayout"),
            toolbox: mergeObject(this._toolbox, this._customToolbox)
        };
    }

    /**
     * 
     */
    _registerSettings() {
        game.settings.register(LibBlocky.ID(), "collapse", {
            name: game.i18n.localize("LibBlocky.Settings.Collapse.Title"),
            hint: game.i18n.localize("LibBlocky.Settings.Collapse.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlocky.ID(), "comments", {
            name: game.i18n.localize("LibBlocky.Settings.Comments.Title"),
            hint: game.i18n.localize("LibBlocky.Settings.Comments.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlocky.ID(), "disable", {
            name: game.i18n.localize("LibBlocky.Settings.Disable.Title"),
            hint: game.i18n.localize("LibBlocky.Settings.Disable.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlocky.ID(), "trashcan", {
            name: game.i18n.localize("LibBlocky.Settings.Trashcan.Title"),
            hint: game.i18n.localize("LibBlocky.Settings.Trashcan.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlocky.ID(), "horizontalLayout", {
            name: game.i18n.localize("LibBlocky.Settings.HorizontalLayout.Title"),
            hint: game.i18n.localize("LibBlocky.Settings.HorizontalLayout.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: false
        });
    }

    /**
     * 
     * @returns 
     */
    static ID() {
        return "lib-blockly";
    }

    /**
     * 
     * @returns 
     */
    static name() {
        return "LibBlocky";
    }

    /**
     * 
     */
    static get instance() {
        return game.modules.get(LibBlocky.ID())?.instance;
    }
}

