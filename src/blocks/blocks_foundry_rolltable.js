class GetTableResultDataCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_rolltable_get_tableresult_data";
        this.category = "Foundry.Rolltable";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetTableResultData.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "propertyKey",
                    "options": [
                        ["Text", "text"],
                        ["Drawn", "drawn"],
                        ["Type", "type"],
                        ["Weight", "weight"],
                        ["Result ID", "resultId"],
                        ["Low Range", "lowRange"],
                        ["High Range", "highRange"],
                        ["Image", "img"],
                        ["Collection", "collection"]
                    ]
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "tableResult",
                    "check": "TableResult"
                }
            ],
            "inputsInline": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetTableResultData.InlineInputs"),
            "output": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetTableResultData.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetTableResultData.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetTableResultData.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const propertyKey = block.getFieldValue('propertyKey');
        const tableResult = Blockly.JavaScript.valueToCode(block, 'tableResult', Blockly.JavaScript.ORDER_ATOMIC);

        let code = `!${tableResult} || !(${tableResult} instanceof TableResult) ? undefined : `;
        switch (propertyKey) {
            case "lowRange":
                code += `(Array.isArray(${tableResult.range})) ? ${tableResult.range}[0] : ${tableResult.range}`;
                break
            case "highRange":
                code += `(Array.isArray(${tableResult.range})) ? ${tableResult.range}[1] : ${tableResult.range}`;
                break
            default:
                code += `${tableResult}.${propertyKey}`;
        }
        return [code, Blockly.JavaScript.ORDER_NONE];
    }
}

class RollTableCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_rolltable_roll_table";
        this.category = "Foundry.Rolltable";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Rolltable.RollTable.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "rolltable",
                    "check": [
                        "RollTable",
                        "String"
                    ]
                }
            ],
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Rolltable.RollTable.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Rolltable.RollTable.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Rolltable.RollTable.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const rolltableId_input = Blockly.JavaScript.valueToCode(block, 'rolltable', Blockly.JavaScript.ORDER_ATOMIC);
        let rolltableHelper = Blockly.JavaScript.provideFunction_(`${this.key}_rolltable_roll_helper`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(rolltable) {`,
            `  if (!rolltable) return undefined;`,
            `  if (rolltable instanceof RollTable) {`,
            `    const roll = await rolltable.roll();`,
            `    return roll.results;`,
            `  }`,
            `  if (rolltable instanceof String) {`,
            `    const rolltable_object = game.tables.get(rolltable) && game.tables.getName(rolltable);`,
            `    return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(rolltable_object);`,
            `  }`,
            "}"
        ]);
        return [`await ${rolltableHelper}(${rolltableId_input})`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetRolltableByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_rolltable_get_roltable_by_name_or_id";
        this.category = "Foundry.Rolltable";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "RollTable"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Rolltable.GetRolltableByNameOrId.HelpUrl"),
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
                return [`game.tables.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.tables.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new GetRolltableByNameOrIdCustomBlock(),
        new RollTableCustomBlock(),
        new GetTableResultDataCustomBlock()
    ]);
})
