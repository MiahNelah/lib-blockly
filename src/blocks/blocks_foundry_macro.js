import {LibBlockly} from "../LibBlockly.js";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_macro_run_macro",
        "message0": "Run macro %1",
        "args0": [
            {
                "type": "input_value",
                "name": "macro",
                "check": "Macro"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_macro_all_macro",
        "message0": "All macros",
        "output": "Array",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },

]);

Blockly.Blocks['foundry_macro_get_macro'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get macro")
            .appendField(new Blockly.FieldDropdown(this.getMacroList), "macro-id");
        this.setOutput(true, "Macro");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getMacroList: function () {
        return game.macros.map(x => [x.name, x.id]);
    }
};

Blockly.JavaScript['foundry_macro_run_macro'] = function (block) {
    const value_macro = Blockly.JavaScript.valueToCode(block, 'macro', Blockly.JavaScript.ORDER_ATOMIC);
    let runMacroHelper = Blockly.JavaScript.provideFunction_("blockly_run_macro_helper", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(macro) {`,
        `  if (!macro) return undefined;`,
        `  if (macro instanceof Macro && macro.canExecute) return macro.execute();`,
        `  if (typeof macro === 'string') {`,
        `    return ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.macros.get(macro) ?? game.macros.getName(macro));`,
        `  }`,
        `}`
    ]);

    return `${runMacroHelper}(${value_macro});\n`;
};

Blockly.JavaScript['foundry_macro_all_macro'] = function (block) {
    return ["game.macros", Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['foundry_macro_get_macro'] = function (block) {
    var macro_input = block.getFieldValue('macro-id');
    return [`game.macros.get("${macro_input}")`, Blockly.JavaScript.ORDER_NONE];
};


const toolbox = [
    {
        "kind": "category",
        "name": "Macro",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_macro_all_macro"
            },
            {
                "kind": "block",
                "type": "foundry_macro_get_macro"
            },
            {
                "kind": "block",
                "type": "foundry_macro_run_macro"
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