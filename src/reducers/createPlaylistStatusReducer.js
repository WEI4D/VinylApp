let initState = {
    create: false,
};
const createPlaylistStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'CREATE_PLAYLIST_STATUS_ON':
            return Object.assign({},state,{
                create: true
            });
        case 'CREATE_PLAYLIST_STATUS_OFF':
            return Object.assign({},state,{
                create: false
            });
        default:
            return state;
    }
};

export default createPlaylistStatusReducer;
