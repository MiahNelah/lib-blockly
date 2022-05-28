import { LibBlocky } from "./LibBlockly";

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
            editorArea: document.querySelector(`${this._context} div.form-group.stacked.command`),
            typeSelect: document.querySelector(`${this._context} select[name='type']`),
            commandTextArea: document.querySelector(`${this._context} div.form-group.stacked.command textarea[name="command"]`)
        }

        this._prepareMacroConfig(data.document, config);
    }

    /**
     *
     */
    _appendBlockyTypeToSelect() {
        const blocklyOption = document.createElement("option");
        blocklyOption.value = "chat";
        blocklyOption.dataset.blockly = true;
        blocklyOption.innerText = "Blockly";

        this._formElements.typeSelect.appendChild(blocklyOption);

        this._formElements.blocklyTypeOption = document.querySelector(`${this._context} select[name='type'] option[data-blockly]`);
    }

    /**
     *
     * @param {HTMLElement} editor
     * @param {HTMLElement} command
     */
    _onMacroTypeChanged(editor, command) {
        const currentSelection = this._formElements.typeSelect.querySelector("option:selected");
        const isBlocklyTypeSelected = currentSelection.dataset.blockly === true;
        editor.hidden = isBlocklyTypeSelected ? "" : "hidden";
        command.hidden = !isBlocklyTypeSelected ? "" : "hidden";
    }

    /**
     *
     */
    _activateListeners() {
        // Create hidden input to persist blockly state (true: is a blockly script, false: not a blockly script)
        const editorArea = this._appendFlagsInput(blocklyTag);

        // Create editor placeholder
        const blocklyTag = this._appendEditorPlaceholder(editorArea);

        // Setup event listener on Type select to enable editor if needed
        this._formElements.typeSelect.adEventListener("change", function () {
            this._onMacroTypeChanged(this._formElements.editor, this._formElements.commandTextArea);
        });
    }

    /**
     *
     */
    _appendEditorPlaceholder() {
        const blocklyTag = document.createElement("div");
        blocklyTag.classname = "blockly";

        this._formElements.editorArea.appendChild(blocklyTag);

        this._formElements.editor = document.querySelector(`${this._context} div.blockly`);
    }

    /**
     *
     */
    _appendFlagsInput() {
        // Create hidden input to store workspace blocks
        const blocklyFlagEnabledInput = document.createElement("input");
        blocklyFlagEnabledInput.name = "flags.blockly.enabled";
        blocklyFlagEnabledInput.type = "hidden";
        blocklyFlagEnabledInput.value = "false";

        this._formElements.editorArea.appendChild(blocklyFlagEnabledInput);

        this._formElements.flagEnabled = document.querySelector(`${this._context} input[name=flags.blockly.enabled]`);


        const blocklyFlagWorkspacedInput = document.createElement("input");
        blocklyFlagWorkspacedInput.name = "flags.blockly.workspace";
        blocklyFlagWorkspacedInput.type = "hidden";
        blocklyFlagWorkspacedInput.value = "";

        this._formElements.editorArea.appendChild(blocklyFlagWorkspacedInput);

        this._formElements.flagWorkspace = document.querySelector(`${this._context} input[name=flags.blockly.workspace]`);
    }

    /**
     *
     * @param {String} type Must be "chat", "script" or "blockly".
     */
    _changeType(type) {
        switch (type) {
            case "chat":
            case "script":
                typeSelect.value = type;
                this._formElements.flagEnabled.value = "false";
                break;

            case "blockly":
                typeSelect.querySelectorAll("option").forEach(option => option.removeAttribute("selected"));
                this._formElements.blocklyTypeOption.selected = "selected";
                this._formElements.flagEnabled.value = "true";
                break;

            default:
                console.warn(`[${LibBlocky.name}] Invalid macro type ${type}. Expecting values are "chat", "script" or "blockly".`);
                return;
        }

        this._onMacroTypeChanged(blocklyTag, commandTextArea);
    }

    /**
     *
     * @param {*} event
     */
    _onWorkspaceChanged(event) {
        // TODO: this event handling cause a lot of useless operation. Need to try to catch less events from overzealous blockly events
        if (!event.isUiEvent) {
            this._formElements.flagWorkspace.value = this.save();
        }
    }

    /**
     *
     * @param {Macro} macro
     * @param {Object} config
     */
    _prepareMacroConfig(macro, config) {
        console.log(`[${LibBlocky.name}] Initialising editor for macro config ${macro.id}`);
        this._appendBlockyTypeToSelect();
        this._appendFlagsInput();
        this._appendEditorPlaceholder();
        this._activateListeners();

        this._inject(`${this._context} div.blockly`, config);

        // Call this once to setup default state
        if (this._isBlocklyEnabled(dmacro)) {
            this._onMacroTypeChanged(blocklyTag, commandTextArea);
        }

        // Load existing workspace if there some
        if (this._isMacroWorkspaceEmpty(macro)) {
            this._workspace = mergeObject(this._workspace, this.load(this._getMacroWorkspace(macro)));
        }


        this._workspace.addChangeListener(onWorkspaceChanged);
        console.log(`[${LibBlocky.name}] Editor initialised for macro config ${macro.id}`);
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
        $(selector).find("svg.blocklySvg").attr('width', "100%").attr('height', "100%");

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

    /**
     *
     * @param {Macro} macro
     * @returns
     */
    _isMacroWorkspaceEmpty(macro) {
        return this._getMacroWorkspace(macro);
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
        return this._formElements.typeSelect.innerText === "Blockly";
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
        return LibBlocky.loadWorkspace(macro);
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