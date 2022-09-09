export default function () {
    return {
        /******* ACTOR *******/
        "Foundry.Actor.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Actor"
            ],
        },

        "Foundry.Actor.GetToken": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "token",
                    "check": [
                        "Token"
                    ]
                }
            ],
            "output": "Actor",
        },

        "Foundry.Actor.GetAll": {
            "output": "Array",
        },

        "Foundry.Actor.GetTokensInCurrentScene": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "actor",
                    "check": [
                        "Actor"
                    ]
                }
            ],
            "output": "Array",
            "inputsInline": true,
        },

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
        "Foundry.Combat.Create": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": [
                        "Scene"
                    ]
                }
            ],
            "output": "Combat",
        },

        "Foundry.Combat.GetActive": {
            "output": "Combat",
        },

        "Foundry.Combat.IsActive": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "output": "Boolean",
        },

        "Foundry.Combat.Start": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.Activate": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.Delete": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": "Combat"
                },
                {
                    "type": "field_checkbox",
                    "name": "confirmation",
                    "checked": true
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.Reset": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.NextRound": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.PreviousRound": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.NextTurn": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Combat.PreviousTurn": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "combat",
                    "check": [
                        "Combat"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },


        /******* ITEM *******/
        "Foundry.Item.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Item"
            ],
        },

        "Foundry.Item.GetFromActorOrToken": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "actorOrToken",
                    "check": [
                        "Actor",
                        "Token",
                        "String"
                    ]
                }
            ],
            "output": [
                "Array"
            ],
        },

        "Foundry.Item.AddToTokenOrActor": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "item",
                    "check": [
                        "Item",
                        "Array",
                        "String"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "parent",
                    "check": [
                        "Token",
                        "Actor",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Item.RemoveFromActorOrToken": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "items",
                    "check": ["Array", "Item"]
                },
                {
                    "type": "input_value",
                    "name": "actorOrToken",
                    "check": [
                        "Actor",
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        /******* JOURNAL *******/
        "Foundry.Journal.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "JournalEntry"
            ],
        },


        "Foundry.Journal.Open": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "journal",
                    "check": [
                        "JournalEntry"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },


        "Foundry.Journal.ShowAs": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "journal",
                    "check": [
                        "JournalEntry",
                        "String"
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "showAs",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Journal.ShowAs.ShowAsText"), "text"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Journal.ShowAs.ShowAsImage"), "image"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },


        /******* MACRO *******/
        "Foundry.Macro.GetAll": {
            "output": [
                "Array"
            ],
        },


        "Foundry.Macro.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "check": "String",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Macro"
            ],
        },


        "Foundry.Macro.Run": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "macro",
                    "check": [
                        "Macro",
                        "Array",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },


        "Foundry.Macro.CanRun": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "macro",
                    "check": [
                        "Macro",
                        "String"
                    ]
                }
            ],
            "inputsInline": true,
            "output": "Boolean",
        },


        /******* PLAYLIST *******/
        "Foundry.Playlist.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Playlist"
            ],
        },

        "Foundry.Playlist.Play": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Playlist.PlayNextTrack": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Playlist.PlayPreviousTrack": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Playlist.GetAll": {
            "output": "Array",
        },

        "Foundry.Playlist.GetPlaying": {
            "output": "Array",
        },

        "Foundry.Playlist.Stop": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "Array",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Playlist.CycleMode": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },


        /******* ROLL *******/
        "Foundry.Roll.Roll": {
            "args0": [
                {
                    "type": "field_input",
                    "name": "rollExpression",
                    "check": "String",
                    "text": "1d6"
                }
            ],
            "output": "Number",
        },


        /******* ROLLTABLE *******/
        "Foundry.RollTable.GetTableResultData": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "propertyKey",
                    "options": [
                        ["Text", "text"],
                        ["Drawn", "drawn"],
                        ["Type", "type"],
                        ["Weight", "weight"],
                        ["Result ID", "resultId"],
                        ["Low Range", "lowRange"],
                        ["High Range", "highRange"],
                        ["Image", "img"],
                        ["Collection", "collection"]
                    ]
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "tableResult",
                    "check": "TableResult"
                }
            ],
            "inputsInline": game.i18n.localize("LibBlockly.Blocks.Foundry.RollTable.GetTableResultData.InlineInputs"),
            "output": null,
        },


        "Foundry.RollTable.Roll": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "rolltable",
                    "check": [
                        "RollTable",
                        "String"
                    ]
                }
            ],
            "output": "Array",
        },


        "Foundry.RollTable.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "RollTable"
            ],
        },


        /******* SCENE *******/
        "Foundry.Scene.Activate": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Scene.View": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "scene",
                    "check": "Scene"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
        },

        "Foundry.Scene.GetAll": {
            "output": "Array",
        },

        "Foundry.Scene.GetCurrent": {
            "output": "Scene",
        },

        "Foundry.Scene.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Scene"
            ],
        },


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
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Step.By"), "by"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Step.To"), "to"]
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
        "Foundry.User.GetAll": {
            "output": "Array",

        },

        "Foundry.User.GetActor": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "user",
                    "check": "User"
                }
            ],
            "output": "Actor",
        },

        "Foundry.User.GetTokenInScene": {
            "args0": [
                {
                    "type": "input_value",
                    "name": "user",
                    "check": "User"
                }
            ],
            "output": "Token",
        },

        "Foundry.User.GetByNameOrId": {
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Generic.Lookup.ByKey"), "id"]
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
        },

        "Foundry.User.PullToScene": {
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
        },

        "Foundry.User.Ban": {
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
        },

        "Foundry.User.Unban": {
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
        },



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
                    "check": [
                        "Number",
                        "String",
                        "Boolean"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        },

    }
}