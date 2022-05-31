Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_roll_roll",
        "message0": "Roll %1",
        "args0": [
            {
                "type": "field_input",
                "name": "rollExpression",
                "text": "1d6"
            }
        ],
        "output": "String",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.JavaScript["foundry_roll_roll"] = function (block) {
    const rollexpression_value = block.getField("rollExpression").getValue();
    let rollHelper = Blockly.JavaScript.provideFunction_("blockly_roll_helper",  [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(rollExpression) {`,
        `  const roll_object = new Roll(rollExpression);`,
        `  const roll = await roll_object.roll({async:true});`,
        `  return roll.total;`,
        "}"
    ]);

    return [`await ${rollHelper}("${rollexpression_value}")`, Blockly.JavaScript.ORDER_NONE];
}

const toolbox = [
    {
        "kind": "category",
        "name": "Roll",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_roll_roll"
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    game.modules.get("libblockly").instance.toolbox()
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})