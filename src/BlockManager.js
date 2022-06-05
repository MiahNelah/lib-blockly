import {LibBlockly} from "./LibBlockly.js";

/**
 * @typedef {Object} CustomBlock
 * @property {!String} key
 * @property {!String} kind
 * @property {!String} category
 * @property {!Function} init
 * @property {!Function} generateCode
 */
export class BlockManager {
    constructor() {
    }

    /**
     *
     * @param {!Array.<CustomBlock>} blocks
     */
    register(blocks) {
        Blockly.defineBlocksWithJsonArray(blocks.map(block => this._wrapInit(block)));
        blocks.forEach(block => {
            Blockly.JavaScript[block.key] = block.generateCode;
            const category = LibBlockly.toolboxManager.getCategory(block.category, true);
            category.addBlock(block.kind, block.key);
        });
    }

    /**
     *
     * @param {!CustomBlock} block
     * @returns {*}
     * @private
     */
    _wrapInit(block) {
        return mergeObject({type: block.key, ...block.init()});
    }
}