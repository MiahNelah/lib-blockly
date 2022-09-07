export default function () {
    return {
        /******* ACTOR *******/


        /******* CHAT *******/
        "Foundry.Chat.SendMessage": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "message",
                    "check": [
                        "String",
                        "RollResult"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "flavorText",
                    "check": "String",
                    "align": "RIGHT"
                },
                {
                    "type": "input_value",
                    "name": "speakerActor",
                    "check": [
                        "Actor"
                    ],
                    "align": "RIGHT"
                },
                {
                    "type": "field_checkbox",
                    "name": "blindMode",
                    "checked": true
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
        },

        /******* COMBAT *******/


        /******* ITEM *******/


        /******* JOURNAL *******/


        /******* MACRO *******/


        /******* PLAYLIST *******/


        /******* ROLL *******/


        /******* ROLLTABLE *******/


        /******* SCENE *******/


        /******* TOKEN *******/
        "Foundry.Token.ToggleCombatState": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.GetAllInCurrentScene": {
            "output": "Array"
        },

        "Foundry.Token.GetAllInScene": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "output": "Array"
        },

        "Foundry.Token.GetSelection": {
            "output": "Array"
        },

        "Foundry.Token.ToggleVisibility": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.Show": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.Hide": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.Rotate": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "tokens",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Token.Rotate.AngleMode.By"), "by"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Token.Rotate.AngleMode.To"), "to"]
                    ]
                },
                {
                    "type": "field_number",
                    "name": "angle",
                    "value": 90
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true
        },

        "Foundry.Token.SetScale": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "scale",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.ResetScale": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.Move": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Array",
                        "Token"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "distance",
                    "check": "Number"
                },
                {
                    "type": "field_dropdown",
                    "name": "unit",
                    "options": [
                        ["px", "px"],
                        ["ft", "ft"],
                        ["cell", "cell"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        ["↑", "u"],
                        ["↗", "ur"],
                        ["→", "r"],
                        ["↘", "dr"],
                        ["↓", "d"],
                        ["↙", "dl"],
                        ["←", "l"],
                        ["↖", "ul"]
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null
        },

        "Foundry.Token.ChangeElevation": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token",
                        "Array"
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Token.ChangeElevation.AngleMode.By"), "by"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Token.ChangeElevation.Mode.To"), "to"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "value",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null
        },


        /******* USER *******/



        /******* UTILS *******/
        "Foundry.Utils.Wait": {
            "args0": [
                {
                    "type": "field_number",
                    "name": "delay",
                    "value": 1,
                    "min": 0
                },
                {
                    "type": "field_dropdown",
                    "name": "units",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.Wait.Seconds"), "s"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.Wait.Milliseconds"), "ms"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Utils.ShowNotification": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "notificationType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.ShowNotification.NotificationType.Info"), "info"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.ShowNotification.NotificationType.Warning"), "warn"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.ShowNotification.NotificationType.Error"), "error"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "message",
                    "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

    }
}