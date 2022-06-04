import {LibBlockly} from "./LibBlockly.js"
import {ZoomToFitControl} from "../libs/plugins/zoom-to-fit/zoom-to-fit.js";
import {Backpack} from "../libs/plugins/workspace-backpack/index.js";

export class BlocklyEditorSheet extends DocumentSheet {
    constructor(object, options) {
        super(object, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            class: ["sheet", "macro-sheet"],
            popOut: true,
            title: game.i18n.localize("LibBlockly.BlocklyEditorSheet.Sheet.Label"),
            template: `modules/${LibBlockly.ID}/templates/blockly-editor-sheet.hbs`,
            width: 960,
            height: 720,
            resizable: true,
            dragDrop: [{dropSelector: null}],
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
    async _onDrop(event) {
        const data = JSON.parse(event.dataTransfer.getData("text"));
        if (data) {
            switch (data.type) {
                case "Scene":
                    this._onDropScene(event, data);
                    break;
                case "Actor":
                    this._onDropActor(event, data);
                    break;
                case "Item":
                    this._onDropItem(event, data);
                    break;
                case "Journal":
                    this._onDropJournal(event, data);
                    break;
                case "RollTable":
                    this._onDropRollTable(event, data);
                    break;
                case "Playlist":
                    this._onDropPlaylist(event, data);
                    break;
                case "Compendium":
                    this._onDropCompendium(event, data);
                    break;
                case "Macro":
                    this._onDropMacro(event, data);
                    break;
            }
        }
    }

    /* overrides */
    get id() {
        return `blockly-editor-${this.object.id}`;
    }

    _injectEditor(event) {
        this.workspace = Blockly.inject(`div.blockly[data-macro-id=${this.object.id}]`, LibBlockly._buildWorkspaceConfig());
        Blockly.JavaScript.addReservedWords(this.workspace);
        this._loadWorkspace(this.workspace);

        // Enable "Zoom to fit" feature
        this.zoomToFit = new ZoomToFitControl(this.workspace);
        this.zoomToFit.init();

        // Enable "Backpack" feature
        this.backpack = new Backpack(this.workspace);
        this.backpack.init();
    }

    async _onExecute(event) {
        event.preventDefault();
        await this._onSubmit(event, {preventClose: true, preventRender: true});
        this.object.execute();
    }

    async _onConvert(event) {
        const dialog = new Dialog({
                title: game.i18n.localize("LibBlockly.JavascriptPreview.Title"),
                // TODO: convert to template
                content: `<textarea class="blockly-javascript-preview" rows="12" cols="80">${Blockly.JavaScript.workspaceToCode(this.workspace)}</textarea>`,
                buttons: {
                    one: {
                        icon: `<i class="fas fa-copy"></i>`,
                        label: game.i18n.localize("LibBlockly.JavascriptPreview.Copy"),
                        callback: async () => {
                            await navigator.clipboard.writeText(Blockly.JavaScript.workspaceToCode(this.workspace));
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

    /* overrides */
    _injectHTML(html) {
        super._injectHTML(html);
        this._injectEditor();
    }

    /* overrides */
    setPosition(position) {
        super.setPosition(position);
        Blockly.svgResize(this.workspace);
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
        this.workspace.addChangeListener(this._onWorkspaceChanged.bind(this));
    }

    _onWorkspaceChanged(event) {
        if (event.isUiEvent && event.type === "backpack_change") {
            LibBlockly.backpack = this.backpack.getContents();
        }
        if (event.isUiEvent && event.type === "backpack_open") {
            this.backpack.setContents(LibBlockly.backpack);
        }
    }

    _loadWorkspace(workspace) {
        Blockly.JavaScript.addReservedWords(workspace);
        const serialisedWorkspace = this.object.data.flags.blockly?.workspace;
        if (serialisedWorkspace) {
            Blockly.serialization.workspaces.load(JSON.parse(serialisedWorkspace), workspace);
        }
    }

    /* overrides */
    async _updateObject(event, formData) {
        if (!this.object.id) {
            return Macro.create(formData);
        } else {
            formData.flags = {
                blockly: {
                    workspace: JSON.stringify(Blockly.serialization.workspaces.save(this.workspace))
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
            current: this.object.data.img,
            callback: path => {
                event.currentTarget.src = path;
                this._onSubmit(event, {preventClose: true, preventRender: true});
            },
            top: this.position.top + 40,
            left: this.position.left + 10
        });
        return fp.browse();
    }

    _onDropScene(event, data) {
        const id = data.id;
        const newChild = this.workspace.newBlock("foundry_scene_get_scene_dropdown");
        newChild.getField("scene-id").setValue(id);
        newChild.initSvg();
        newChild.render();
    }

    _onDropActor(event, data) {
        ui.notifications.warn("Drag & dropping Actor is not yet implemented !");
    }

    _onDropItem(event, data) {
        const id = data.id;
        const newChild = this.workspace.newBlock("foundry_item_get_item_from_world");
        newChild.getField("item-id").setValue(id);
        newChild.initSvg();
        newChild.render();
    }

    _onDropJournal(event, data) {
        ui.notifications.warn("Drag & dropping Journal is not yet implemented !");
    }

    _onDropRollTable(event, data) {
        const id = data.id;
        const newChild = this.workspace.newBlock("foundry_rolltable_get_rolltable_dropdown");
        newChild.getField("rolltable-id").setValue(id);
        newChild.initSvg();
        newChild.render();
    }

    _onDropPlaylist(event, data) {
        const id = data.id;
        const newChild = this.workspace.newBlock("foundry_playlist_get_playlist");
        newChild.getField("playlist-id").setValue(id);
        newChild.initSvg();
        newChild.render();
    }

    _onDropCompendium(event, data) {
        ui.notifications.warn("Drag & dropping Compendium is not yet implemented !");
    }

    _onDropMacro(event, data) {
        const id = data.id;
        const getMacroBlock = this.workspace.newBlock("foundry_macro_get_macro");
        getMacroBlock.getField("macro-id").setValue(id);
        getMacroBlock.initSvg();
        getMacroBlock.render();

        const runMacroBlock = this.workspace.newBlock("foundry_macro_run_macro");
        runMacroBlock.initSvg();
        runMacroBlock.render();
        runMacroBlock.getInput("macro").connection.connect(getMacroBlock.outputConnection);
    }
}


