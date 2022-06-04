import {LibBlockly} from "../LibBlockly.js";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_token_get_selected_tokens",
        "message0": "Selected tokens",
        "output": "Array",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_token_change_visibility",
        "message0": "Toggle token's visibility %1",
        "args0": [
            {
                "type": "input_value",
                "name": "token"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_token_hide",
        "message0": "Hide tokens %1",
        "args0": [
            {
                "type": "input_value",
                "name": "token"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_token_show",
        "message0": "Show tokens %1",
        "args0": [
            {
                "type": "input_value",
                "name": "token"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_token_select_tokens",
        "message0": "Select tokens in scene %1",
        "args0": [
            {
                "type": "input_value",
                "name": "tokens",
                "check": [
                    "Array",
                    "Token"
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_token_toggle_combat_state",
        "message0": "Toggle combat state %1",
        "args0": [
            {
                "type": "input_value",
                "name": "token",
                "check": ["Array", "Token"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.JavaScript["foundry_token_get_selected_tokens"] = function (block) {
    return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_token_change_visibility"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

    const tokenVisibilityeHelper = Blockly.JavaScript.provideFunction_("blockly_token_toggle_visibility", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
        `  if(Array.isArray(token) && token.length > 0) {`,
        `    await Promise.all(token.map(t => t.toggleVisibility()));`,
        `  } else if (token instanceof Token) {`,
        `    await token.toggleVisibility();`,
        `  }`,
        `}`
    ]);

    return `await ${tokenVisibilityeHelper}(${token_input});\n`;
}

Blockly.JavaScript["foundry_token_hide"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

    const tokenHideeHelper = Blockly.JavaScript.provideFunction_("blockly_token_hide", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
        `  if(Array.isArray(token) && token.length > 0) {`,
        `    await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => { return {_id: t.id, hidden: true}}));`,
        `  } else if (token instanceof Token) {`,
        `    await canvas.scene.updateEmbeddedDocuments("Token", {_id: token.id, hidden: true});`,
        `  }`,
        `}`
    ]);
    return `await ${tokenHideeHelper}(${token_input});\n`;
}

Blockly.JavaScript["foundry_token_show"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

    const tokenShoweHelper = Blockly.JavaScript.provideFunction_("blockly_token_show", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
        `  if(Array.isArray(token) && token.length > 0) {`,
        `    await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => { return {_id: t.id, hidden: false}}));`,
        `  } else if (token instanceof Token) {`,
        `    await canvas.scene.updateEmbeddedDocuments("Token", {_id: token.id, hidden: false});`,
        `  }`,
        `}`
    ]);

    return `await ${tokenShoweHelper}(${token_input});\n`;
}

Blockly.JavaScript["foundry_token_select_tokens"] = function (block) {
    var tokens_value = Blockly.JavaScript.valueToCode(block, 'tokens', Blockly.JavaScript.ORDER_ATOMIC);
    var tempVar = Blockly.JavaScript.variableDB_.getDistinctName('temp', Blockly.Variables.NAME_TYPE);

    let code = `let ${tempVar} = ${tokens_value};\n`;
    code += `if (${tempVar}) canvas.tokens.selectObjects(${tempVar});\n`;
    return code;
}

Blockly.JavaScript["foundry_token_toggle_combat_state"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

    const toggleCombatStateHelper = Blockly.JavaScript.provideFunction_("blockly_token_toggle_combat_state_helper", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(token) {`,
        `  if(Array.isArray(token) && token.length > 0) {`,
        `    token.forEach(async t => await t.toggleCombat());`,
        `  } else if (token instanceof Token) {`,
        `    await token.toggleCombat();`,
        `  }`,
        `}`
    ]);
    return `if (${token_input}) await ${toggleCombatStateHelper}(${token_input});\n`;
}

const toolbox = [
    {
        "kind": "category",
        "name": "Token",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_token_get_selected_tokens"
            },
            {
                "kind": "block",
                "type": "foundry_token_change_visibility"
            },
            {
                "kind": "block",
                "type": "foundry_token_hide"
            },
            {
                "kind": "block",
                "type": "foundry_token_show"
            },
            {
                "kind": "block",
                "type": "foundry_token_select_tokens"
            },
            {
                "kind": "block",
                "type": "foundry_token_toggle_combat_state"
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    LibBlockly.toolbox
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})


