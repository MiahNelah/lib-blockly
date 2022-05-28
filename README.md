# About

 :warning: This module is still in experimental state. Only pure algorithmic blocks are available for the moment, Foundry specific ones are under implementation.

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
  * blockly editor is not resized when window changed 
    * temp fix: set desired window size, save your macro and reopen it
  * blockly editor not showing when another blockly editor is open

# Extensibility

Extensibility is still very WIP. Creating custom blocks and code geenrator is easy to do : you just have to follow Google Blockly documentation. However, Lib-Blockly need a way to register some custom toolbox settings in order to provide newly created custom blocks to user.
