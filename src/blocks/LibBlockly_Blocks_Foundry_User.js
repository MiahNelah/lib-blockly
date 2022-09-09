import { CustomBlock } from "../CustomBlock.js";

/**
 *
 */
export class UserGetAllCustomBlock extends CustomBlock {
    constructor() {
        super("GetAll", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.users`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(UserGetAllCustomBlock);

/**
 *
 */
export class UserGetActorCustomBlock extends CustomBlock {
    constructor() {
        super("GetActor", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const user_name = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${user_name}?.character`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(UserGetActorCustomBlock);

/**
 *
 */
export class UserGetTokenInSceneCustomBlock extends CustomBlock {
    constructor() {
        super("GetTokenInScene", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const user_name = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_ATOMIC);
        return [`canvas.tokens.placeables.find(x => x.actor?.id === ${user_name}.character?.id)`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(UserGetTokenInSceneCustomBlock);

/**
 *
 */
export class UserGetNyNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.User");
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
                return [`game.users.getName("${value_input}")`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.users.get("${value_input}")`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}
Object.freeze(UserGetNyNameOrIdCustomBlock);

/**
 *
 */
export class UserPullToSceneCustomBlock extends CustomBlock {
    constructor() {
        super("PullToScene", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);
        const sceneInput_input = Blockly.JavaScript.valueToCode(block, 'sceneInput', Blockly.JavaScript.ORDER_ATOMIC);

        const userInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_pull_to_scene$userInput', Blockly.Variables.NAME_TYPE);
        const sceneInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_pull_to_scene$sceneInput', Blockly.Variables.NAME_TYPE);

        let code = `// Pull users to scene\n`;
        code += `let ${sceneInput} = ${sceneInput_input};\n`;
        code += `if (${sceneInput}) {\n`;
        code += `\t${sceneInput} = ${sceneInput} instanceof Scene ? ${sceneInput_input} : game.scenes.get(${sceneInput_input})\n`;
        code += `\tif (${sceneInput}) {\n`;
        code += `\t\tlet ${userInput} = ${userInput_input};\n`;
        code += `\t\tif (${userInput}) {\n`;
        code += `\t\t\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
        code += `\t\t\tif (${userInput} && ${userInput} instanceof User) {\n`;
        code += `\t\t\t\tgame.socket.emit("pullToScene", ${sceneInput}, ${userInput});\n`;
        code += `\t\t\t} else if (${userInput} && ${userInput} instanceof Array) {\n`;
        code += `\t\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => game.socket.emit("pullToScene", ${sceneInput}, user));\n`;
        code += `\t\t\t}\n`;
        code += `\t\t}\n`;
        code += `\t}\n`;
        code += `}\n\n`;

        return code;
    }
}
Object.freeze(UserPullToSceneCustomBlock);

/**
 *
 */
export class UserBanCustomBlock extends CustomBlock {
    constructor() {
        super("Ban", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);

        const userInput = Blockly.JavaScript.nameDB_.getDistinctName('oundry_user_ban_user$userInput', Blockly.Variables.NAME_TYPE);

        let code = `// Ban user\n`;
        code += `let ${userInput} = ${userInput_input};\n`;
        code += `if (${userInput}) {\n`;
        code += `\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
        code += `\tif (${userInput}) {\n`;
        code += `\t\tif (${userInput} instanceof User) {\n`;
        code += `\t\t\t${userInput}.update({role: CONST.USER_ROLES.NONE});\n`;
        code += `\t\t} else if (${userInput} instanceof Array) {\n`;
        code += `\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => user.update({role: CONST.USER_ROLES.NONE}));\n`;
        code += `\t\t}\n`;
        code += `\t}\n`;
        code += `}\n\n`;

        return code;
    }
}
Object.freeze(UserBanCustomBlock);

/**
 *
 */
export class UserUnbanCustomBlock extends CustomBlock {
    constructor() {
        super("Unban", "Foundry.User");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const userInput_input = Blockly.JavaScript.valueToCode(block, 'userInput', Blockly.JavaScript.ORDER_ATOMIC);
        const userInput = Blockly.JavaScript.nameDB_.getDistinctName('foundry_user_unban_user$userInput', Blockly.Variables.NAME_TYPE);

        let code = `// Un-Ban user\n`;
        code += `let ${userInput} = ${userInput_input};\n`;
        code += `if (${userInput}) {\n`;
        code += `\t${userInput} = (${userInput} instanceof User || ${userInput} instanceof Array) ? ${userInput} : game.users.get(${userInput});\n`;
        code += `\tif (${userInput}) {\n`;
        code += `\t\tif (${userInput} instanceof User) {\n`;
        code += `\t\t\t${userInput}.update({role: CONST.USER_ROLES.PLAYER});\n`;
        code += `\t\t} else if (${userInput} instanceof Array) {\n`;
        code += `\t\t\t${userInput}.filter(item => item instanceof User).forEach(user => user.update({role: CONST.USER_ROLES.PLAYER}));\n`;
        code += `\t\t}\n`;
        code += `\t}\n`;
        code += `}\n\n`;

        return code;
    }
}
Object.freeze(UserUnbanCustomBlock);