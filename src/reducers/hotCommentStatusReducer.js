let initState = {
    hotComment: false
};
const hotCommentStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'HOT_COMMENT_STATUS_ON':
            return Object.assign({},state,{
                hotComment: true,
            });
        case 'HOT_COMMENT_STATUS_OFF':
            return Object.assign({},state,{
                hotComment: false,
            });
        default:
            return state;
    }
};

export default hotCommentStatusReducer;
