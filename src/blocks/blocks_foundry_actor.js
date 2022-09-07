import { CustomBlock } from "../CustomBlock.js";

export class ActorGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.Actor");
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
                return [`game.actors.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.actors.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}
Object.freeze(ActorGetByNameOrIdCustomBlock);

export class ActorGetTokenCustomBlock extends CustomBlock {
    constructor() {
        super("GetToken", "Foundry.Actor");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_input}?.actors`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(ActorGetTokenCustomBlock);

export class ActorGetAllCustomBlock extends CustomBlock {
    constructor() {
        super("GetAll", "Foundry.Actor");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.actors`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(ActorGetAllCustomBlock);

export class ActorGetTokensInCurrentSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetTokensInCurrentScene", "Foundry.Actor");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const actor_input = Blockly.JavaScript.valueToCode(block, 'actor', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${actor_input}.getActiveTokens()`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(ActorGetTokensInCurrentSceneCustomBlock);
