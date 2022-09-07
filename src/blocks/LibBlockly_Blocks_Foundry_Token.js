import { CustomBlock } from "../CustomBlock.js";

/**
 * Toggle the combat state of tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to toggle combat state of. Can be an array of tokens.
 */
export class TokenToggleCombatStateCustomBlock extends CustomBlock {
    constructor() {
        super("ToggleCombatState", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.toggleTokenCombatState(${token_input});`;
    }
}
Object.freeze(TokenToggleCombatStateCustomBlock);

/**
 * Get all tokens in a scene.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Scene} scene The scene to get the tokens of.
 * @return {Array<Token>} All tokens ina scene.
 */
export class TokenGetAllInSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetAllInScene", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return [`helpers.getAllTokensInScene(${scene_input})`, Blockly.JavaScript.ORDER_NONE]
    }
}
Object.freeze(TokenGetAllInSceneCustomBlock);

/**
 * Get all tokens in current scene.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @return {Array<Token>} All tokens in current scene.
 */
export class TokenGetAllInCurrentSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetAllInCurrentScene", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        return [`await helpers.getAllTokensInScene(canvas.scene)`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(TokenGetAllInCurrentSceneCustomBlock);

/**
 * Get selected tokens. 
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @return {Array<Token>} All selected tokens.
 */
export class TokenGetSelectionCustomBlock extends CustomBlock {
    constructor() {
        super("GetSelection", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(TokenGetSelectionCustomBlock);

/**
 * Toggle the visibility of tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to toggle visibility of. Can be an array of tokens. 
 */
export class TokenToggleVisibilityCustomBlock extends CustomBlock {
    constructor() {
        super("ToggleVisibility", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.toggleTokenVisibility(${token_input});`;
    }
}
Object.freeze(TokenToggleVisibilityCustomBlock);

/**
 * Show tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to show. Can be an array of tokens.
 */
export class TokenShowCustomBlock extends CustomBlock {
    constructor() {
        super("Show", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, false);`;
    }
}
Object.freeze(TokenShowCustomBlock);

/**
 * Hide tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to hide. Can be an array of tokens.
 */
export class TokenHideCustomBlock extends CustomBlock {
    constructor() {
        super("Hide", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, true);`;
    }
}
Object.freeze(TokenHideCustomBlock);

/**
 * Rotate tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to rotate. Can be an array of tokens.
 * @param {Number} angle The angle to rotate the token by.
 * @param {String} mode The mode to rotate the token by. Can be "by" or "to".
 */
export class TokenRotateCustomBlock extends CustomBlock {
    constructor() {
        super("Rotate", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const value_tokens = Blockly.JavaScript.valueToCode(block, 'tokens', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_mode = block.getFieldValue('mode');
        const number_angle = block.getFieldValue('angle');

        return `await helpers.rotateToken(${value_tokens}, ${number_angle}, "${dropdown_mode}");`;
    }
}
Object.freeze(TokenRotateCustomBlock);

/**
 * Set scale of tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to set the scale of. Can be an array of tokens.
 * @param {Number} scale The scale to set the token to.
 */
export class TokenSetScaleCustomBlock extends CustomBlock {
    constructor() {
        super("SetScale", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const value_scale = Blockly.JavaScript.valueToCode(block, 'scale', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, ${value_scale});`;
    }
}
Object.freeze(TokenSetScaleCustomBlock);

/**
 * Reset scale of tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to reset the scale of. Can be an array of tokens.
 */
export class TokenResetScaleCustomBlock extends CustomBlock {
    constructor() {
        super("ResetScale", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, 1.0);`;
    }
}
Object.freeze(TokenResetScaleCustomBlock);

/**
 * Change elecation of tokens.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to change the elevation of. Can be an array of tokens.
 * @param {Number} elevation The elevation to change the token by.
 * @param {String} mode The mode to change the elevation by. Can be "by" or "to".
 */
export class TokenChangeElevationCustomBlock extends CustomBlock {
    constructor() {
        super("ChangeElevation", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_mode = block.getFieldValue('mode');
        const value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.tokenElevation(${value_token}, ${value_value}, "${dropdown_mode}");`;
    }
}
Object.freeze(TokenChangeElevationCustomBlock);

/**
 * Move tokens on canvas.
 * @extends CustomBlock
 * @category Foundry.Token
 * 
 * @param {Token|Array<Token>} token The token to move. Can be an array of tokens.
 * @param {Number} distance the distance to move the token by.
 * @param {String} unit the unit to move the token by. Can be "pixels", "ft" or "cell".
 * @param {Point} direction the direction to move the token by. 
 */
export class TokenMoveCustomBlock extends CustomBlock {
    constructor() {
        super("Move", "Foundry.Token");
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const value_distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_unit = block.getFieldValue('unit');
        const dropdown_direction = block.getFieldValue('direction');

        var distance = value_distance;
        switch (dropdown_unit) {
            case "ft": distance = distance * Math.floor(canvas.scene.grid.size / canvas.scene.grid.distance); break;
            case "cell": distance = distance * canvas.scene.grid.size; break;
            case "px":
            default: break;
        }

        const vector = { x: 0, y: 0 };
        if (dropdown_direction.includes("l")) vector.x = -distance;
        if (dropdown_direction.includes("r")) vector.x = distance;
        if (dropdown_direction.includes("u")) vector.y = -distance;
        if (dropdown_direction.includes("d")) vector.y = distance;
        return `await helpers.applyVectorToToken(${value_token}, {x:${vector.x}, y:${vector.y} });`;
    }
}
Object.freeze(TokenMoveCustomBlock);
