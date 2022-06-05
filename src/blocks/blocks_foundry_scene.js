class ActivateSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_activate_scene";
        this.category = "Foundry.Scene";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Scene.ActivateScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Scene.ActivateScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Scene.ActivateScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Scene.ActivateScene.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${scene_input}) await ${scene_input}.activate();`;
    }
}

class ViewSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_view_scene";
        this.category = "Foundry.Scene";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Scene.ViewScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Scene.ViewScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Scene.ViewScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Scene.ViewScene.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${scene_input}) await ${scene_input}.view();`;
    }
}

class GetAllScenesCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_all_scenes";
        this.category = "Foundry.Scene";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Scene.GetAllScenes.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Scene.GetAllScenes.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Scene.GetAllScenes.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Scene.GetAllScenes.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.scenes`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetCurrentSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_current_scene";
        this.category = "Foundry.Scene";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Scene.GetCurrentScene.Title"),
            "output": "Scene",
            "colour": game.i18n.localize("LibBlockly.Blocks.Scene.GetCurrentScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Scene.GetCurrentScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Scene.GetCurrentScene.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`canvas.scene`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetSceneByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_scene_by_name_or_id";
        this.category = "Foundry.Scene";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Scene.GetSceneByNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Scene"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Scene.GetSceneByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Scene.GetSceneByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Scene.GetSceneByNameOrId.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_lookuptype = block.getFieldValue('lookupType');
        const value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
        switch (dropdown_lookuptype) {
            case "name":
                return [`game.scenes.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.scenes.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new GetSceneByNameOrIdCustomBlock(),
        new ViewSceneCustomBlock(),
        new ActivateSceneCustomBlock(),
        new GetCurrentSceneCustomBlock(),
        new GetAllScenesCustomBlock()
    ]);
})
