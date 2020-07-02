let initState = {
    setting: false,
};
const settingStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'SETTING_STATUS_ON':
            return Object.assign({},state,{
                setting: true,
            });
        case 'SETTING_STATUS_OFF':
            return Object.assign({},state,{
                setting: false,
            });
        default:
            return state;
    }
};

export default settingStatusReducer;
