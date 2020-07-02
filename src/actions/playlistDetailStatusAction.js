export const playlistDetailStatusOnAction =(data)=> {
    return(
        {
            type: "PLAYLIST_DETAIL_STATUS_ON",
            data
        }
    )
};

export const playlistDetailStatusOffAction = {
    type: "PLAYLIST_DETAIL_STATUS_OFF"
};
