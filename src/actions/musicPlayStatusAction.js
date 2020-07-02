export const musicPlayStatusOnAction =(data)=> {
    return(
        {
            type: "MUSIC_PLAY_STATUS_ON",
            data
        }
    )
};

export const musicPlayStatusOffAction =(data)=> {
    return(
        {
            type: "MUSIC_PLAY_STATUS_OFF",
            data
        }
    )
};

