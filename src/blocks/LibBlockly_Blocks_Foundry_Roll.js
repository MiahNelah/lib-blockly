import { CustomBlock } from "../CustomBlock.js";

/**
 * Roll a custom dice roll from a expression.
 * @extends CustomBlock
 * @category Foundry.Roll
 * 
 * @param {String} rollExpression - The expression to roll. Default: "1d6".
 * @returns {Number} The result of the roll.
 */
export class RollCustomBlock extends CustomBlock {
    constructor() {
        super("Roll", "Foundry.Roll");    
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const rollexpression_value = block.getField("rollExpression").getValue();
        return [`await helpers.roll("${rollexpression_value}")`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(RollCustomBlock);