export class WaitCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_utils_delay";
        this.category = "Foundry.Utils";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Title"),
            "args0": [
                {
                    "type": "field_number",
                    "name": "delay",
                    "value": 1,
                    "min": 0
                },
                {
                    "type": "field_dropdown",
                    "name": "units",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Seconds"), "s"],
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Milliseconds"), "ms"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.HelpUrl"),
        }
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

export class ShowNotificationCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_utils_show_notification";
        this.category = "Foundry.Utils";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "notificationType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.NotificationType.Info"), "info"],
                        [game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.NotificationType.Warning"), "warn"],
                        [game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.NotificationType.Error"), "error"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "message",
                    "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.Title"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Utils.ShowNotification.Tooltip"),
        }
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
