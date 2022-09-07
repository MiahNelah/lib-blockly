import { CustomBlock } from "../CustomBlock.js";

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