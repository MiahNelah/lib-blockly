export default function () {
    return {

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
        }
    }
}