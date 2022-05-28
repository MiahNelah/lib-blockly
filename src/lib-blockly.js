import defaultToolbox from "./blocks/libblocky-toolbox.js"
import "./blocks/blocks_foundry_rolltable.js"
//import blocks_foundry_actors from "./blocks/blocks_foundry_actors.js";

Hooks.once("init", async () => {

    const libBlockly = new LibBlocky({
        toolbox: defaultToolbox
    });
});

class LibBlocky {
    constructor(options) {
        this._initialised = false;
        game.modules.get(LibBlocky.ID()).instance = this;
        this.registerHooks();
        this.registerSettings();
        this._toolbox =  options?.toolbox;
        this._initialised = true;
    }

    registerSettings() {
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

    registerHooks() {
        if (typeof libWrapper !== undefined) {
            const that = this;
            libWrapper.register(LibBlocky.ID(), "Macro.prototype.execute", function(wrapped, ...args) { 
                that.handleBlocklyMacroExecution(this, wrapped, ...args);
            }, libWrapper.WRAPPER);
        }
        Hooks.on("renderMacroConfig", this.onMacroConfigRender.bind(this));
    }

    registerBlock(data, options) {
        if (data === undefined) throw Error("data is undefined.");
        if (typeof data === Object) throw Error(`data must be an object, not ${typeof data}.`);
        if (data.name === undefined) throw Error("data.name is undefined.");
        if (typeof data.name !== 'string') throw Error(`data.name must be a string. not ${typeof data}.`);
        if (data.definition === undefined) throw Error("data.definition is undefined.");
        if (typeof data.definition !== 'object') throw Error(`data.definition must be a function, not ${typeof data}.`);
        if (data.callback === undefined) throw Error("data.callback is undefined.");
        if (typeof data.callback !== 'function') throw Error(`data.callback must be a function, not ${typeof data}.`);
        if (data.toolbox === undefined) throw Error("data.toolbox is undefined.");
        if (typeof data.toolbox !== 'object') throw Error(`data.toolbox must be a object, not ${typeof data}.`);
      //  if (Blockly.Blocks[data.name] !== undefined) throw Error(`Block ${data.name} is already registered.`);
      //  if (Blockly.JavaScript[data.name] !== undefined) throw Error(`Generator for ${data.name} block is already registered.`);

        Blockly.Blocks[data.name] = {
            init: data.definition
        }
        Blockly.JavaScript[data.name] = data.callback;
        this.addToToolbox(data.toolbox);
    }

    registerBlocks(blockList, options) {
        if (blockList === undefined) throw Error("blockList is undefined.");
        if (!Array.isArray(blockList)) throw Error(`blockList must be an array.`);

        blockList.forEach(block => {
            this.registerBlock(block, options);
        })

    }

    buildWorkspaceConfig() {
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
            horizontalLayout: game.settings.get(LibBlocky.ID(), "horizontalLayout")
        }
    }

    onMacroConfigRender(data, html, others) {

        // TODO: rewrite & clean
        const blocklyType = "blockly";

        const macroTypeInput = $($(html).find("select[name='type']")[0]);
        macroTypeInput.append(`<option value="chat">blockly</option>`);

        const commandFormGroup = $(html).find("div.form-group.stacked.command")[0];
        $(commandFormGroup).addClass("blocklyContainer");
        const commandTextarea = $(commandFormGroup).find("textarea[name='command']")[0];
        const blockly = $(`<div class="blockly"/>`);
        const flagEnabledInput = $(`<input type="hidden" name="flags.blockly.enabled" value="false">`);
        const flagWorkspaceInput = $(`<input type="hidden" name="flags.blockly.workspace" value="">`);
        $(commandFormGroup).append(blockly);
        $(commandFormGroup).append(flagEnabledInput);
        $(commandFormGroup).append(flagWorkspaceInput);

        var workspace = this.inject("div.blockly");  
        if (data._onRender === undefined)
            data._onRender = (e)=>Blockly.svgResize(workspace);  

        if (data.document.data.flags.blockly?.enabled === "true") {
            $(macroTypeInput)[0].selectedIndex = 2;
            $(commandTextarea).hide();
            $(blockly).show();
            if (data.document.data.flags.blockly?.workspace !== undefined) {
                $(flagWorkspaceInput).val(data.document.data.flags.blockly?.workspace);
                const json = JSON.parse(data.document.data.flags.blockly?.workspace);
                Blockly.serialization.workspaces.load(json, workspace);
            }
        }

        if (macroTypeInput.find("option:selected")[0].innerText === blocklyType) {
            $(commandTextarea).hide();
            $(blockly).show();
        } else {
            $(commandTextarea).show();
            $(blockly).hide();
        }
        macroTypeInput.on('change', (event) => {
            if (macroTypeInput.find("option:selected")[0].innerText === blocklyType) {
                $(commandTextarea).hide();
                $(blockly).show();
            } else {
                $(commandTextarea).show();
                $(blockly).hide();
            }
        });

        Blockly.JavaScript.addReservedWords(workspace);
        workspace.addChangeListener(event => {
            if (!event.isUiEvent) {
                const json = Blockly.serialization.workspaces.save(workspace);
                $(flagEnabledInput).val(macroTypeInput.find("option:selected")[0].innerText === blocklyType);
                $(flagWorkspaceInput).val(JSON.stringify(json));
            }
        });
        
        
    }

    handleBlocklyMacroExecution(macro, wrapped, ...args) {
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

    addToToolbox(data) {
        if (data === undefined) throw Error("data is undefined.");
        if (typeof data === Object) throw Error(`data must be an object, not ${typeof data}.`);
        //if (data.name === undefined) throw Error("data.name is undefined.");
        //if (typeof data.name !== 'string') throw Error(`data.name must be a string. not ${typeof data.name}.`);
        //if (data.kind === undefined) throw Error("data.kind is undefined.");
        //if (typeof data.kind !== 'string') throw Error(`data.kind must be a string. not ${typeof data.kind}.`);
        this._toolbox = mergeObject(this._toolbox, data);
    }

    inject(selector) {
        const config = this.buildWorkspaceConfig();
        const defaultToolbox = this.toolbox;
        const workspace = Blockly.inject(selector, mergeObject(config, {toolbox:defaultToolbox}));

        // Reserve Javascript keywords
        Blockly.JavaScript.addReservedWords(workspace);
        $(selector).find("svg.blocklySvg").attr('width', "100%").attr('height', "100%");

        return workspace;
    }

    createWorkspace() {
        const config = this.buildWorkspaceConfig();
        const toolbox = this.toolbox;
        const workspace = mergeObject(new Blockly.Workspace(), config, toolbox);
        Blockly.JavaScript.addReservedWords(workspace);
        return workspace;
    }

    saveWorkspace(workspace) {
        const json = Blockly.serialization.workspaces.save(workspace);
        return JSON.stringify(json);
    }

    loadWorkspace(macroObject) {
        let workspace = this.createWorkspace();
        Blockly.serialization.workspaces.load(JSON.parse(macroObject.data.flags.blockly?.workspace), workspace);
        return workspace;
    }

    toJavascript(workspace) {
        return Blockly.JavaScript.workspaceToCode(workspace);
    }

    static ID() {
        return "lib-blockly";
    }

    static get blocklyType() {
        return "blockly";
    }
    get toolbox() {
        return this._toolbox;
    }
    get initialised() {
        return this._initialised;
    }
    static get instance() {
        return game.modules.get(LibBlocky.ID())?.instance;
    }
}