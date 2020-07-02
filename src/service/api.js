import server from "./server";
import { URL_CONFIG } from "./serverAPI.config";

export function verifyUser(data) {
    return server({
        url: URL_CONFIG.verifyUser,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data
    })
}

export function getUserAvatar(params) {
    return server({
        url: URL_CONFIG.getUserAvatar,
        method: "get",
        params
    })
}

export function getHostSong(params) {
    return server({
        url: URL_CONFIG.getHotSong,
        method: "get",
        params
    })
}

export function searchMusicByKeyword(params) {
    return server({
        url: URL_CONFIG.searchMusicByKeyword,
        method: "get",
        params
    })
}

export function getPodcast(params) {
    return server({
        url: URL_CONFIG.getPodcast,
        method: "get",
        params
    })
}

export function getPodcastInfo(params) {
    return server({
        url: URL_CONFIG.getPodcastInfo,
        method: "get",
        params,
        header: {
            "Cache-Control": "no-store"
        }
    })
}

export function getUserFavoriteSongList(params) {
    return server({
        url: URL_CONFIG.getUserFavoriteSongList,
        method: "get",
        params
    })
}

// export function getRecognizeSongResult(params) {
//     return server({
//         url: URL_CONFIG.getRecognizeSongResult,
//         method: "get",
//         params
//     })
// }

export function getEMailVerifyCode(params) {
    return server({
        url: URL_CONFIG.getEMailVerifyCode,
        method: "get",
        params
    })
}

export function postRegisterForm(data) {
    return server({
        url: URL_CONFIG.postRegisterForm,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data
    })
}

export function verifyUsernameIsExist(params) {
    return server({
        url: URL_CONFIG.verifyUsernameIsExist,
        method: "get",
        params
    })
}

export function uploadUserAvatar(data) {
    return server({
        url: URL_CONFIG.uploadUserAvatar,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data
    })
}

export function uploadUserTag(data) {
    return server({
        url: URL_CONFIG.uploadUserTag,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data
    })
}

export function getRecognizeSongResult(data) {
    return server({
        url: URL_CONFIG.getRecognizeSongResult,
        method: "post",
        dataType: "json",
        contentType: "multipart/form-data",
        data
    })
}

export function getRecommendSongList(params) {
    return server({
        url: URL_CONFIG.getRecommendSongList,
        method: "get",
        params
    })
}

export function getSongRatings(params) {
    return server({
        url: URL_CONFIG.getSongRatings,
        method: "get",
        params
    })
}

export function postUserRating(data) {
    return server({
        url: URL_CONFIG.postUserRating,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf8mb4",
        data
    })
}

export function getUserRatingsDetail(params) {
    return server({
        url: URL_CONFIG.getUserRatingDetail,
        method: "get",
        params
    })
}

export function getArtistInfo(params) {
    return server({
        url: URL_CONFIG.getArtistInfo,
        method: "get",
        params
    })
}

export function getArtistChoiceSong(params) {
    return server({
        url: URL_CONFIG.getArtistChoiceSong,
        method: "get",
        params
    })
}

export function getArtistSong(params) {
    return server({
        url: URL_CONFIG.getArtistSong,
        method: "get",
        params
    })
}

export function getPlaylist(params) {
    return server({
        url: URL_CONFIG.getPlaylist,
        method: "get",
        params
    })
}

export function getPlaylistDetail(params) {
    return server({
        url: URL_CONFIG.getPlaylistDetail,
        method: "get",
        params
    })
}

export function download(params) {
    return server({
        url: URL_CONFIG.download,
        method: "get",
        params,
        headers: {
            responseType: "blob"
        }
    })
}

export function getCamperSongList(params) {
    return server({
        url: URL_CONFIG.getCamperSongList,
        method: "get",
        params
    })
}

export function postNews(data) {
    return server({
        url: URL_CONFIG.postNews,
        method: "post",
        data
    })
}

export function uploadImage(data) {
    return server({
        url: URL_CONFIG.uploadImage,
        method: "post",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data
    })
}

export function getCampNewsList(params) {
    return server({
        url: URL_CONFIG.getCampNewsList,
        method: "get",
        params
    })
}

export function postPlaylistInfo(data) {
    return server({
        url: URL_CONFIG.postPlaylistInfo,
        method: "post",
        data
    })
}

export function saveUserSetting(data) {
    return server({
        url: URL_CONFIG.saveUserSetting,
        method: "post",
        data
    })
}

export function getUserSetting(params) {
    return server({
        url: URL_CONFIG.getUserSetting,
        method: "get",
        params
    })
}
// export function getAudioFile() {
//     return server({
//         url:
//     })
// }
