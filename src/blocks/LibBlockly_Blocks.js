import * as Actor from "./LibBlockly_Blocks_Foundry_Actor.js";
import * as Chat from "./LibBlockly_Blocks_Foundry_Chat.js";
import * as Combat from "./blocks_foundry_combat.js";
import * as Item from "./blocks_foundry_item.js";
import * as Journal from "./blocks_foundry_journal.js";
import * as Macro from "./LibBlockly_Blocks_Foundry_Macro.js";
import * as Playlist from "./blocks_foundry_playlist.js";
import * as Roll from "./LibBlockly_Blocks_Foundry_Roll.js";
import * as RollTable from "./blocks_foundry_rolltable.js";
import * as Scene from "./blocks_foundry_scene.js";
import * as Token from "./LibBlockly_Blocks_Foundry_Token.js";
import * as User from "./blocks_foundry_user.js";
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
        new Combat.StartCombatCustomBlock(),
        new Combat.ActivateCombatCustomBlock(),
        new Combat.EndCombatCustomBlock(),
        new Combat.ResetCombatCustomBlock(),
        new Combat.NextCombatRoundCustomBlock(),
        new Combat.PreviousCombatRoundCustomBlock(),
        new Combat.NextCombatTurnCustomBlock(),
        new Combat.PreviousCombatTurnCustomBlock(),
        new Combat.IsCombatActiveCustomBlock(),
        new Combat.GetActiveCombatCustomBlock(),
        new Combat.CreateCombatCustomBlock(),

        /* ITEM */
        new Item.GetItemByNameOrIdCustomBlock(),
        new Item.AddItemToTokenOrActorCustomBlock(),
        new Item.GetItemsFromActorOrTokenCustomBlock(),
        new Item.RemoveItemsFromActorOrTokenCustomBlock(),

        /* JOURNAL */
        new Journal.GetJournalByNameOrIdCustomBlock(),
        new Journal.OpenJournalCustomBlock(),
        new Journal.ShowJournalAsCustomBlock(),

        /* MACRO */
        new Macro.MacroGetAllCustomBlock(),
        new Macro.MacroGetByNameOrIdCustomBlock(),
        new Macro.MacroRunCustomBlock(),
        new Macro.MacroCanRunCustomBlock(),

        /* PLAYLIST */
        new Playlist.GetPlaylistByNameOrIdCustomBlock(),
        new Playlist.PlayPlaylistCustomBlock(),
        new Playlist.PlayNextTrackCustomBlock(),
        new Playlist.PlayPreviousTrackCustomBlock(),
        new Playlist.GetAllPlaylistsCustomBlock(),
        new Playlist.GetPlayingPlaylistsCustomBlock(),
        new Playlist.StopPlaylistCustomBlock(),
        new Playlist.CyclePlaylistModeCustomBlock(),

        /* ROLL */
        new Roll.RollCustomBlock(),

        /* ROLLTABLE */
        new RollTable.GetRolltableByNameOrIdCustomBlock(),
        new RollTable.RollTableCustomBlock(),
        new RollTable.GetTableResultDataCustomBlock(),

        /* SCENE */
        new Scene.GetSceneByNameOrIdCustomBlock(),
        new Scene.ViewSceneCustomBlock(),
        new Scene.ActivateSceneCustomBlock(),
        new Scene.GetCurrentSceneCustomBlock(),
        new Scene.GetAllScenesCustomBlock(),

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
        new User.GetAllUsersCustomBlock(),
        new User.GetActorOfUserCustomBlock(),
        new User.GetTokenOfUserInSceneCustomBlock(),
        new User.GetUserNyNameOrIdCustomBlock(),
        new User.PullUsersToSceneCustomBlock(),
        new User.BanUserCustomBlock(),
        new User.UnbanUserCustomBlock(),

        /* UTILS */
        new Utils.WaitCustomBlock(),
        new Utils.ShowNotificationCustomBlock(),

    ]);
})