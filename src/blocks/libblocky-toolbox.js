export default {
    kind: "categoryToolbox",
    contents: [
        // Dynamic Variables category
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE"
        },

        // Dynamic Functions category
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE"
        },

        // separator
        {
            "kind": "sep",
            "cssConfig": {
                "container": "blocklyTreeSeparator"
            }
        },


        // Category Math
        {
            "kind": "category",
            "name": "Math",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number"
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic"
                },
                {
                    "kind": "block",
                    "type": "math_single"
                },
                {
                    "kind": "block",
                    "type": "math_trig"
                },
                {
                    "kind": "block",
                    "type": "math_constant"
                },
                {
                    "kind": "block",
                    "type": "math_number_property"
                },
                {
                    "kind": "block",
                    "type": "math_round"
                },
                {
                    "kind": "block",
                    "type": "math_on_list"
                },
                {
                    "kind": "block",
                    "type": "math_modulo"
                },
                {
                    "kind": "block",
                    "type": "math_random_int"
                },
                {
                    "kind": "block",
                    "type": "math_random_float"
                },
                {
                    "kind": "block",
                    "type": "math_atan2"
                }
            ]
        },

        // Category Text
        {
            "kind": "category",
            "name": "Text",
            "contents": [
                {
                    "kind": "block",
                    "type": "text"
                },
                {
                    "kind": "block",
                    "type": "text_multiline"
                },
                {
                    "kind": "block",
                    "type": "text_join"
                },
                {
                    "kind": "block",
                    "type": "text_create_join_container"
                },
                {
                    "kind": "block",
                    "type": "text_create_join_item"
                },
                {
                    "kind": "block",
                    "type": "text_append"
                },
                {
                    "kind": "block",
                    "type": "text_length"
                },
                {
                    "kind": "block",
                    "type": "text_isEmpty"
                },
                {
                    "kind": "block",
                    "type": "text_indexOf"
                },
                {
                    "kind": "block",
                    "type": "text_charAt"
                },
                {
                    "kind": "block",
                    "type": "text_getSubstring"
                },
                {
                    "kind": "block",
                    "type": "text_changeCase"
                },
                {
                    "kind": "block",
                    "type": "text_trim"
                },
                {
                    "kind": "block",
                    "type": "text_print"
                },
                {
                    "kind": "block",
                    "type": "text_prompt_ext"
                },
                {
                    "kind": "block",
                    "type": "text_prompt"
                },
                {
                    "kind": "block",
                    "type": "text_count"
                },
                {
                    "kind": "block",
                    "type": "text_replace"
                },
                {
                    "kind": "block",
                    "type": "text_reverse"
                }
            ]
        },

        // Category Control
        {
            "kind": "category",
            "name": "Control",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "controls_ifelse"
                }
            ]
        },

        // Category Logic
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                },
                {
                    "kind": "block",
                    "type": "logic_boolean"
                },
                {
                    "kind": "block",
                    "type": "logic_null"
                },
                {
                    "kind": "block",
                    "type": "logic_ternary"
                }
            ]
        },

        // Category Loops
        {
            "kind": "category",
            "name": "Loops",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext"
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil"
                },
                {
                    "kind": "block",
                    "type": "controls_for"
                },
                {
                    "kind": "block",
                    "type": "controls_forEach"
                },
                {
                    "kind": "block",
                    "type": "controls_flow_statements"
                }
            ]
        },

        // Category List
        {
            "kind": "category",
            "name": "List",
            "contents": [
                {
                    "kind": "block",
                    "type": "lists_create_empty"
                },
                {
                    "kind": "block",
                    "type": "lists_create_with"
                },
                {
                    "kind": "block",
                    "type": "lists_create_with_container"
                },
                {
                    "kind": "block",
                    "type": "lists_repeat"
                },
                {
                    "kind": "block",
                    "type": "lists_reverse"
                },
                {
                    "kind": "block",
                    "type": "lists_length"
                },
                {
                    "kind": "block",
                    "type": "lists_getSublist"
                },
                {
                    "kind": "block",
                    "type": "lists_isEmpty"
                },
                {
                    "kind": "block",
                    "type": "lists_split"
                },
                {
                    "kind": "block",
                    "type": "lists_sort"
                },
                {
                    "kind": "block",
                    "type": "lists_indexOf"
                },
                {
                    "kind": "block",
                    "type": "lists_getIndex"
                },
                {
                    "kind": "block",
                    "type": "lists_setIndex"
                }
            ]
        },

        // separator
        {
            "kind": "sep",
            "cssConfig": {
                "container": "blocklyTreeSeparator"
            }
        },

        // Category Control
        {
            "kind": "category",
            "name": "Foundry",
            "contents": [
                {

                    "kind": "category",
                    "name": "Actor",
                    "contents": [
                        /*
                        {
                            "kind": "block",
                            "type": "controls_if"
                        },
                        {
                            "kind": "block",
                            "type": "controls_ifelse"
                        }
                        */
                    ]
                },
            ]
        }
    ]
}