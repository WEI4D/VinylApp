let initState = {
    rating: false,
};
const ratingStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'RATINGS_STATUS_ON':
            return Object.assign({},state,{
                rating: true,
            });
        case 'RATINGS_STATUS_OFF':
            return Object.assign({},state,{
                rating: false,
            });
        default:
            return state;
    }
}

export default ratingStatusReducer;
