Blockly.defineBlocksWithJsonArray([
  {
    "type": "foundry_rolltable_roll_table",
    "message0": "Roll table %1",
    "args0": [
      {
        "type": "input_value",
        "name": "rollTableName",
        "check": "RollTable"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "foundry_rolltable_get_data_from_tableresult",
    "message0": "Get %1 %2 from table result %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "propertyKey",
        "options": [
          ["Text", "text"],
          ["Drawn", "drawn"],
          ["Type", "type"],
          ["Weight", "weight"],
          ["Result ID", "resultId"],
          ["Low Range", "lowRange"],
          ["High Range", "highRange"],
          ["Image", "img"],
          ["Collection", "collection"]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "tableResult",
        "check": "TableResult"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['foundry_rolltable_get_rolltable_dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get rolltable")
      .appendField(new Blockly.FieldDropdown(this.getSceneList), "rolltable-id");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  getSceneList: function () {
    return game.tables.map(x => [x.name, x.id]);
  }
};
Blockly.JavaScript["foundry_rolltable_roll_table"] = function (block) {
  var rollTableName_value = Blockly.JavaScript.valueToCode(block, 'rollTableName', Blockly.JavaScript.ORDER_ATOMIC);
  return [`(${rollTableName_value} !== undefined && ${rollTableName_value} instanceof RollTable) ? (await ${rollTableName_value}.roll()).results : []`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_rolltable_get_rolltable_dropdown"] = function (block) {
  const rolltableId_input = block.getField('rolltable-id').getValue();
  return [`game.tables.get("${rolltableId_input}")`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript["foundry_rolltable_get_data_from_tableresult"] = function (block) {
  const propertyKey = block.getFieldValue('propertyKey');
  const tableResult = Blockly.JavaScript.valueToCode(block, 'tableResult', Blockly.JavaScript.ORDER_ATOMIC);

  let code = `!${tableResult} || !(${tableResult} instanceof TableResult) ? undefined : `;
  switch (propertyKey) {
    case "lowRange":
      code += `(Array.isArray(${tableResult.range})) ? ${tableResult.range}[0] : ${tableResult.range}`;
      break
    case "highRange":
      code += `(Array.isArray(${tableResult.range})) ? ${tableResult.range}[1] : ${tableResult.range}`;
      break
    default: code += `${tableResult}.data.${propertyKey}`;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
}

const toolbox = [
  {
    "kind": "category",
    "name": "Rolltable",
    "contents": [
      {
        "kind": "block",
        "type": "foundry_rolltable_roll_table"
      },
      {
        "kind": "block",
        "type": "foundry_rolltable_get_rolltable_dropdown"
      },
      {
        "kind": "block",
        "type": "foundry_rolltable_get_data_from_tableresult"
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


