let initState = {
    message: {
        trigger: false,
        info: {
            id: "",
            name: "",
            artistId: "",
            artist: "",
            albumName: "",
            artistMid: "",
            lyric: ""
        }
    }
};
const messageStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'MESSAGE_STATUS_ON':
            return Object.assign({},state,{
                message: {
                    trigger: true,
                    info: action.data
                },
            });
        case 'MESSAGE_STATUS_OFF':
            return Object.assign({},state,{
                message: {
                    trigger: false,
                    info: {
                        id: "",
                        name: "",
                        artist: "",
                        album: ""
                    }
                }
            });
        default:
            return state;
    }
};

export default messageStatusReducer;
