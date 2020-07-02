let initState = {
    commentDetailInfo: []
};
const commentDetailInfoReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'COMMENT_DETAIL_INFO_ADD':
            return Object.assign({},state,{
                commentDetailInfo: action.data
            });
        case 'COMMENT_DETAIL_INFO_DEL':
            return Object.assign({},state,{
                commentDetailInfo: []
            });
        default:
            return state;
    }
};

export default commentDetailInfoReducer;
