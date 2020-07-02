let initState = {
    hotSong: false
};
const hotSongStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'HOT_SONG_STATUS_ON':
            return Object.assign({},state,{
                hotSong: true,
            });
        case 'HOT_SONG_STATUS_OFF':
            return Object.assign({},state,{
                hotSong: false,
            });
        default:
            return state;
    }
};

export default hotSongStatusReducer;
