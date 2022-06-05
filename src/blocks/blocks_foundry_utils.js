class WaitCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_utils_delay";
        this.category = "Foundry.Utils";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Title"),
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
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Seconds"), "s"],
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Milliseconds"), "ms"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const number_delay = block.getFieldValue('delay');
        const dropdown_units = block.getFieldValue('units');

        const delayHelper = Blockly.JavaScript.provideFunction_("blockly_delay_helper", [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(delay) {`,
            `  return new Promise(resolve => {`,
            `    setTimeout(() => resolve(2), delay);`,
            `  });`,
            `}`
        ]);

        return `await ${delayHelper}(${dropdown_units === "s" ? number_delay * 1000 : number_delay});\n`;
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new WaitCustomBlock()
    ]);
})