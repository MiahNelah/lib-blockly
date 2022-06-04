import {LibBlockly} from "../LibBlockly.js";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_combat_create_combat",
        "message0": "Create combat in scene %1",
        "args0": [
            {
                "type": "input_value",
                "name": "scene",
                "check": "Scene"
            }
        ],
        "output": "Combat",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_start",
        "message0": "Start combat %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_activate_combat",
        "message0": "Activate combat %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_get_active_combat",
        "message0": "Get active combat",
        "output": "Combat",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_stop",
        "message0": "Stop combat %1 %2 Ask confirmation ?",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            },
            {
                "type": "field_checkbox",
                "name": "confirmation",
                "checked": true
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_get_round",
        "message0": "Get round %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_get_turns",
        "message0": "Get turns %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "output": "Array",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_get_current_turn",
        "message0": "Get current turn %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "output": "Turn",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_is_active",
        "message0": "Is combat active ? %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "output": "Boolean",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_reset",
        "message0": "Reset combat %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_previous_turn",
        "message0": "Previous turn %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_previous_round",
        "message0": "Previous round %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_next_turn",
        "message0": "Next turn %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_combat_next_round",
        "message0": "Next round %1",
        "args0": [
            {
                "type": "input_value",
                "name": "combat",
                "check": "Combat"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.JavaScript['foundry_combat_create_combat'] = function (block) {
    const scene_name = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
    let createCombatHelper = Blockly.JavaScript.provideFunction_("blockly_create_combat_helper", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(scene) {`,
        `  const cls = getDocumentClass("Combat");`,
        `  const combat = await cls.create({scene: scene?.id})`,
        `  await combat.activate({render: false});`,
        `  return combat;`,
        `}`]);
    return [`await ${createCombatHelper}(${scene_name})`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_start'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.startCombat();\n`;
}

Blockly.JavaScript['foundry_combat_stop'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    const checkbox_confirmation = block.getFieldValue('confirmation') === 'TRUE';
    return `if (${value_name}) await ${value_name}.${checkbox_confirmation ? "endCombat" : "delete"}();\n`;
}

Blockly.JavaScript['foundry_combat_get_round'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return [`${value_name}?.round`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_get_turns'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return [`${value_name}?.turns`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_is_active'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return [`${value_name}?.isActive`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_reset'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.resetAll();\n`;
}

Blockly.JavaScript['foundry_combat_delete'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.delete();\n`;
}

Blockly.JavaScript['foundry_combat_activate_combat'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.activate();\n`;
}

Blockly.JavaScript['foundry_combat_get_active_combat'] = function (block) {
    return [`game.combats.active`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_get_current_turn'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return [`${value_name}?.current`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_combat_previous_turn'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.previousTurn();\n`;
}

Blockly.JavaScript['foundry_combat_previous_round'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.previousRound();\n`;
}

Blockly.JavaScript['foundry_combat_next_turn'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.nextTurn();\n`;
}

Blockly.JavaScript['foundry_combat_next_round'] = function (block) {
    const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
    return `if (${value_name}) await ${value_name}.nextRound();\n`;
}


const toolbox = [
    {
        "kind": "category",
        "name": "Combat",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_combat_create_combat"
            },
            {
                "kind": "block",
                "type": "foundry_combat_start"
            },
            {
                "kind": "block",
                "type": "foundry_combat_activate_combat"
            },
            {
                "kind": "block",
                "type": "foundry_combat_get_active_combat"
            },
            {
                "kind": "block",
                "type": "foundry_combat_stop"
            },
            {
                "kind": "block",
                "type": "foundry_combat_get_round"
            },
            {
                "kind": "block",
                "type": "foundry_combat_get_turns"
            },
            {
                "kind": "block",
                "type": "foundry_combat_get_current_turn"
            },
            {
                "kind": "block",
                "type": "foundry_combat_is_active"
            },
            {
                "kind": "block",
                "type": "foundry_combat_reset"
            },
            {
                "kind": "block",
                "type": "foundry_combat_previous_turn"
            },
            {
                "kind": "block",
                "type": "foundry_combat_previous_round"
            },
            {
                "kind": "block",
                "type": "foundry_combat_next_turn"
            },
            {
                "kind": "block",
                "type": "foundry_combat_next_round"
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

