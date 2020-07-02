export const userDetailStatusOnAction =(data)=> {
    return(
        {
            type: "USER_DETAIL_STATUS_ON",
            data
        }
    );
};

export const userDetailStatusOffAction = {
        type: "USER_DETAIL_STATUS_OFF",
};

