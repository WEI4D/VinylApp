let initState = {
    share: false,
    data: {
        id: "",
        name: "",
        artist: "",
        artistId: "",
        album: "",
        duration: "",
        playlist: [],
        albumMid: "",
        fileId: "",
        cover: "",
        src: "",
        favorite: false,
    }
};
const shareStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'SHARE_STATUS_ON_ACTION':
            return Object.assign({},state,{
                share: true,
                data: action.data
            });
        case 'SHARE_STATUS_OFF_ACTION':
            return Object.assign({},state,{
                share: false,
                data: {
                    id: "",
                    name: "",
                    artist: "",
                    artistId: "",
                    album: "",
                    duration: "",
                    playlist: [],
                    albumMid: "",
                    fileId: "",
                    cover: "",
                    src: "",
                    favorite: false,
                }
            });
        default:
            return state;
    }
};

export default shareStatusReducer;
