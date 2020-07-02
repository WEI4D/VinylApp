let initState = {
    camper: false,
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
const camperStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'CAMPER_STATUS_ON_ACTION':
            if( Object.keys(action.data).length <= 0 ){
                action.data = {
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
            }
            return Object.assign({},state,{
                camper: true,
                data: action.data
            });
        case 'CAMPER_STATUS_OFF_ACTION':
            return Object.assign({},state,{
                camper: false,
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

export default camperStatusReducer;
