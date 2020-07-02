export const messageStatusOnAction =(data)=> {
    return(
        {
            type: "MESSAGE_STATUS_ON",
            data
        }
    )
};

export const messageStatusOffAction = {
    type: "MESSAGE_STATUS_OFF"
};

