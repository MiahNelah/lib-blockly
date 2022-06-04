Blockly.defineBlocksWithJsonArray([
  {
    "type": "foundry_user_list",
    "message0": "Get users",
    "output": "Array",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_user_get_user_actor",
    "message0": "Get user's actor %1",
    "args0": [
      {
        "type": "input_value",
        "name": "user",
        "check": "User"
      }
    ],
    "output": "Actor",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_user_get_user_token_in_scene",
    "message0": "Get user's token in scene %1",
    "args0": [
      {
        "type": "input_value",
        "name": "user",
        "check": "User"
      }
    ],
    "output": "Token",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_user_pull_to_scene",
    "message0": "Pull user %1 to scene %2",
    "args0": [
      {
        "type": "input_value",
        "name": "userInput",
        "check": [
          "String",
          "Array",
          "User"
        ]
      },
      {
        "type": "input_value",
        "name": "sceneInput",
        "check": [
          "String",
          "Scene"
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_user_ban_user",
    "message0": "Ban user %1",
    "args0": [
      {
        "type": "input_value",
        "name": "userInput",
        "check": ["User", "Array", "String"]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_user_unban_user",
    "message0": "Un-Ban user %1",
    "args0": [
      {
        "type": "input_value",
        "name": "userInput",
        "check": ["User", "Array", "String"]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['foundry_user_get_user_dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get user")
      .appendField(new Blockly.FieldDropdown(this.getUsersList), "user-id");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  getUsersList: function () {
    return game.users.map(x => [x.name, x.id]);
  }
};

Blockly.JavaScript["foundry_user_list"] = function (block) {
  return [`game.users`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_user_get_user_actor"] = function (block) {
  var user_name = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_ATOMIC);
  return [`${user_name}?.character`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_user_get_user_token_in_scene"] = function (block) {
  var user_name = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_ATOMIC);
  return [`canvas.tokens.placeables.find(x => x.actor?.id === ${user_name}.character?.id)`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_user_get_user_dropdown"] = function (block) {
  var userid_value = block.getField('user-id').getValue();
  return [`game.users.get("${userid_value}")`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_user_pull_to_scene'] = function (block) {
  var userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);
  var sceneInput_input = Blockly.JavaScript.valueToCode(block, 'sceneInput', Blockly.JavaScript.ORDER_ATOMIC);

  var userInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_pull_to_scene$userInput', Blockly.Variables.NAME_TYPE);
  var sceneInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_pull_to_scene$sceneInput', Blockly.Variables.NAME_TYPE);

  let code = `// Pull users to scene\n`;
  code += `let ${sceneInput} = ${sceneInput_input};\n`;
  code += `if (${sceneInput}) {\n`;
  code += `\t${sceneInput} = ${sceneInput} instanceof Scene ? ${sceneInput_input} : game.scenes.get(${sceneInput_input})\n`;
  code += `\tif (${sceneInput}) {\n`;
  code += `\t\tlet ${userInput} = ${userInput_input};\n`;
  code += `\t\tif (${userInput}) {\n`;
  code += `\t\t\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
  code += `\t\t\tif (${userInput} && ${userInput} instanceof User) {\n`;
  code += `\t\t\t\tgame.socket.emit("pullToScene", ${sceneInput}, ${userInput});\n`;
  code += `\t\t\t} else if (${userInput} && ${userInput} instanceof Array) {\n`;
  code += `\t\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => game.socket.emit("pullToScene", ${sceneInput}, user));\n`;
  code += `\t\t\t}\n`;
  code += `\t\t}\n`;
  code += `\t}\n`;
  code += `}\n\n`;

  return code;
};

Blockly.JavaScript['foundry_user_ban_user'] = function (block) {
  var userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);

  var userInput = Blockly.JavaScript.nameDB_.getDistinctName('oundry_user_ban_user$userInput', Blockly.Variables.NAME_TYPE);

  let code = `// Ban user\n`;
  code += `let ${userInput} = ${userInput_input};\n`;
  code += `if (${userInput}) {\n`;
  code += `\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
  code += `\tif (${userInput}) {\n`;
  code += `\t\tif (${userInput} instanceof User) {\n`;
  code += `\t\t\t${userInput}.update({role: CONST.USER_ROLES.NONE});\n`;
  code += `\t\t} else if (${userInput} instanceof Array) {\n`;
  code += `\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => user.update({role: CONST.USER_ROLES.NONE}));\n`;
  code += `\t\t}\n`;
  code += `\t}\n`;
  code += `}\n\n`;

  return code;
};

Blockly.JavaScript['foundry_user_unban_user'] = function (block) {
  var userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);

  var userInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_unban_user$userInput', Blockly.Variables.NAME_TYPE);

  let code = `// Un-Ban user\n`;
  code += `let ${userInput} = ${userInput_input};\n`;
  code += `if (${userInput}) {\n`;
  code += `\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
  code += `\tif (${userInput}) {\n`;
  code += `\t\tif (${userInput} instanceof User) {\n`;
  code += `\t\t\t${userInput}.update({role: CONST.USER_ROLES.PLAYER});\n`;
  code += `\t\t} else if (${userInput} instanceof Array) {\n`;
  code += `\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => user.update({role: CONST.USER_ROLES.PLAYER}));\n`;
  code += `\t\t}\n`;
  code += `\t}\n`;
  code += `}\n\n`;

  return code;
};

Hooks.once('ready', () => {
  game.modules.get("libblockly")
      .toolboxManager.getCategory("Foundry", true)
      .addCategory("User")
      .addBlock("block", "foundry_user_list")
      .addBlock("block", "foundry_user_get_user_actor")
      .addBlock("block", "foundry_user_get_user_token_in_scene")
      .addBlock("block", "foundry_user_get_user_dropdown")
      .addBlock("block", "foundry_user_pull_to_scene")
      .addBlock("block", "foundry_user_ban_user")
      .addBlock("block", "foundry_user_unban_user");
})
