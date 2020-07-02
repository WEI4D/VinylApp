let initState = {
    local: false,
    downloaded: false,
    downloading: false,
    history: false,
};
const localStatusReducer = (state = initState,action) =>{
    switch (action.type) {
        case "LOCAL_STATUS_ON":
            return Object.assign({},state,{
                local: true,
                downloaded: false,
                downloading: false,
                history: false
            });
        case "LOCAL_STATUS_OFF":
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: false,
                history: false
            });
        case 'DOWNLOADED_STATUS_ON':
            return Object.assign({},state,{
                local: false,
                downloaded: true,
                downloading: false,
                history: false
            });
        case 'DOWNLOADED_STATUS_OFF':
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: false,
                history: false
            });
        case 'DOWNLOADING_STATUS_ON':
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: true,
                history: false
            });
        case 'DOWNLOADING_STATUS_OFF':
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: false,
                history: false
            });
        case 'HISTORY_STATUS_ON':
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: false,
                history: true
            });
        case 'HISTORY_STATUS_OFF':
            return Object.assign({},state,{
                local: false,
                downloaded: false,
                downloading: false,
                history: false
            });
        default:
            return state;
    }
}

export default localStatusReducer;

