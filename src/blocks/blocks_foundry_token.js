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

Blockly.JavaScript["foundry_token_hide"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
    
    let code = `if (${token_input} !== undefined && ${token_input}.length>0) {\n`;        
    code += `\tawait canvas.scene.updateEmbeddedDocuments("Token", ${token_input}.map(t => { return {_id: t.id, hidden: true}}));\n`
    code += "} else {\n";
    code += `\tif (${token_input} instanceof Token) {\n`
    code += `\tawait canvas.scene.updateEmbeddedDocuments("Token", {_id: ${token_input}.id, hidden: true});\n`
    code += `\t}\n`
    code += "}";
    return code;
}

Blockly.JavaScript["foundry_token_show"] = function (block) {
    var token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
    
    let code = `if (${token_input} !== undefined && ${token_input}.length>0) {\n`;        
    code += `\tawait canvas.scene.updateEmbeddedDocuments("Token", ${token_input}.map(t => { return {_id: t.id, hidden: false}}));\n`
    code += "} else {\n";
    code += `\tif (${token_input} instanceof Token) {\n`
    code += `\tawait canvas.scene.updateEmbeddedDocuments("Token", {_id: ${token_input}.id, hidden: false});\n`
    code += `\t}\n`
    code += "}";
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
            },
            {
                "kind": "block",
                "type": "foundry_token_hide"
            },
            {
                "kind": "block",
                "type": "foundry_token_show"
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


