let initState = {
    recognize: false
};
const recognizeSongStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'RECOGNIZE_SONG_STATUS_OFF':
            return Object.assign({},state,{
                recognize: false,
            });
        case 'RECOGNIZE_SONG_STATUS_ON':
            return Object.assign({},state,{
                recognize: true,
            });
        default:
            return state;
    }
}

export default recognizeSongStatusReducer
