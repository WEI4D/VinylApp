export const favoriteSongInfoAddAction =(data)=> {
    return({
        type: "FAVORITE_SONG_INFO_ADD",
        data
    })
};

export const favoriteSongInfoDelAction =(data)=> {
    return({
        type: "FAVORITE_SONG_INFO_DEL",
        data
    })
};
