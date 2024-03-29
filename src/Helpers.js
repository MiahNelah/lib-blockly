export class Helpers {

    async wait(delay) {
        return new Promise(resolve => {
            setTimeout(() => resolve(2), delay);
        });
    }

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

    async tokenElevation(token, value, mode = "by") {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (!["by", "to"].includes(mode.toLowerCase())) return;

        if (Array.isArray(token) && token.length > 0) {
            return canvas.scene.updateEmbeddedDocuments("Token", token.map(t => {
                const originalElevation = mode === "by" ? t.document.elevation : 0;
                return { _id: t.id, "document.elevation": originalElevation + value };
            }));
        } else if (token instanceof Token) {
            return this.tokenElevation([token], value, mode);
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

    async applyVectorToToken(token, vector, { duration = 500 } = {}) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (vector === undefined || typeof vector !== 'object' || vector.x === undefined || vector.y === undefined) return;

        if (Array.isArray(token) && token.length > 0) {
            return Promise.all(token.map(t => {
                t.document.x += vector.x;
                t.document.y += vector.y;
                return t.animate({
                    "x": t.document.x,
                    "y": t.document.y
                }, { duration: duration })
            })).then(() => {
                return canvas.scene.updateEmbeddedDocuments("Token", token.map(t => {
                    return {
                        _id: t.id,
                        x: t.document.x,
                        y: t.document.y
                    }
                }))
            })
        } else if (token instanceof Token) {
            return this.applyVectorToToken([token]);
        }
    }

    async setTokenScale(token, scale = 1.0) {
        if (canvas === undefined || canvas.scene === undefined) return;
        if (token === undefined) return;
        if (scale === undefined || typeof scale !== 'number' || scale > 3 || scale < 0.2) return;

        if (Array.isArray(token) && token.length > 0) {
            return await canvas.scene.updateEmbeddedDocuments("Token", token.map(t => ({ _id: t.id, "texture.scaleX": scale, "texture.scaleY": scale })));
        } else if (token instanceof Token) {
            return this.setTokenScale([token], scale);
        }
    }

    getAllTokensInScene(scene) {
        if (scene === undefined || (!scene instanceof Scene)) return [];
        return scene.getEmbeddedCollection("Token").contents
    }

    resolveMacro(mode, value) {
        if (mode === undefined || value === undefined) return undefined;
        switch (mode) {
            default:
            case "id":
                return game.macros.get(value);
            case "name":
                return game.macros.getName(value);
        }
    }

    executeMacro(caller, macro) {
        if (macro === undefined) return;
        if (typeof macro === "string") macro = this.resolveMacro("id", macro);
        if (!(macro instanceof Macro)) return;
        if (macro === caller) return;

        if (Array.isArray(macro)) {
            macro.forEach(m => this.executeMacro(caller, m))
        }
        else {
            macro.execute();
        }
    }

    canExecuteMacro(macro) {
        if (macro === undefined) return;
        if (typeof macro === "string") macro = this.resolveMacro("id", macro);
        if (!(macro instanceof Macro)) return;

        return macro.canExecute();
    }

    async roll(rollExpression) {
        if (rollExpression === undefined) return 0;
        const roll_object = new Roll(rollExpression);
        const roll = await roll_object.roll({ async: true });
        return roll.total;
    }
}