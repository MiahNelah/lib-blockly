class RollCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_roll_roll";
        this.category = "Foundry.Roll";
    }

    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Roll.Roll.Title"),
            "args0": [
                {
                    "type": "field_input",
                    "name": "rollExpression",
                    "text": "1d6"
                }
            ],
            "output": "String",
            "colour": game.i18n.localize("LibBlockly.Blocks.Roll.Roll.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Roll.Roll.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Roll.Roll.HelpUrl")
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const rollexpression_value = block.getField("rollExpression").getValue();
        let rollHelper = Blockly.JavaScript.provideFunction_("blockly_roll_helper", [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(rollExpression) {`,
            `  const roll_object = new Roll(rollExpression);`,
            `  const roll = await roll_object.roll({async:true});`,
            `  return roll.total;`,
            "}"
        ]);

        return [`await ${rollHelper}("${rollexpression_value}")`, Blockly.JavaScript.ORDER_NONE];
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new RollCustomBlock()
    ]);
})