Blockly.Blocks['foundry_chat_sendmessage'] = {
    init: function() {
      this.appendValueInput("message")
          .setCheck("String")
          .appendField("Send message");
      this.appendDummyInput()
          .appendField("Type")
          .appendField(new Blockly.FieldDropdown([["Other","0"], ["Out Character","1"], ["In Character","2"], ["Emote","3"], ["Whisper","4"]/*, ["Roll","5"]*/]), "messageType");
      this.appendDummyInput()
          .appendField(new Blockly.FieldCheckbox("FALSE", this.onHasFlavorChanged), "hasFlavorText")
          .appendField("Flavor text")
          .appendField(new Blockly.FieldTextInput(""), "flavorText");
      this.appendDummyInput()
          .appendField(new Blockly.FieldCheckbox("TRUE"), "blindMode")
          .appendField("Make blind ?");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.JavaScript["foundry_chat_sendmessage"] = function (block) {
    const value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
    const checkbox_hasflavortext = block.getFieldValue('hasFlavorText') === 'TRUE';
    const text_flavortext = block.getFieldValue('flavorText');
    const checkbox_blindmode = block.getFieldValue('blindMode') === 'TRUE';
    const dropdown_messagetype = block.getFieldValue('messageType');

    let code = "ChatMessage.create({";
    code += "user: game.user.id,";
    if (checkbox_blindmode)
        code += "blind:true,";
    if (checkbox_hasflavortext)
        code += `flavor:\`${text_flavortext}\`,`
    if (dropdown_messagetype !== "0")
        code += `type:${dropdown_messagetype},`
    code += `content: ${value_message}`
    code += "});";

    return code;
}

const toolbox = [
    {
        "kind": "category",
        "name": "Chat",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_chat_sendmessage"
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    game.modules.get("lib-blockly").instance.toolbox()
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})