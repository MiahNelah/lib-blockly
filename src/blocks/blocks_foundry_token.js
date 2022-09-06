import { CustomBlock } from "../CustomBlock.js";

export class TokenToggleCombatStateCustomBlock extends CustomBlock {
    constructor() {
        super("ToggleCombatState", "Foundry.Token");
    }
    
    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.toggleTokenCombatState(${token_input});`;
    }
}
Object.freeze(TokenToggleCombatStateCustomBlock);


export class TokenGetAllInSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetAllInScene", "Foundry.Token");
    }
    
    generateCode(block) {
        const scene_input = Blockly.JavaScript.valueToCode(block, 'scene', Blockly.JavaScript.ORDER_ATOMIC);
        return [`helpers.getAllTokensInScene(${scene_input})`, Blockly.JavaScript.ORDER_NONE]
    }
}
Object.freeze(TokenGetAllInSceneCustomBlock);


export class TokenGetAllInCurrentSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetAllInCurrentScene", "Foundry.Token");
    }
    
    generateCode(block) {
        return [`await helpers.getAllTokensInScene(canvas.scene)`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(TokenGetAllInCurrentSceneCustomBlock);


export class TokenGetSelectionCustomBlock extends CustomBlock {
    constructor() {
        super("GetSelection", "Foundry.Token");
    }
    
    generateCode(block) {
        return [`canvas.tokens.controlled`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(TokenGetSelectionCustomBlock);


export class TokenToggleVisibilityCustomBlock extends CustomBlock {
    constructor() {
        super("ToggleVisibility", "Foundry.Token");
    }

    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.toggleTokenVisibility(${token_input});`;
    }
}
Object.freeze(TokenToggleVisibilityCustomBlock);


export class TokenShowCustomBlock extends CustomBlock {
    constructor() {
        super("Show", "Foundry.Token");
    }

    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, false);`;
    }
}
Object.freeze(TokenShowCustomBlock);


export class TokenHideCustomBlock extends CustomBlock {
    constructor() {
        super("Hide", "Foundry.Token");
    }

    generateCode(block) {
        const token_input = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        return `await helpers.setTokenVisibility(${token_input}, true);`;
    }
}
Object.freeze(TokenHideCustomBlock);


export class TokenRotateCustomBlock extends CustomBlock {
    constructor() {
        super("Rotate", "Foundry.Token");
    }
    
    generateCode(block) {
        const value_tokens = Blockly.JavaScript.valueToCode(block, 'tokens', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_mode = block.getFieldValue('mode');
        const number_angle = block.getFieldValue('angle');

        return `await helpers.rotateToken(${value_tokens}, ${number_angle}, "${dropdown_mode}");`;
    }
}
Object.freeze(TokenRotateCustomBlock);


export class TokenSetScaleCustomBlock extends CustomBlock {
    constructor() {
        super("SetScale", "Foundry.Token");
    }

    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const value_scale = Blockly.JavaScript.valueToCode(block, 'scale', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, ${value_scale});`;
    }
}
Object.freeze(TokenSetScaleCustomBlock);


export class TokenResetScaleCustomBlock extends CustomBlock {
    constructor() {
        super("ResetScale", "Foundry.Token");
    }
    
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.setTokenScale(${value_token}, 1.0);`;
    }
}
Object.freeze(TokenResetScaleCustomBlock);


export class TokenChangeElevationCustomBlock extends CustomBlock {
    constructor() {
        super("ChangeElevation", "Foundry.Token");
    }
    
    generateCode(block) {
        const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_mode = block.getFieldValue('mode');
        const value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

        return `await helpers.tokenElevation(${value_token}, ${value_value}, "${dropdown_mode}");`;
    }
}
Object.freeze(TokenChangeElevationCustomBlock);


export class TokenMoveCustomBlock extends CustomBlock {
    constructor() {
        super("Move", "Foundry.Token");
    }

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
