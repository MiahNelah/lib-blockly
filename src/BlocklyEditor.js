import { LibBlocky } from "./LibBlockly.js";

export class BlocklyEditor {
    /**
     *
     * @param {*} html
     * @param {Object} data
     * @param {Object} config
     */
    constructor(html, data, config) {
        if (html === undefined) throw Error();
        if (data === undefined) throw Error();
        if (config === undefined) throw Error();

        this._id = html[0].id;
        this._data = data;
        this._html = html;
        this._config = config;
        this._context = `div#${this._id}`;


        this._formElements = {
            editorArea: () => document.querySelector(`${this._context} div.form-group.stacked.command`),
            typeSelect: () => document.querySelector(`${this._context} select[name='type']`),
            commandTextArea: () => document.querySelector(`${this._context} div.form-group.stacked.command textarea[name="command"]`),
            editor: () => document.querySelector(`${this._context} div.blockly`),
            flagEnabled: () => document.querySelector(`${this._context} input[name="flags.blockly.enabled"]`),
            flagWorkspace: () => document.querySelector(`${this._context} input[name="flags.blockly.workspace"]`),
            blocklyTypeOption: () => document.querySelector(`${this._context} select[name='type'] option[data-blockly]`)
        }

        this._prepareMacroConfig(data.document, config);
    }

    /**
     *
     */
    _appendBlockyTypeToSelect() {
        if (this._formElements.blocklyTypeOption() === null) {
            const blocklyOption = document.createElement("option");
            blocklyOption.value = "chat";
            blocklyOption.dataset.blockly = true;
            blocklyOption.innerText = "Blockly";

            this._formElements.typeSelect().appendChild(blocklyOption);
        }
    }

    /**
     * 
     */
    _onMacroTypeChanged() {
        const selectedOption = this._formElements.typeSelect()[this._formElements.typeSelect().selectedIndex];
        const isBlockly = selectedOption.dataset.blockly === "true";

        if (isBlockly) {
            this._formElements.editor().removeAttribute("hidden");
            this._formElements.commandTextArea().setAttribute("hidden", undefined);
            this._setBlocklyState("true");
        } else {
            this._formElements.editor().setAttribute("hidden", undefined);
            this._formElements.commandTextArea().removeAttribute("hidden");
            this._setBlocklyState("false");
        }
    }

    /**
     * 
     */
    _activateListeners() {
        // Setup event listener on Type select to enable editor if needed
        this._formElements.typeSelect().addEventListener("change", () => {
            this._onMacroTypeChanged();
        });
    }

    /**
     *
     */
    _appendEditorPlaceholder() {
        if (this._formElements.editor() === null) {
            const blocklyTag = document.createElement("div");
            blocklyTag.className = "blockly";

            this._formElements.editorArea().classList.add("blocklyContainer");
            this._formElements.editorArea().appendChild(blocklyTag);
        }
    }

    /**
     *
     */
    _appendFlagsInput(macro) {
        // Create hidden input to store workspace blocks
        if (this._formElements.flagEnabled() === null) {
            const blocklyFlagEnabledInput = document.createElement("input");
            blocklyFlagEnabledInput.name = "flags.blockly.enabled";
            blocklyFlagEnabledInput.type = "hidden";
            blocklyFlagEnabledInput.value = macro.data.flags.blockly?.enabled;
            this._formElements.editorArea().appendChild(blocklyFlagEnabledInput);
        }

        if (this._formElements.flagWorkspace() === null) {
            const blocklyFlagWorkspacedInput = document.createElement("input");
            blocklyFlagWorkspacedInput.name = "flags.blockly.workspace";
            blocklyFlagWorkspacedInput.type = "hidden";
            blocklyFlagWorkspacedInput.value = macro.data.flags.blockly?.workspace;
            this._formElements.editorArea().appendChild(blocklyFlagWorkspacedInput);
        }

    }

    /**
     *
     * @param {String} type Must be "chat", "script" or "blockly".
     */
    _changeType(type) {
        switch (type) {
            case "chat":
            case "script":
                this._formElements.typeSelect().value = type;
                this._formElements.flagEnabled().value = "false";
                break;

            case "blockly":
                this._formElements.typeSelect().querySelectorAll("option").forEach(option => option.removeAttribute("selected"));
                this._formElements.blocklyTypeOption().selected = "selected";
                this._formElements.flagEnabled().value = "true";
                break;

            default:
                console.warn(`[${LibBlocky.name()}] Invalid macro type ${type}. Expecting values are "chat", "script" or "blockly".`);
                return;
        }
        this._onMacroTypeChanged();
    }

    /**
     *
     * @param {*} event
     */
    _onWorkspaceChanged(event) {
        // TODO: this event handling cause a lot of useless operation. Need to try to catch less events from overzealous blockly events
        if (!event.isUiEvent) {
            this._formElements.flagWorkspace().value = this.save();
        } else {
            Blockly.svgResize(this._workspace);
        }
    }

    /**
     *
     * @param {Macro} macro
     * @param {Object} config
     */
    _prepareMacroConfig(macro, config) {
        console.log(`[${LibBlocky.name()}] Initialising editor for macro config ${macro.id}`);
        this._appendBlockyTypeToSelect();
        this._appendFlagsInput(macro);
        this._appendEditorPlaceholder();
        this._activateListeners();

        this._inject(`${this._context} div.blockly`, config);

        // Call this once to setup default state
        this._onMacroTypeChanged();

        // Load existing workspace if there some
        if (this._isBlocklyEnabled(macro)) {
            if (!this._isMacroWorkspaceEmpty(macro)) {
                this.load(macro);
            }
            this._changeType("blockly");
        }

        this._workspace.addChangeListener((event) => this._onWorkspaceChanged(event));
        console.log(`[${LibBlocky.name()}] Editor initialised for macro config ${macro.id}`);
    }

    /**
     *
     * @param {String} selector
     * @param {Object} config
     */
    _inject(selector, config) {
        const workspace = Blockly.inject(selector, config);

        // Reserve Javascript keywords
        Blockly.JavaScript.addReservedWords(workspace);

        // TODO: remove this hack once resize issues are fixed
        $(this._context).find(`svg.blocklySvg`).attr('width', "100%").attr('height', "100%");

        this._workspace = workspace;
    }

    /**
     *
     * @param {Macro} macro
     * @returns
     */
    _isBlocklyEnabled(macro) {
        return macro.data.flags.blockly?.enabled === "true";
    }

    _setBlocklyState(state) {
        this._formElements.flagEnabled().value = state;
    }

    /**
     *
     * @param {Macro} macro
     * @returns
     */
    _isMacroWorkspaceEmpty(macro) {
        const workspace = this._getMacroWorkspace(macro);
        return workspace === undefined || workspace === 'undefined' || workspace.trim() === "";
    }

    /**
     *
     * @param {Macro} macro
     * @returns
     */
    _getMacroWorkspace(macro) {
        return macro.data.flags.blockly?.workspace;
    }

    /**
     *
     * @returns
     */
    _isBlockyType() {
        return this._formElements.typeSelect().innerText === "Blockly";
    }


    /**
     *
     * @returns
     */
    save() {
        return LibBlocky.saveWorkspace(this._workspace);
    }

    /**
     *
     * @param {Macro} macro
     * @returns {Blockly.Workspace} workspace
     */
    load(macro) {
        Blockly.serialization.workspaces.load(JSON.parse(this._getMacroWorkspace(macro)), this._workspace);
    }

    /**
     *
     * @param {Blockly.Workspace} workspace
     * @returns {String} Javascript code generated for workspace
     */
    toJavascript(workspace) {
        return LibBlocky.toJavascript(this._workspace);
    }

}