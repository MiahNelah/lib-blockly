class GetAllMacrosCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_macro_get_all_macros";
        this.category = "Foundry.Macro";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Macro.GetAllMacros.Title"),
            "output": [
                "Array"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Macro.GetAllMacros.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Macro.GetAllMacros.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Macro.GetAllMacros.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return ["game.macros", Blockly.JavaScript.ORDER_NONE];
    }
}

class GetMacroByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_macro_get_macro_by_name_or_id";
        this.category = "Foundry.Macro";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Macro.GetMacroByNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Macro"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Macro.GetMacroByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Macro.GetMacroByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Macro.GetMacroByNameOrId.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_lookuptype = block.getFieldValue('lookupType');
        const value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
        switch (dropdown_lookuptype) {
            case "name":
                return [`game.macros.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.macros.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

class RunMacroCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_macro_run_macro";
        this.category = "Foundry.Macro";
    }

    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Macro.RunMacro.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "macro",
                    "check": [
                        "Macro",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Macro.RunMacro.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Macro.RunMacro.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Macro.RunMacro.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_macro = Blockly.JavaScript.valueToCode(block, 'macro', Blockly.JavaScript.ORDER_ATOMIC);
        const runMacroHelper = Blockly.JavaScript.provideFunction_(`${this.key}_run_macro_helper`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(macro) {`,
            `  if (!macro) return undefined;`,
            `  if (macro instanceof Macro && macro.canExecute) return await macro.execute();`,
            `  if (typeof macro === 'string') {`,
            `    return ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.macros.get(macro) ?? game.macros.getName(macro));`,
            `  }`,
            `}`
        ]);

        return `${runMacroHelper}(${value_macro});\n`;
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new RunMacroCustomBlock(),
        new GetMacroByNameOrIdCustomBlock(),
        new GetAllMacrosCustomBlock()
    ]);
})