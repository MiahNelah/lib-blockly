import { CustomBlock } from "../CustomBlock.js";

/**
 * Send a message to chat.
 * @extends CustomBlock
 * @category Foundry.Utils
 * 
 * @param {String} message The message to send.
 * @param {String} speaker The speaker to use.
 * @param {String} flavor The flavor to use.
 * @param {*} rollMode The roll mode to use.
 * @param {User|Array<User>} whisperTo The whisper target.
 */
export class SendMessageCustomBlock extends CustomBlock {
    constructor() {
        super("SendMessage", "Foundry.Chat");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
        const value_flavortext = Blockly.JavaScript.valueToCode(block, 'flavorText', Blockly.JavaScript.ORDER_ATOMIC);
        // const value_speakeractor = Blockly.JavaScript.valueToCode(block, 'speakerActor', Blockly.JavaScript.ORDER_ATOMIC);
        const checkbox_blindmode = block.getFieldValue('blindMode') === 'TRUE';

        const statements = [`ChatMessage.create({`];
        if (checkbox_blindmode) statements.push(`blind:true,`);
        if (value_flavortext !== "") statements.push(`flavor:${value_flavortext},`);
        //if (value_speakeractor) statements.push(`blind:true,`);
        statements.push([
            `content: ${value_message}`,
            "});\n"
        ]);
        return statements.join("\n");
    }
}
Object.freeze(SendMessageCustomBlock);