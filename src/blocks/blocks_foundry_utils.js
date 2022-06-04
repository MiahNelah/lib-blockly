Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_utils_delay",
        "message0": "Wait %1 %2",
        "args0": [
            {
                "type": "field_number",
                "name": "delay",
                "value": 1,
                "min": 0
            },
            {
                "type": "field_dropdown",
                "name": "units",
                "options": [
                    ["s", "s"],
                    ["ms", "ms"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.JavaScript["foundry_utils_delay"] = function (block) {
    const number_delay = block.getFieldValue('delay');
    const dropdown_units = block.getFieldValue('units');

    const delayHelper = Blockly.JavaScript.provideFunction_("blockly_delay_helper", [
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(delay) {`,
        `  return new Promise(resolve => {`,
        `    setTimeout(() => resolve(2), delay);`,
        `  });`,
        `}`
    ]);

    return `await ${delayHelper}(${dropdown_units === "s" ? number_delay*1000 : number_delay});\n`;
}

Hooks.once('ready', () => {
    game.modules.get("libblockly")
        .toolboxManager.getCategory("Foundry", true)
        .addCategory("Utils")
        .addBlock("block", "foundry_utils_delay");
})