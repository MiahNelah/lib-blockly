import { CustomBlock } from "../CustomBlock.js";

/**
 * Wait for a certain amount of time before continuing macro.
 * @extends CustomBlock
 * @category Foundry.Utils
 * 
 * @param {number} time Time to wait in milliseconds.
 * @param {String} units Units to use for time. Can be "ms" or "s"
 */
export class WaitCustomBlock extends CustomBlock {
    constructor() {
        super("Wait", "Foundry.Utils");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const number_delay = block.getFieldValue('delay');
        const dropdown_units = block.getFieldValue('units');
        return `await helpers.wait(${dropdown_units === "s" ? number_delay * 1000 : number_delay});`;
    }
}
Object.freeze(WaitCustomBlock);

/**
 * Send a on-screen notification to the user.
 * @extends CustomBlock
 * @category Foundry.Utils
 * 
 * @param {String} message The message to send.
 * @param {String} type The type of notification to send. Can be "info", "warn", or "error".
 */
export class ShowNotificationCustomBlock extends CustomBlock {
    constructor() {
        super("ShowNotification", "Foundry.Utils");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_notificationtype = block.getFieldValue('notificationType');
        const value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
        return `ui.notifications.${dropdown_notificationtype}(${value_message});\n`
    }
}
Object.freeze(ShowNotificationCustomBlock);