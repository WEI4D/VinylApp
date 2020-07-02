let initState = {
    playlistDetail: {
        trigger: false,
        playlistId: -1
    }
};
const playlistDetailStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'PLAYLIST_DETAIL_STATUS_ON':
            return Object.assign({},state,{
                playlistDetail: {
                    trigger: true,
                    playlistId: action.data
                },
            });
        case 'PLAYLIST_DETAIL_STATUS_OFF':
            return Object.assign({},state,{
                playlistDetail: {
                    trigger: false,
                    playlistId: -1
                }
            });
        default:
            return state;
    }
};

export default playlistDetailStatusReducer;
