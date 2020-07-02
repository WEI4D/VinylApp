let initState = {
    favorite: false
};
const favoriteStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'FAVORITE_STATUS_ON':
            return Object.assign({},state,{
                favorite: true,
            });
        case 'FAVORITE_STATUS_OFF':
            return Object.assign({},state,{
                favorite: false,
            });
        default:
            return state;
    }
};

export default favoriteStatusReducer;
