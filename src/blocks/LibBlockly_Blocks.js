import * as Actor from "./LibBlockly_Blocks_Foundry_Actor.js";
import * as Chat from "./LibBlockly_Blocks_Foundry_Chat.js";
import * as Combat from "./LibBlockly_Blocks_Foundry_Combat.js";
import * as Item from "./LibBlockly_Blocks_Foundry_Item.js";
import * as Journal from "./LibBlockly_Blocks_Foundry_Journal.js";
import * as Macro from "./LibBlockly_Blocks_Foundry_Macro.js";
import * as Playlist from "./LibBlockly_Blocks_Foundry_Playlist.js";
import * as Roll from "./LibBlockly_Blocks_Foundry_Roll.js";
import * as RollTable from "./LibBlockly_Blocks_Foundry_RollTable.js";
import * as Scene from "./LibBlockly_Blocks_Foundry_Scene.js";
import * as Token from "./LibBlockly_Blocks_Foundry_Token.js";
import * as User from "./LibBlockly_Blocks_Foundry_User.js";
import * as Utils from "./LibBlockly_Blocks_Foundry_Utils.js";

import BlockDefnitions from "./block_definitions.js";

Hooks.once("ready", () => {
    libBlockly.registerDefinitions(BlockDefnitions());

    libBlockly.registerBlocks([
        /* ACTOR */
        new Actor.ActorGetByNameOrIdCustomBlock(),
        new Actor.ActorGetTokenCustomBlock(),
        new Actor.ActorGetAllCustomBlock(),
        new Actor.ActorGetTokensInCurrentSceneCustomBlock(),

        /* CHAT */
        new Chat.SendMessageCustomBlock(),

        /* COMBAT */
        new Combat.CombatStartCustomBlock(),
        new Combat.CombatActivateCustomBlock(),
        new Combat.CombatEndCustomBlock(),
        new Combat.CombatResetCustomBlock(),
        new Combat.CombatNextRoundCustomBlock(),
        new Combat.CombatPreviousRoundCustomBlock(),
        new Combat.CombatNextTurnCustomBlock(),
        new Combat.CombatPreviousTurnCustomBlock(),
        new Combat.CombatIsActiveCustomBlock(),
        new Combat.CombatGetActiveCustomBlock(),
        new Combat.CombatCreateCustomBlock(),

        /* ITEM */
        new Item.ItemGetByNameOrIdCustomBlock(),
        new Item.ItemAddToTokenOrActorCustomBlock(),
        new Item.ItemGetFromActorOrTokenCustomBlock(),
        new Item.ItemRemoveFromActorOrTokenCustomBlock(),

        /* JOURNAL */
        new Journal.JournalGetByNameOrIdCustomBlock(),
        new Journal.JournalOpenCustomBlock(),
        new Journal.JournalShowAsCustomBlock(),

        /* MACRO */
        new Macro.MacroGetAllCustomBlock(),
        new Macro.MacroGetByNameOrIdCustomBlock(),
        new Macro.MacroRunCustomBlock(),
        new Macro.MacroCanRunCustomBlock(),

        /* PLAYLIST */
        new Playlist.PlaylistGetByNameOrIdCustomBlock(),
        new Playlist.PlaylistPlayCustomBlock(),
        new Playlist.PlaylistPlayNextTrackCustomBlock(),
        new Playlist.PlaylistPlayPreviousTrackCustomBlock(),
        new Playlist.PlaylistGetAllCustomBlock(),
        new Playlist.PlaylistGetPlayingCustomBlock(),
        new Playlist.PlaylistStopCustomBlock(),
        new Playlist.PlaylistCycleModeCustomBlock(),

        /* ROLL */
        new Roll.RollCustomBlock(),

        /* ROLLTABLE */
        new RollTable.RollTableGetTableResultDataCustomBlock(),
        new RollTable.RollTableRollCustomBlock(),
        new RollTable.RollTableGetTableResultDataCustomBlock(),

        /* SCENE */
        new Scene.SceneGetByNameOrIdCustomBlock(),
        new Scene.SceneViewCustomBlock(),
        new Scene.SceneActivateCustomBlock(),
        new Scene.SceneGetCurrentCustomBlock(),
        new Scene.SceneGetAllCustomBlock(),

        /* TOKEN */
        new Token.TokenShowCustomBlock(),
        new Token.TokenHideCustomBlock(),
        new Token.TokenToggleVisibilityCustomBlock(),
        new Token.TokenGetSelectionCustomBlock(),
        new Token.TokenGetAllInCurrentSceneCustomBlock(),
        new Token.TokenToggleCombatStateCustomBlock(),
        new Token.TokenGetAllInSceneCustomBlock(),
        new Token.TokenRotateCustomBlock(),
        new Token.TokenSetScaleCustomBlock(),
        new Token.TokenResetScaleCustomBlock(),
        new Token.TokenMoveCustomBlock(),
        new Token.TokenChangeElevationCustomBlock(),

        /* USER */
        new User.UserGetAllCustomBlock(),
        new User.UserGetActorCustomBlock(),
        new User.UserGetTokenInSceneCustomBlock(),
        new User.UserGetNyNameOrIdCustomBlock(),
        new User.UserPullToSceneCustomBlock(),
        new User.UserBanCustomBlock(),
        new User.UserUnbanCustomBlock(),

        /* UTILS */
        new Utils.WaitCustomBlock(),
        new Utils.ShowNotificationCustomBlock(),

    ]);
})