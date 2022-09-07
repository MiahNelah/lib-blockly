import { CustomBlock } from "../CustomBlock.js";

/**
 * Get an actor by its ID or its name.
 * @extends CustomBlock
 * @category Foundry.Actor
 * 
 * @param {String} idOrName The ID or name of the actor.
 * @param {String} mode The mode to use. Can be "id" or "name".
 * @returns {Actor|undefined} The actor, or undefined if not found.
 */
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

/**
 * Get the token of an actor.
 * @extends CustomBlock
 * @category Foundry.Actor
 * 
 * @param {Actor|Array<Actor>} actor The actor to get the token of. Can be an array of actors.
 * @returns {Token|Array<Token>|undefined} The token of the actor, or undefined if not found.
 */
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

/**
 * Get all actors in game.
 * @extends CustomBlock
 * @category Foundry.Actor
 * 
 * @return {Array<Actor>} All actors in game.
 */
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

/**
 * Get all tokens of an actor in current scene.
 * @extends CustomBlock
 * @category Foundry.Actor
 * 
 * @param {Actor|Array<Actor>} actor The actor to get the token of. Can be an array of actors.
 * @returns {Array<Token>|undefined} The token of the actor, or undefined if not found.
 */
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
