Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_notifications_show",
        "message0": "Show %1 notification %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "type",
                "options": [
                    ["information", "info"],
                    ["warning", "warn"],
                    ["error", "error"]
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
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);


Blockly.JavaScript["foundry_notifications_show"] = function (block) {
    const type_value = block.getFieldValue('type');
    const message_input = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);

    return `ui.notifications.${type_value}(${message_input});\n`
}

const toolbox = [
    {
        "kind": "category",
        "name": "Notification",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_notifications_show"
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    game.modules.get("libblockly").instance.toolbox()
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})