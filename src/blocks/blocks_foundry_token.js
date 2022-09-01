class ToggleCombatStateCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_token_toggle_combat_state";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.ToggleCombatState.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.ToggleCombatState.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.ToggleCombatState.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.ToggleCombatState.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.toggleTokenCombatState(${token_input});`;
    }
}

class GetAllTokensCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_all_tokens";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokens.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokens.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokens.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokens.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`await helpers.getAllTokensInScene(canvas.scene)`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetAllTokensInSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_all_tokens_in_scene";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokensInScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokensInScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokensInScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.GetAllTokensInScene.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return [`helpers.getAllTokensInScene(${scene_input})`, Blockly.JavaScript.ORDER_NONE]
    }
}

class GetSelectedTokensCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_scene_get_selected_tokens";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.GetSelectedTokens.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.GetSelectedTokens.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.GetSelectedTokens.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.GetSelectedTokens.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
    }
}

class ToggleTokensVisibilityCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_token_toggle_tokens_visibility";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.ToggleTokensVisibility.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.ToggleTokensVisibility.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.ToggleTokensVisibility.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.ToggleTokensVisibility.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.toggleTokenVisibility(${token_input});`;
    }
}

class ShowTokensCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_token_show_tokens";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.ShowTokens.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.ShowTokens.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.ShowTokens.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.ShowTokens.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, false);`;
    }
}

class HideTokensCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_token_hide_tokens";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.HideTokens.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.HideTokens.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.HideTokens.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.HideTokens.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, true);`;
    }
}

class RotateTokenCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_token_rotate_tokens";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "tokens",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        [
                            game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.AngleMode.By"),
                            "by"
                        ],
                        [

                            game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.AngleMode.To"),
                            "to"
                        ]
                    ]
                },
                {
                    "type": "field_number",
                    "name": "angle",
                    "value": 90
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.RotateToken.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_tokens = Blockly.JavaScript.valueToCode(block, 'tokens', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_mode = block.getFieldValue('mode');
        const number_angle = block.getFieldValue('angle');

        return `await helpers.rotateToken(${value_tokens}, ${number_angle}, "${dropdown_mode}");`;
    }
}

class SetTokenScaleCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_set_token_scale";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.SetTokenScale.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "scale",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.SetTokenScale.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.SetTokenScale.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.SetTokenScale.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const value_scale = Blockly.JavaScript.valueToCode(block, 'scale', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, ${value_scale});`;
    }
}

class ResetTokenScaleCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_reset_token_scale";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.ResetTokenScale.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.ResetTokenScale.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.ResetTokenScale.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.ResetTokenScale.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, 1.0);`;
    }
}

class MoveTokenCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_move_token";
        this.category = "Foundry.Token";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Token.MoveToken.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "distance",
                    "check": "Number"
                },
                {
                    "type": "field_dropdown",
                    "name": "unit",
                    "options": [
                        ["px", "px"],
                        ["ft", "ft"],
                        ["cell", "cell"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        ["↑", "u"],
                        ["↗", "ur"],
                        ["→", "r"],
                        ["↘", "dr"],
                        ["↓", "d"],
                        ["↙", "dl"],
                        ["←", "l"],
                        ["↖", "ul"]
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Token.MoveToken.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Token.MoveToken.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Token.MoveToken.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const value_distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_unit = block.getFieldValue('unit');
        const dropdown_direction = block.getFieldValue('direction');

        var distance = value_distance;
        switch (dropdown_unit) {
            case "ft":  distance = distance * Math.floor(canvas.scene.grid.size / canvas.scene.grid.distance); break;
            case "cell": distance = distance * canvas.scene.grid.size; break;
            case "px":
            default: break;
        }

        const vector = { x: 0, y: 0 };
        if (dropdown_direction.includes("l")) vector.x = -distance;
        if (dropdown_direction.includes("r")) vector.x = distance;
        if (dropdown_direction.includes("u")) vector.y = -distance;
        if (dropdown_direction.includes("d")) vector.y = distance;
        return `await helpers.applyVectorToToken(${value_token}, {x:${vector.x}, y:${vector.y} });`;
    }
}

Hooks.once('ready', () => {
    const libblocky = game.modules.get("libblockly");
    libblocky.blockManager.register([
        new ShowTokensCustomBlock(),
        new HideTokensCustomBlock(),
        new ToggleTokensVisibilityCustomBlock(),
        new GetSelectedTokensCustomBlock(),
        new GetAllTokensCustomBlock(),
        new ToggleCombatStateCustomBlock(),
        new GetAllTokensInSceneCustomBlock(),
        new RotateTokenCustomBlock(),
        new SetTokenScaleCustomBlock(),
        new ResetTokenScaleCustomBlock(),
        //new MoveTokenCustomBlock()
    ]);

})

