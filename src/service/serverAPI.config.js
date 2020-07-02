const BASE_URL = "http://localhost:3000";
const TEST_URL = "http://localhost:8080";
const RECOGNIZE_URL = "http://localhost:5000";
const URL_CONFIG = {
    verifyUser: `${ BASE_URL }/user/verifyUser`,
    getUserAvatar: `${ BASE_URL }/api/getUserAvatar`,
    getHotSong: `${ BASE_URL }/api/getHotSong`,
    searchMusicByKeyword: `${BASE_URL}/api/searchMusicByKeyword`,
    getPodcast: `${ BASE_URL }/api/getPodcast`,
    getPodcastInfo: `${ BASE_URL }/api/getPodcastInfo`,
    addOrDelToUserFavoriteList: `${ BASE_URL }/user/addOrDelToUserFavoriteList`,
    getUserFavoriteSongList: `${ BASE_URL }/api/getUserFavoriteSongList`,
    getRecognizeSongResult: `${ RECOGNIZE_URL }/api/getRecognizeSongResult`,
    getSongLrcFile: `${ BASE_URL }/api/getSongLrcFile`,
    getAudioFile: `${ BASE_URL }/api/getAudioFile`,
    getEMailVerifyCode: `${ BASE_URL }/api/getEMailVerifyCode`,
    postRegisterForm: `${ BASE_URL }/user/postRegisterForm`,
    verifyUsernameIsExist: `${ BASE_URL }/user/verifyUsernameIsExist`,
    uploadUserAvatar: `${ BASE_URL }/user/uploadUserAvatar`,
    uploadUserTag: `${ BASE_URL }/user/uploadUserTag`,
    getRecommendSongList: `${ BASE_URL }/api/getRecommendSongList`,
    getSongRatings: `${ BASE_URL }/api/getSongRatings`,
    postUserRating: `${ BASE_URL }/user/postUserRating`,
    getUserRatingDetail: `${ BASE_URL }/api/getUserRatingDetail`,
    getArtistInfo: `${ BASE_URL }/api/getArtistInfo`,
    getImage: `${ BASE_URL }/api/images?`,
    getArtistChoiceSong: `${ BASE_URL }/api/getArtistChoiceSong`,
    getArtistSong: `${ BASE_URL }/api/getArtistSong`,
    getPlaylist: `${ BASE_URL }/api/getPlaylist`,
    getPlaylistDetail: `${ BASE_URL }/api/getPlaylistDetail`,
    download: `${ BASE_URL }/api/download`,
    getCamperSongList: `${ BASE_URL }/api/getCamperSongList`,
    postNews: `${ BASE_URL }/api/postNews`,
    uploadImage: `${ BASE_URL }/api/uploadImage`,
    getCampNewsList: `${ BASE_URL }/api/getCampNewsList`,
    postPlaylistInfo: `${ BASE_URL }/api/postPlaylistInfo`,
    saveUserSetting: `${ BASE_URL }/api/saveUserSetting`,
    getUserSetting: `${ BASE_URL }/api/getUserSetting`,
};
export { URL_CONFIG,TEST_URL,BASE_URL };
