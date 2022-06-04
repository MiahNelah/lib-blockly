/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper and utility methods for the backpack plugin.
 * @author kozbial@google.com (Monica Kozbial)
 */

import {BackpackContextMenuOptions} from './options.js';
import './msg.js';

/**
 * Registers a context menu option to empty the backpack when right-clicked.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace to register the
 *   context menu option on.
 */
function registerEmptyBackpack(workspace) {
    const prevConfigureContextMenu = workspace.configureContextMenu;
    workspace.configureContextMenu = (menuOptions, e) => {
        const backpack = workspace.getComponentManager().getComponent('backpack');
        if (!backpack || !backpack.getClientRect().contains(e.clientX, e.clientY)) {
            prevConfigureContextMenu &&
            prevConfigureContextMenu.call(null, menuOptions, e);
            return;
        }
        menuOptions.length = 0;
        const backpackOptions = {
            text: Blockly.Msg['EMPTY_BACKPACK'],
            enabled: !!backpack.getCount(),
            callback: function() {
                backpack.empty();
            },
        };
        menuOptions.push(backpackOptions);
    };
}

/**
 * Registers a context menu option to remove a block from a backpack flyout.
 */
function registerRemoveFromBackpack() {
    if (Blockly.ContextMenuRegistry.registry.getItem('remove_from_backpack')) {
        return;
    }
    const removeFromBackpack = {
        displayText: Blockly.Msg['REMOVE_FROM_BACKPACK'],
        preconditionFn: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.block.workspace;
            if (ws.isFlyout && ws.targetWorkspace) {
                const backpack =
                    ws.targetWorkspace.getComponentManager().getComponent('backpack');
                if (backpack && backpack.getFlyout().getWorkspace().id === ws.id) {
                    return 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const backpack =scope.block.workspace.targetWorkspace
                .getComponentManager().getComponent('backpack');
            backpack.removeBlock(scope.block);
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        id: 'remove_from_backpack',
        // Use a larger weight to push the option lower on the context menu.
        weight: 200,
    };
    Blockly.ContextMenuRegistry.registry.register(removeFromBackpack);
}

/**
 * Registers context menu options for adding a block to the backpack.
 * @param {boolean} disablePreconditionContainsCheck Whether to disable the
 *   precondition check for whether the backpack contains the block.
 */
function registerCopyToBackpack(disablePreconditionContainsCheck) {
    if (Blockly.ContextMenuRegistry.registry.getItem('copy_to_backpack')) {
        return;
    }
    const copyToBackpack = {
        displayText: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            if (!scope.block) {
                return;
            }
            const backpack = scope.block.workspace.getComponentManager()
                .getComponent('backpack');
            const backpackCount = backpack.getCount();
            return `${Blockly.Msg['COPY_TO_BACKPACK']} (${backpackCount})`;
        },
        preconditionFn: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.block.workspace;
            if (!ws.isFlyout) {
                const backpack = ws.getComponentManager().getComponent('backpack');
                if (backpack) {
                    if (disablePreconditionContainsCheck) {
                        return 'enabled';
                    }
                    return backpack.containsBlock(scope.block) ? 'disabled' : 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const backpack =
                scope.block.workspace.getComponentManager().getComponent('backpack');
            backpack.addBlock(scope.block);
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        id: 'copy_to_backpack',
        // Use a larger weight to push the option lower on the context menu.
        weight: 200,
    };
    Blockly.ContextMenuRegistry.registry.register(copyToBackpack);
}

/**
 * Registers context menu options for copying all blocks from the workspace to
 * the backpack.
 */
function registerCopyAllBackpack() {
    if (Blockly.ContextMenuRegistry.registry.getItem('copy_all_to_backpack')) {
        return;
    }
    const copyAllToBackpack = {
        displayText: Blockly.Msg['COPY_ALL_TO_BACKPACK'],
        preconditionFn: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.workspace;
            if (!ws.isFlyout) {
                const backpack = ws.getComponentManager().getComponent('backpack');
                if (backpack) {
                    return 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.workspace;
            const backpack = ws.getComponentManager().getComponent('backpack');
            backpack.addBlocks(ws.getTopBlocks());
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        id: 'copy_all_to_backpack',
        // Use a larger weight to push the option lower on the context menu.
        weight: 200,
    };
    Blockly.ContextMenuRegistry.registry.register(copyAllToBackpack);
}

/**
 * Registers context menu options for pasting all blocks from the backpack to
 * the workspace.
 */
function registerPasteAllBackpack() {
    if (Blockly.ContextMenuRegistry.registry.getItem('paste_all_from_backpack')) {
        return;
    }
    const pasteAllFromBackpack = {
        displayText: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            if (!scope.workspace) {
                return;
            }
            const backpack =
                scope.workspace.getComponentManager().getComponent('backpack');
            const backpackCount = backpack.getCount();
            return `${Blockly.Msg['PASTE_ALL_FROM_BACKPACK']} (${backpackCount})`;
        },
        preconditionFn: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.workspace;
            if (!ws.isFlyout) {
                const backpack = ws.getComponentManager().getComponent('backpack');
                if (backpack) {
                    return 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(
            /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            const ws = scope.workspace;
            const backpack = ws.getComponentManager().getComponent('backpack');
            const contents = backpack.getContents();
            contents.forEach((blockText) => {
                const block =
                    Blockly.Xml.domToBlock(Blockly.Xml.textToDom(blockText), ws);
                block.scheduleSnapAndBump();
            });
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        id: 'paste_all_from_backpack',
        // Use a larger weight to push the option lower on the context menu.
        weight: 200,
    };
    Blockly.ContextMenuRegistry.registry.register(pasteAllFromBackpack);
}

/**
 * Register all context menu options.
 * @param {!BackpackContextMenuOptions} contextMenuOptions The backpack context
 *    menu options.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace to register the
 *    context menu options.
 */
export function registerContextMenus(contextMenuOptions, workspace) {
    if (contextMenuOptions.emptyBackpack) {
        registerEmptyBackpack(workspace);
    }
    if (contextMenuOptions.removeFromBackpack) {
        registerRemoveFromBackpack();
    }
    if (contextMenuOptions.copyToBackpack) {
        registerCopyToBackpack(
            contextMenuOptions.disablePreconditionChecks);
    }
    if (contextMenuOptions.copyAllToBackpack) {
        registerCopyAllBackpack();
    }
    if (contextMenuOptions.pasteAllToBackpack) {
        registerPasteAllBackpack();
    }
}

/**
 * Converts XML representing a block into text that can be stored in the
 * content array.
 * @param {!Element} xml An XML tree defining the block and any
 *    connected child blocks.
 * @return {string} Text representing the XML tree, cleaned of all unnecessary
 * attributes.
 */
export function cleanBlockXML(xml) {
    const xmlBlock = xml.cloneNode(true);
    let node = xmlBlock;
    while (node) {
        // Things like text inside tags are still treated as nodes, but they
        // don't have attributes (or the removeAttribute function) so we can
        // skip removing attributes from them.
        if (node.removeAttribute) {
            node.removeAttribute('x');
            node.removeAttribute('y');
            node.removeAttribute('id');
            node.removeAttribute('disabled');
            if (node.nodeName == 'comment') {
                node.removeAttribute('h');
                node.removeAttribute('w');
                node.removeAttribute('pinned');
            }
        }

        // Try to go down the tree
        let nextNode = node.firstChild || node.nextSibling;
        // If we can't go down, try to go back up the tree.
        if (!nextNode) {
            nextNode = node.parentNode;
            while (nextNode) {
                // We are valid again!
                if (nextNode.nextSibling) {
                    nextNode = nextNode.nextSibling;
                    break;
                }
                // Try going up again. If parentNode is null that means we have
                // reached the top, and we will break out of both loops.
                nextNode = nextNode.parentNode;
            }
        }
        node = nextNode;
    }
    return Blockly.Xml.domToText(xmlBlock);
}