import { CustomBlock } from "../CustomBlock.js";

export class CombatCreateCustomBlock extends CustomBlock {
    constructor() {
        super("Create", "Foundry.Combat");
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
Object.freeze(CombatCreateCustomBlock);

export class CombatGetActiveCustomBlock extends CustomBlock {
    constructor() {
        super("GetActive", "Foundry.Combat");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.combats.active`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(CombatGetActiveCustomBlock);

export class CombatIsActiveCustomBlock extends CustomBlock {
    constructor() {
        super("IsActive", "Foundry.Combat");
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
Object.freeze(CombatIsActiveCustomBlock);

export class CombatStartCustomBlock extends CustomBlock {
    constructor() {
        super("Start", "Foundry.Combat");
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
Object.freeze(CombatStartCustomBlock);

export class CombatActivateCustomBlock extends CustomBlock {
    constructor() {
        super("Activate", "Foundry.Combat");
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
Object.freeze(CombatActivateCustomBlock);

export class CombatEndCustomBlock extends CustomBlock {
    constructor() {
        super("Delete", "Foundry.Combat");
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
Object.freeze(CombatEndCustomBlock);

export class CombatResetCustomBlock extends CustomBlock {
    constructor() {
        super("Reset", "Foundry.Combat");
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
Object.freeze(CombatResetCustomBlock);

export class CombatNextRoundCustomBlock extends CustomBlock {
    constructor() {
        super("NextRound", "Foundry.Combat");
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
Object.freeze(CombatNextRoundCustomBlock);

export class CombatPreviousRoundCustomBlock extends CustomBlock {
    constructor() {
        super("PreviousRound", "Foundry.Combat");
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
Object.freeze(CombatPreviousRoundCustomBlock);

export class CombatNextTurnCustomBlock extends CustomBlock {
    constructor() {
        super("NextTurn", "Foundry.Combat");
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
Object.freeze(CombatNextTurnCustomBlock);

export class CombatPreviousTurnCustomBlock extends CustomBlock {
    constructor() {
        super("PreviousTurn", "Foundry.Combat");
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
Object.freeze(CombatPreviousTurnCustomBlock);