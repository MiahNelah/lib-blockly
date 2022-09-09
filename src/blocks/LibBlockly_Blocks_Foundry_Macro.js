import { CustomBlock } from "../CustomBlock.js";

/**
 * Get all macros.
 * @extends CustomBlock
 * @category Foundry.Macro
 * 
 * @return {Array<Macro>} All macros.
 */
export class MacroGetAllCustomBlock extends CustomBlock {
    constructor() {
        super("GetAll", "Foundry.Macro");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return ["game.macros", Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(MacroGetAllCustomBlock);

/**
 * Get macro by name or id.
 * @extends CustomBlock
 * @category Foundry.Macro
 * 
 * @param {String} lookupType - Lookup type. Either "name" or "ID".
 * @param {String} input - Name or id of macro.
 * @return {Macro} Resolved macro.
 */
export class MacroGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.Macro");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_lookuptype = block.getFieldValue('lookupType');
        const value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
        return [`helpers.resolveMacro("${dropdown_lookuptype}", ${value_input})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
}
Object.freeze(MacroGetByNameOrIdCustomBlock);

/**
 * Run macro.
 * @extends CustomBlock
 * @category Foundry.Macro
 * 
 * @param {Macro|Array|String} macro - Macro to run.
 */
export class MacroRunCustomBlock extends CustomBlock {
    constructor() {
        super("Run", "Foundry.Macro");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_macro = Blockly.JavaScript.valueToCode(block, 'macro', Blockly.JavaScript.ORDER_ATOMIC);
        return `helpers.executeMacro(this, ${value_macro})`;
    }
}
Object.freeze(MacroRunCustomBlock);

/**
 * Check if macro can be run by the current user.
 * @extends CustomBlock
 * @category Foundry.Macro
 * 
 * @param {Macro} macro - Macro to run.
 */
export class MacroCanRunCustomBlock extends CustomBlock {
    constructor() {
        super("CanRun", "Foundry.Macro");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_macro = Blockly.JavaScript.valueToCode(block, 'macro', Blockly.JavaScript.ORDER_ATOMIC);
        return [`helpers.canExecuteMacro(${value_macro})`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(MacroCanRunCustomBlock);