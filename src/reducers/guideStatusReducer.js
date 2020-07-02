let initState = {
    guide: false
};
const guideStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'GUIDE_STATUS_ON_ACTION':
            return Object.assign({},state,{
                guide: true
            });
        case 'GUIDE_STATUS_OFF_ACTION':
            return Object.assign({},state,{
                guide: false
            });
        default:
            return state;
    }
};

export default guideStatusReducer;
