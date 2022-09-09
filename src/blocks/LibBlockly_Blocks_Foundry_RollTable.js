import { CustomBlock } from "../CustomBlock.js";

/**
 * Get data from a rolltable result.
 * @extends CustomBlock
 * @category Foundry.RollTable
 * 
 * @param {String} propertyKey - The property to get. Default: "text".
 * @param {String} tableResult - The table result from which to get the property.
 * @returns {*} The value of the property.
 */
export class RollTableGetTableResultDataCustomBlock extends CustomBlock {
    constructor() {
        super("GetTableResultData", "Foundry.RollTable");
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
Object.freeze(RollTableGetTableResultDataCustomBlock);

/**
 * Roll a table.
 * @extends CustomBlock
 * @category Foundry.RollTable
 * 
 * @param {String} tableNameOrId - The name or id of the table to roll. Default: "Table".
 * @returns {Array<TableResult>} The results of the roll.
 */
export class RollTableRollCustomBlock extends CustomBlock {
    constructor() {
        super("Roll", "Foundry.RollTable");
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
Object.freeze(RollTableRollCustomBlock);

/**
 * Get a table by name or id.
 * @extends CustomBlock
 * @category Foundry.RollTable
 * 
 * @param {String} tableNameOrId - The name or id of the table to get. Default: "Table".
 * @returns {RollTable} The table.
 */
export class RolltableGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.RollTable");
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
Object.freeze(RolltableGetByNameOrIdCustomBlock);