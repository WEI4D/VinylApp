let initState = {
    lyric: false,
    // content: ""
};
const lyricStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'LYRIC_STATUS_OFF':
            return Object.assign({},state,{
                lyric: false,
                // content: action.data
            });
        case 'LYRIC_STATUS_ON':
            return Object.assign({},state,{
                lyric: true,
                // content: action.data
            });
        default:
            return state;
    }
}

export default lyricStatusReducer;
