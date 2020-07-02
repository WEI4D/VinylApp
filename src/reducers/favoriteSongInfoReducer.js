let initState = {
    favoriteSongList: []
};
const favoriteSongInfoReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'FAVORITE_SONG_INFO_ADD':
            return Object.assign({},state,{
                favoriteSongList: action.data
            });
        case 'FAVORITE_SONG_INFO_DEL':
            return Object.assign({},state,{
                favoriteSongList: action.data
            });
        default:
            return state;
    }
};

export default favoriteSongInfoReducer;
