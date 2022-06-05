class SendMessageCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_chat_send_message";
        this.category = "Foundry.Chat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Chat.SendMessage.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "message",
                    "check": [
                        "String",
                        "RollResult"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "flavorText",
                    "check": "String",
                    "align": "RIGHT"
                },
                {
                    "type": "input_value",
                    "name": "speakerActor",
                    "check": [
                        "Actor"
                    ],
                    "align": "RIGHT"
                },
                {
                    "type": "field_checkbox",
                    "name": "blindMode",
                    "checked": true
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Chat.SendMessage.Tooltip"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Chat.SendMessage.Title"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Chat.SendMessage.HelpUrl"),
        }
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

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new SendMessageCustomBlock()
    ]);
})






