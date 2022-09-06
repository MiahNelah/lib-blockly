/**
 *
 */
export class GetAllUsersCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_get_all_user";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.GetAllUsers.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.User.GetAllUsers.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.GetAllUsers.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.GetAllUsers.Tooltip")
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.users`, Blockly.JavaScript.ORDER_NONE];
    }
}

/**
 *
 */
export class GetActorOfUserCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_get_user_actor";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.GetActorOfUser.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "user",
                    "check": "User"
                }
            ],
            "output": "Actor",
            "colour": game.i18n.localize("LibBlockly.Blocks.User.GetActorOfUser.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.GetActorOfUser.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.GetActorOfUser.HelpUrl")
        }
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

/**
 *
 */
export class GetTokenOfUserInSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_get_user_token_in_scene";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.GetTokenOfUserInScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "user",
                    "check": "User"
                }
            ],
            "output": "Token",
            "colour": game.i18n.localize("LibBlockly.Blocks.User.GetTokenOfUserInScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.GetTokenOfUserInScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.GetTokenOfUserInScene.HelpUrl")
        }
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

/**
 *
 */
export class GetUserNyNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_get_user_by_name_or_id";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "User",
                "undefined"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.GetUserNyNameOrId.HelpUrl"),
        }
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

/**
 *
 */
export class PullUsersToSceneCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_pull_to_scene";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.PullUsersToScene.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "userInput",
                    "check": [
                        "String",
                        "Array",
                        "User"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "sceneInput",
                    "check": [
                        "String",
                        "Scene"
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.User.PullUsersToScene.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.PullUsersToScene.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.PullUsersToScene.HelpUrl")
        }
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

/**
 *
 */
export class BanUserCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_ban_user";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "userInput",
                    "check": ["User", "Array", "String"]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.BanUser.HelpUrl"),
        }
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

/**
 *
 */
export class UnbanUserCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_user_unban_user";
        this.category = "Foundry.User";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "userInput",
                    "check": ["User", "Array", "String"]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.User.BanUser.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.User.BanUser.HelpUrl"),
        }
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