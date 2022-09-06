export class CreateCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_create_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.CreateCombat.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": [
                        "Scene"
                    ]
                }
            ],
            "output": "Combat",
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.CreateCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.CreateCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.CreateCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_name = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        let createCombatHelper = Blockly.JavaScript.provideFunction_(`${this.key}_create_combat_helper`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(scene) {`,
            `  const cls = getDocumentClass("Combat");`,
            `  const combat = await cls.create({scene: scene?.id})`,
            `  await combat.activate({render: false});`,
            `  return combat;`,
            `}`]);
        return [`await ${createCombatHelper}(${scene_name})`, Blockly.JavaScript.ORDER_NONE];
    }
}

export class GetActiveCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_get_active_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.GetActiveCombat.Title"),
            "output": "Combat",
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.GetActiveCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.GetActiveCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.GetActiveCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.combats.active`, Blockly.JavaScript.ORDER_NONE];
    }
}

export class IsCombatActiveCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_is_combat_active";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.IsCombatActive.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "output": "Boolean",
            "inputsInline": game.i18n.localize("LibBlockly.Blocks.Combat.IsCombatActive.InlineInputs"),
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.IsCombatActive.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.IsCombatActive.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.IsCombatActive.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_name}?.isActive`, Blockly.JavaScript.ORDER_NONE];
    }
}

export class StartCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_start_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.StartCombat.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.StartCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.StartCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.StartCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${value_name}) await ${value_name}.startCombat();\n`;
    }
}

export class ActivateCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_activate_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.ActivateCombat.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.ActivateCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.ActivateCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.ActivateCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.activate();\n`;
    }
}

export class EndCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_delete_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.EndCombat.Title"),
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
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.EndCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.EndCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.EndCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        const checkbox_confirmation = block.getFieldValue('confirmation') === 'TRUE';

        return `if (${combat_value}) await ${combat_value}.${checkbox_confirmation ? "endCombat" : "delete"}();\n`;
    }
}

export class ResetCombatCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_reset_combat";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.ResetCombat.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.ResetCombat.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.ResetCombat.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.ResetCombat.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.resetAll();\n`;
    }
}

export class NextCombatRoundCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_next_combat_round";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatRound.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatRound.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatRound.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatRound.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.nextRound();\n`;
    }
}

export class PreviousCombatRoundCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_previous_combat_round";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatRound.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatRound.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatRound.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatRound.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.previousRound();\n`;
    }
}

export class NextCombatTurnCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_next_combat_turn";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatTurn.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatTurn.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatTurn.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.NextCombatTurn.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.nextTurn();\n`;
    }
}

export class PreviousCombatTurnCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_combat_previous_combat_turn";
        this.category = "Foundry.Combat";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatTurn.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatTurn.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatTurn.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Combat.PreviousCombatTurn.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const combat_value = Blockly.JavaScript.valueToCode(block, 'combat', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${combat_value}) await ${combat_value}.previousTurn();\n`;
    }
}
