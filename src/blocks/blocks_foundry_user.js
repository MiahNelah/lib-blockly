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
  }
]);

Blockly.JavaScript["foundry_user_list"] = function (block) {
  return [`game.users`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_user_get_user_actor"] = function (block) {
  var user_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  return [`${user_name}.character`, Blockly.JavaScript.ORDER_NONE];
}

const toolbox = [
  {
    "kind": "category",
    "name": "User",
    "contents": [
      {
        "kind": "block",
        "type": "foundry_user_list"
      },
      {
        "kind": "block",
        "type": "foundry_user_get_user_actor"
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


