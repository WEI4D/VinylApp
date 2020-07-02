let initState = {
    singer: false,
    artistId: -1
};
const singerStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'SINGER_STATUS_ON':
            return Object.assign({},state,{
                singer: true,
                artistId: action.data
            });
        case 'SINGER_STATUS_OFF':
            return Object.assign({},state,{
                singer: false,
                artistId: -1
            });
        default:
            return state;
    }
};

export default singerStatusReducer;
