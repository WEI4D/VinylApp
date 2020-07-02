export const podcastDetailStatusOnAction =(data)=> {
    return(
        {
            type: "PODCAST_DETAIL_STATUS_ON",
            data
        }
    )
};

export const podcastDetailStatusOffAction = {
    type: "PODCAST_DETAIL_STATUS_OFF"
};
