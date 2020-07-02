let initState = {
    music: {
        trigger: false,
        info: {
            id: 47,
            name: "Please Choose Your Favorite",
            artist: "WE!D",
            artistId: 0,
            album: "AMAZING",
            duration: "AMAZING",
            playlist: [],
            cover: "",
            src: "",
            favorite: false,
            albumMid: "",
            fileId: "",
            type: "BASE"
        }
    }
};
const musicPlayStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'MUSIC_PLAY_STATUS_ON':
            return Object.assign({},state,{
                music: {
                    trigger: true,
                    info: action.data,
                },
            });
        case 'MUSIC_PLAY_STATUS_OFF':
            return Object.assign({},state,{
                music: {
                    trigger: false,
                    info: action.data
                }
            });
        default:
            return state;
    }
};

export default musicPlayStatusReducer;
