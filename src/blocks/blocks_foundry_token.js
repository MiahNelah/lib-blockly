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
      }
]);

Blockly.JavaScript["foundry_token_get_selected_tokens"] = function (block) {
    return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_token_change_visibility"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
    
    let code = `if (${token_input}!==undefined) {\n`;
    code += `\tif(Array.isArray(${token_input}) && ${token_input}.length>0) {\n`;
    code += `\t\t${token_input}.filter(token => token instanceof Token).forEach(async token => token.toggleVisibility());`
    code += `\t\t} else if (${token_input} instanceof Token) {`;
    code += `\t\t\tawait ${token_input}.toggleVisibility();`;
    code += `\t}`;
    code += `}`;
    return code;
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
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    game.modules.get("lib-blockly").instance.toolbox()
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})