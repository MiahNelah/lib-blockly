import { CustomBlock } from "../CustomBlock.js";

export class SceneActivateCustomBlock extends CustomBlock {
    constructor() {
        super("Activate", "Foundry.Scene");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${scene_input}) await ${scene_input}.activate();`;
    }
}
Object.freeze(SceneActivateCustomBlock);

export class SceneViewCustomBlock extends CustomBlock {
    constructor() {
        super("View", "Foundry.Scene");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${scene_input}) await ${scene_input}.view();`;
    }
}
Object.freeze(SceneViewCustomBlock);

export class SceneGetAllCustomBlock extends CustomBlock {
    constructor() {
        super("GetAll", "Foundry.Scene");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.scenes`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(SceneGetAllCustomBlock);

export class SceneGetCurrentCustomBlock extends CustomBlock {
    constructor() {
        super("GetCurrent", "Foundry.Scene");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`canvas.scene`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(SceneGetCurrentCustomBlock);

export class SceneGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.Scene");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_lookuptype = block.getFieldValue('lookupType');
        const value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
        switch (dropdown_lookuptype) {
            case "name":
                return [`game.scenes.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.scenes.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}
Object.freeze(SceneGetByNameOrIdCustomBlock);
