class GetActorByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_actor_get_actor_by_name_or_id";
        this.category = "Foundry.Actor";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Actor.GetActorByNameOrId.Title"),
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
                "Actor"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Actor.GetActorByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Actor.GetActorByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Actor.GetActorByNameOrId.HelpUrl"),
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
                return [`game.actors.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.actors.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

class GetTokenFromActorCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_actor_get_actor_from_token";
        this.category = "Foundry.Actor";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokenFromActor.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token"
                    ]
                }
            ],
            "output": "Actor",
            "colour": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokenFromActor.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokenFromActor.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokenFromActor.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_input}?.actors`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetAllActorsCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_actor_get_all_actors";
        this.category = "Foundry.Actor";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Actor.GetAllActors.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Actor.GetAllActors.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Actor.GetAllActors.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Actor.GetAllActors.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.actors`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetTokensOfActorInCurrentSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_actor_get_tokens_of_actor_in_current_scene";
        this.category = "Foundry.Actor";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokensOfActorInCurrentScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "actor",
                    "check": [
                        "Actor"
                    ]
                }
            ],
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokensOfActorInCurrentScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokensOfActorInCurrentScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Actor.GetTokensOfActorInCurrentScene.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const actor_input = Blockly.JavaScript.valueToCode(block, 'actor', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${actor_input}.getActiveTokens()`, Blockly.JavaScript.ORDER_NONE];
    }
}


Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new GetActorByNameOrIdCustomBlock(),
        new GetTokenFromActorCustomBlock(),
        new GetAllActorsCustomBlock(),
        new GetTokensOfActorInCurrentSceneCustomBlock()
    ]);
})






