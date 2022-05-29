# About

 :warning: This module is still in experimental state. Only pure algorithmic blocks are available for the moment, Foundry specific ones are under implementation.  :warning:

You love creating fantastic worlds and stories in Foundry, but you're afraid of macros? Would you rather plan your campaign than lear how to program? 

Lib-Blockly offers a visual macro editor integrated with Foundry using Google Blockly technology. This type of editor is generally used for the initiation to programming, so it is easy to access: only the understanding of the algorithmic logic is necessary.

Lib-Blockly is also extensible framework which allow developers to create new blocks for general purposes or to help people to use their own modules.

Minimum Core Version: 0.9.242 (not tested on newer versions)

# Demo

"Hello, World !"

![HelloWorld](https://user-images.githubusercontent.com/1334405/170825801-e54456d6-5bea-4874-a5de-b670f1a79a03.gif)

(more to come :blush:)

# Roadmap
  * Initialise docs
    * How to create a blockly macro
    * Basic blocks documentation  
  * Create dedicated Foundry's blocks
    * Actors
    * Tokens
    * Rolltables
    * ChatMessage
    * Playlists
    * Encounters
    * Journal  
  * Make it easier to create custom blocks for developers  
  * Add better localisation handling  
  * (let's see later...)

# Known bugs
  * Editor is only resized when interacting with editor, not on macro window resizing
    * this is a temporary solution, it will be fixed later  

# Extensibility

You can easily add new custom blocks using Google Blockly documentation. Keep in mind there is two way to declare a block : a JSON object or a Javascript function. Both are useful in many situations : for instance, JSON object is better to handle localisation, but javascript function is better at handling dynamic usecases.

If you really need to benefits from both, call `this.jsonInit()` inside a javascript function to load a JSON object. You can then complete with custom, dynamic code.

Here is how "Roll 1d6" block could be implemented:
```javascript
// You can define your block as a JSON object
// This is fast to do and very handy for localisation
Blockly.defineBlocksWithJsonArray([
    {
        "type": "my_roll_example",
        "message0": "Roll %1",
        "args0": [
          {
            "type": "field_input",
            "name": "rollExpression",
            "text": "1d6"
          }
        ],
        "output": "String",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      }
]);

// OR you can define block using Javascript
Blockly.Blocks["my_roll_example"] = {
    init: async function () {
        this.appendDummyInput()
            .appendField("Roll ")
            .appendField(new Blockly.FieldTextInput("1d6"), "rollExpression");
        this.setOutput(true, 'String');
        this.setNextStatement(false);
        this.setPreviousStatement(false);
        this.setColour(160);
        this.setHelpUrl("");
        this.setTooltip("");
    }
}

// Your block will be far more useful if code can be generated from it!
// Here is how to implement it. Block defintion and code generator are linked using the 'type' key.
Blockly.JavaScript["my_roll_example"] = function (block) {
    const rollexpression_value = block.getField("rollExpression").getValue();
    return `(await (new Roll("${rollexpression_value}")).roll()).result`;
}

// We're almost done! Your block is declared and code generator is ready.
// We still have a last thing to do: add custom block to toolbox to make it usable!
const toolbox = [
    {
        "kind": "category",
        "name": "My custom blocks",
        "contents": [
            {
                "kind": "block",
                "type": "my_roll_example"
            }
        ]
    }
]

Hooks.once('ready', () => {
  game.modules.get("lib-blockly").instance.toolbox().contents.find(x => x.name === "Foundry").contents.push(...toolbox);
})

```
