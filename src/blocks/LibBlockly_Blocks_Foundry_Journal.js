import { CustomBlock } from "../CustomBlock.js";

/**
 * Get a journal entry by name or id.
 * @extends CustomBlock
 * @category Foundry.Journal
 * 
 * @param {String} journalNameOrId - The name or id of the journal entry to get.
 * @returns {JournalEntry} The journal entry.
 */
export class JournalGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.Journal");
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
                return [`game.journal.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.journal.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}
Object.freeze(JournalGetByNameOrIdCustomBlock);

/**
 * Open a journal entry.
 * @extends CustomBlock
 * @category Foundry.Journal
 * 
 * @param {JournalEntry} journalEntry - journal entry to open.
 */
export class JournalOpenCustomBlock extends CustomBlock {
    constructor() {
        super("Open", "Foundry.Journal");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'journal', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${value_name}) await ${value_name}.sheet.render(true);\n`;
    }
}
Object.freeze(JournalOpenCustomBlock);

/**
 * Show a journal entry as text or image.
 * @extends CustomBlock
 * @category Foundry.Journal
 * 
 * @param {JournalEntry|String} journalEntry - id or journal entry to show.
 * @param {String} displayType - "text" or "image".
 */
export class JournalShowAsCustomBlock extends CustomBlock {
    constructor() {
        super("ShowAs", "Foundry.Journal");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'journal', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_showAs = block.getFieldValue('showAs');
        return `if (${value_name}) await ${value_name}.show("${dropdown_showAs}");\n`;
    }
}
Object.freeze(JournalShowAsCustomBlock);