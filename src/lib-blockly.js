import { LibBlocky } from "./LibBlockly.js";
import defaultToolbox from "./blocks/libblocky-toolbox.js";


Blockly.Blocks["my_roll_example"] = {
    init: async function () {
        this.appendDummyInput()
            .appendField("Roll");
        this.appendValueInput("rollExpression")
            .setCheck("String");
        this.setOutput(true, 'String');
        this.setNextStatement(false);
        this.setPreviousStatement(false);
        this.setColour(160);
        this.setHelpUrl("");
        this.setTooltip("");
    }
}

Blockly.JavaScript["my_roll_example"] = function (block) {
    const rollexpression_value = block.getField("rollExpression").getValue();
    return `(await (new Roll("${rollexpression_value}")).roll()).result`;
}

const toolbox = [
    {
        "kind": "category",
        "name": "My custom blocks",
        "contents": [
            {
                "kind": "block",
                "type": "my_roll_example"
            }
        ]
    }
]

Hooks.once('ready', () => {
    game.modules.get("lib-blockly").instance.updateToolbox(toolbox);
})

Hooks.once("init", () => {

    new LibBlocky({
        toolbox: defaultToolbox
    });

});