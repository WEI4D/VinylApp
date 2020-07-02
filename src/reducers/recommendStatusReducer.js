let initState = {
    recommend: false
};
const recommendStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'RECOMMEND_STATUS_ON':
            return Object.assign({},state,{
                recommend: true,
            });
        case 'RECOMMEND_STATUS_OFF':
            return Object.assign({},state,{
                recommend: false,
            });
        default:
            return state;
    }
}

export default recommendStatusReducer;
