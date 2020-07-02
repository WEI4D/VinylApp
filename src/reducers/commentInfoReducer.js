let initState = {
    commentInfo: []
};
const commentInfoReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'COMMENT_INFO_ADD':
            return Object.assign({},state,{
                commentInfo: action.data
            });
        case 'COMMENT_INFO_DEL':
            return Object.assign({},state,{
                commentInfo: []
            });
        default:
            return state;
    }
};

export default commentInfoReducer;
