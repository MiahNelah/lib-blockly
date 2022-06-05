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

        const toggleCombatStateHelper = Blockly.JavaScript.provideFunction_(`${this.key}_toggle_combat_state`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
            `  if(Array.isArray(token) && token.length > 0) {`,
            `    await Promise.all(token.map(t => t.toggleCombat()));`,
            `  } else if (token instanceof Token) {`,
            `    await token.toggleCombat();`,
            `  }`,
            `}`
        ]);
        return `if (${token_input}) await ${toggleCombatStateHelper}(${token_input});\n`;
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
        return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
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
        return [`(${scene_input} ? ${scene_input}.tokens.contents : [])`, Blockly.JavaScript.ORDER_NONE];
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

        const tokenShoweHelper = Blockly.JavaScript.provideFunction_(`${this.key}_toggle_token_visibility`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
            `  if(Array.isArray(token)) {`,
            `    await Promise.all(token.map(t => t.toggleVisibility()));`,
            `  } else if (token instanceof Token) {`,
            `    await token.toggleVisibility();`,
            `  }`,
            `}`
        ]);

        return `await ${tokenShoweHelper}(${token_input});\n`;
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

        const tokenShoweHelper = Blockly.JavaScript.provideFunction_(`${this.key}_set_token_visibility`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token, hidden) {`,
            `  if(Array.isArray(token)) {`,
            `    await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => { return {_id: t.id, hidden: hidden}}));`,
            `  } else if (token instanceof Token) {`,
            `    await canvas.scene.updateEmbeddedDocuments("Token", {_id: token.id, hidden: hidden});`,
            `  }`,
            `}`
        ]);

        return `await ${tokenShoweHelper}(${token_input}, false);\n`;
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

        const tokenShoweHelper = Blockly.JavaScript.provideFunction_(`${this.key}_set_token_visibility`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token, hidden) {`,
            `  if(Array.isArray(token)) {`,
            `    await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => { return {_id: t.id, hidden: hidden}}));`,
            `  } else if (token instanceof Token) {`,
            `    await canvas.scene.updateEmbeddedDocuments("Token", {_id: token.id, hidden: hidden});`,
            `  }`,
            `}`
        ]);

        return `await ${tokenShoweHelper}(${token_input}, true);\n`;
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new ShowTokensCustomBlock(),
        new HideTokensCustomBlock(),
        new ToggleTokensVisibilityCustomBlock(),
        new GetSelectedTokensCustomBlock(),
        new GetAllTokensCustomBlock(),
        new ToggleCombatStateCustomBlock(),
        new GetAllTokensInSceneCustomBlock()
    ]);
})

