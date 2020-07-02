export const listenedInfoOnAction =(data)=> {
    return(
        {
            type: "LISTENED_INFO_ADD",
            data
        }
    );
};

export const listenedInfoOffAction =(data)=> {
    return(
        {
            type: "LISTENED_INFO_DEL",
            data
        }
    );
};

