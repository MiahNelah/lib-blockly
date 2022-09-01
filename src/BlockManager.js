import { LibBlockly } from "./LibBlockly.js";

/**
 * @typedef {Object} CustomBlock
 * @property {!String} key
 * @property {!String} kind
 * @property {!String} category
 * @property {!Function} init
 * @property {!Function} generateCode
 */
export class BlockManager {
    constructor() {
    }

    /**
     *
     * @param {!Array.<CustomBlock>} blocks
     */
    register(blocks) {
        Blockly.defineBlocksWithJsonArray(blocks.map(block => this._wrapInit(block)));
        blocks.forEach(block => {
            Blockly.JavaScript[block.key] = block.generateCode;
            const category = LibBlockly.toolboxManager.getCategory(block.category, true);
            category.addBlock(block.kind, block.key);
        });
    }

    /**
     *
     * @param {!CustomBlock} block
     * @returns {*}
     * @private
     */
    _wrapInit(block) {
        return mergeObject({ type: block.key, ...block.init() });
    }
}

export class Helpers {

    async rotateToken(token, angle, mode = "by") {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (angle === undefined || typeof angle !== 'number') return;
        if (!["by", "to"].includes(mode.toLowerCase())) return;

        if (Array.isArray(token) && token.length > 0) {
            await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => {
                const originalRotation = mode === "by" ? t.document.rotation : 0;
                return { _id: t.id, rotation: originalRotation + angle };
            }));
        } else if (token instanceof Token) {
            const originalRotation = mode === "by" ? token.document.rotation : 0;
            await canvas.scene.updateEmbeddedDocuments("Token", ({ _id: token.id, rotation: originalRotation + angle }));
        }
    }

    async setTokenVisibility(token, hidden) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (hidden === undefined || typeof hidden !== 'boolean') return;

        if (Array.isArray(token) && token.length > 0) {
            await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => ({ _id: t.id, hidden: hidden })));
        } else if (token instanceof Token) {
            await canvas.scene.updateEmbeddedDocuments("Token", { _id: token.id, hidden: hidden });
        }
    }

    async toggleTokenVisibility(token) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;

        if (Array.isArray(token) && token.length > 0) {
            await Promise.all(token.map(t => t.toggleVisibility()));
        } else if (token instanceof Token) {
            await token.toggleVisibility();
        }
    }

    async toggleTokenCombatState(token) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;

        if (Array.isArray(token) && token.length > 0) {
            return await Promise.all(token.map(t => t.toggleCombat()));
        } else if (token instanceof Token) {
            return await token.toggleCombat();
        }
    }

    async applyVectorToToken(token, vector) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (vector === undefined || typeof vector !== 'object' || vector.x === undefined || vector.y === undefined) return;

        if (Array.isArray(token) && token.length > 0) {
           return await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => {
                return {
                    _id: t.id,
                    x: t.document.x + vector.x,
                    y: t.document.y + vector.y
                };
            }));
        } else if (token instanceof Token) {
            await canvas.scene.updateEmbeddedDocuments("Token", {
                _id: token.id,
                x: token.document.x + vector.x,
                y: token.document.y + vector.y
            });
        }        
    }

    async setTokenScale(token, scale = 1.0) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (scale === undefined || typeof scale !== 'number' || scale > 3 || scale < 0.2) return;

        if (Array.isArray(token) && token.length > 0) {
            return await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => ({ _id: t.id, "texture.scaleX": scale, "texture.scaleY": scale })));
        } else if (token instanceof Token) {
            return await canvas.scene.updateEmbeddedDocuments("Token", [{ _id: token.id, "texture.scaleX": scale, "texture.scaleY": scale }]);
        }
    }

    getAllTokensInScene(scene) {
        if (scene === undefined || (!scene instanceof Scene)) return [];
        return scene.tokens.contents;
    }
}