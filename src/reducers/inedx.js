import { combineReducers } from "redux";
import userStatusReducer from './userStatusReducer';
import musicStatusReducer from './musicStatusReducer';
import localStatusReducer from "./localStatusReducer";
import podcastDetailStatusReducer from "./podcastDetailStatusReducer";
import favoriteStatusReducer from "./favoriteStatusReducer";
import moreFavoriteContentStatusReducer from "./moreFavoriteStatusReducer";
import recommendStatusReducer from "./recommendStatusReducer";
import settingStatusReducer from "./settingStatusReducer";
import recognizeSongStatusReducer from "./recognizeSongStatusReducer";
import messageStatusReducer from "./messageStatusReducer";
import musicPlayStatusReducer from "./musicPlayStatusReducer";
import listenedInfoReducer from "./listenedInfoReducer";
import registerStatusReducer from "./registerStatusReducer";
import userDetailStatusReducer from "./userDetailStatusReducer";
import favoriteSongInfoReducer from "./favoriteSongInfoReducer";
import ratingStatusReducer from "./ratingStatusReducer";
import commentDialogStatusReducer from "./commentDialogStatusReducer";
import commentInfoReducer from "./commentInfoReducer";
import commentDetailInfoReducer from "./commentDetailInfoReducer";
import commentDetailStatusReducer from "./commentDetailStatusReducer";
import singerStatusReducer from "./singerStatusReducer";
import createPlaylistStatusReducer from "./createPlaylistStatusReducer";
import playlistDetailStatusReducer from "./playlistDetailStatusReducer";
import hotSongStatusReducer from "./hotSongStatusReducer";
import hotCommentStatusReducer from "./hotCommentStatusReducer";
import campStatusReducer from "./campStatusReducer";
import guideStatusReducer from "./guideStatusReducer";
import camperStatusReducer from "./camperStatusReducer";
import shareStatusReducer from "./shareStatusReducer";
import settingInfoReducer from "./settingInfoReducer";

const rootReducer = combineReducers({
    userStatus: userStatusReducer,
    musicStatus: musicStatusReducer,
    localStatus: localStatusReducer,
    podcastDetailStatus: podcastDetailStatusReducer,
    favoriteStatus: favoriteStatusReducer,
    moreFavoriteContentStatus: moreFavoriteContentStatusReducer,
    recommendStatus: recommendStatusReducer,
    settingStatus: settingStatusReducer,
    recognizeSongStatus: recognizeSongStatusReducer,
    messageStatus: messageStatusReducer,
    musicPlayStatus: musicPlayStatusReducer,
    listenedInfo: listenedInfoReducer,
    registerStatus: registerStatusReducer,
    userDetailStatus: userDetailStatusReducer,
    favoriteSongInfo: favoriteSongInfoReducer,
    ratingStatus: ratingStatusReducer,
    commentDialogStatus: commentDialogStatusReducer,
    commentInfo: commentInfoReducer,
    commentDetailInfo: commentDetailInfoReducer,
    commentDetailStatus: commentDetailStatusReducer,
    singerStatus: singerStatusReducer,
    createPlaylistStatus: createPlaylistStatusReducer,
    playlistDetailStatus: playlistDetailStatusReducer,
    hotSongStatus: hotSongStatusReducer,
    hotCommentStatus: hotCommentStatusReducer,
    campStatus: campStatusReducer,
    guideStatus:guideStatusReducer,
    camperStatus: camperStatusReducer,
    shareStatus: shareStatusReducer,
    settingInfo: settingInfoReducer
});

export default rootReducer;
