let initState = {
    commentDialog: false,
    info: {
        songId: 0,
        userId: 0,
        commentId: 0,
        commentPid: 0
    }
};
const commentDialogStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'COMMENT_DIALOG_STATUS_ON':
            return Object.assign({},state,{
                commentDialog: true,
                info: action.data
            });
        case 'COMMENT_DIALOG_STATUS_OFF':
            return Object.assign({},state,{
                commentDialog: false,
                info: {
                    songId: 0,
                    userId: 0,
                    commentId: 0,
                    commentPid: 0,
                    topLevelCommentPid: 0
                }
            });
        default:
            return state;
    }
};

export default commentDialogStatusReducer;
