import {LibBlockly} from "../LibBlockly.js";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "foundry_scene_get_current_scene",
    "message0": "Current Scene",
    "output": "Scene",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_scene_activate",
    "message0": "Activate scene %1",
    "args0": [
      {
        "type": "input_value",
        "name": "scene",
        "check": "Scene"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_scene_view",
    "message0": "View scene %1",
    "args0": [
      {
        "type": "input_value",
        "name": "scene",
        "check": "Scene"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['foundry_scene_get_scene_dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get scene")
      .appendField(new Blockly.FieldDropdown(this.getSceneList), "scene-id");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  getSceneList: function () {
    return game.scenes.map(x => [x.name, x.id]);
  }
};

Blockly.Blocks['foundry_scene_rename_scene'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Rename scene")
      .appendField(new Blockly.FieldDropdown(this.getSceneList), "scene-id")
      .appendField("to")
      .appendField(new Blockly.FieldTextInput(""), "newName");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  getSceneList: function () {
    return game.scenes.map(x => [x.name, x.id]);
  }
};

Blockly.JavaScript["foundry_scene_get_current_scene"] = function (block) {
  return [`canvas.scene`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_scene_activate"] = function (block) {
  var scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
  return `if (${scene_input} !== undefined && ${scene_input} instanceof Scene) { await (${scene_input}).activate(); }`;
}

Blockly.JavaScript["foundry_scene_view"] = function (block) {
  var scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
  return `if (${scene_input} !== undefined && ${scene_input} instanceof Scene) { await ${scene_input}.view(); }`;
}

Blockly.JavaScript["foundry_scene_get_scene_dropdown"] = function (block) {
  const sceneId_input = block.getField('scene-id').getValue();
  return [`game.scenes.get("${sceneId_input}")`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_scene_rename_scene"] = function (block) {
  const sceneId_input = block.getField('scene-id').getValue();
  const text_newname = block.getFieldValue('newName');
  return `await game.scenes.get("${sceneId_input}").update({name:"${text_newname}"});`;
}

const toolbox = [
  {
    "kind": "category",
    "name": "Scene",
    "contents": [
      {
        "kind": "block",
        "type": "foundry_scene_get_scene_dropdown"
      },
      {
        "kind": "block",
        "type": "foundry_scene_get_current_scene"
      },
      {
        "kind": "block",
        "type": "foundry_scene_activate"
      },
      {
        "kind": "block",
        "type": "foundry_scene_view"
      },
      {
        "kind": "block",
        "type": "foundry_scene_rename_scene"
      }
    ]
  }
]

Hooks.once('ready', () => {
  // TODO: find a better way to add custom blocks than this...
  LibBlockly.toolbox
    .contents // root contents
    .find(x => x.name === "Foundry").contents // foundry category contents
    .push(...toolbox);
})


