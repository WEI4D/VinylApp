let initState = {
    moreFavoriteContent: true
};
const moreFavoriteContentStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'MORE_FAVORITE_CONTENT_STATUS_ON':
            return Object.assign({},state,{
                moreFavoriteContent: true,
            });
        case 'MORE_FAVORITE_CONTENT_STATUS_OFF':
            return Object.assign({},state,{
                moreFavoriteContent: false,
            });
        default:
            return state;
    }
}

export default moreFavoriteContentStatusReducer;
