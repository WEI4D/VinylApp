let initState = {
    commentDetail: false,
    comment: {
        comment: "",
        commentId: 0,
        songId: 0,
        commentPid: 0,
        likeCount: 0,
        publishTime: "",
        avatar: "",
        name: ""
    }
};
const commentDetailStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'COMMENT_DETAIL_STATUS_ON':
            return Object.assign({},state,{
                commentDetail: true,
                comment: action.data
            });
        case 'COMMENT_DETAIL_STATUS_OFF':
            return Object.assign({},state,{
                commentDetail: false,
                comment: {
                    comment: "",
                    commentId: 0,
                    songId: 0,
                    commentPid: 0,
                    likeCount: 0,
                    publishTime: "",
                    avatar: "",
                    name: ""
                }
            });
        default:
            return state;
    }
};

export default commentDetailStatusReducer;
