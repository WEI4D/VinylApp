let initState = {
    user: false,
    search: false,
    podcast: false,
    cover: false,
    playlist: false,
    location: {
        trigger: false,
        local: false,
        downloaded: false,
        downloading: false,
        history: false
    },
    userInfo: {
        id: "",
        email: "",
        name: "",
        avatar: "",
        tag: "",
        signature: ""
    },
};
const userStatusReducer = (state = initState,action) =>{
    switch (action.type) {
        case 'USER_STATUS_LOGINED':
            return Object.assign({},state,{
                user: true,
                userInfo: {
                    id: action.data.userId,
                    email: action.data.email,
                    name: action.data.username,
                    avatar: action.data.avatar,
                    tag: action.data.tag,
                    signature: action.data.signature,
                }
            });
        case 'USER_STATUS_UNLOGINED':
            return Object.assign({},state,{
                user: false,
                userInfo: {
                    id: "",
                    email: "",
                    name: "",
                    avatar: "",
                    tag: "",
                    signature: ""
                }
            });
        case 'SEARCH_STATUS_SEARCHING':
            return Object.assign({},state,{
                user: true,
                search: true,
            });
        case 'SEARCH_STATUS_UNSEARCHED':
            return Object.assign({},state,{
                user: true,
                search: false,
            });
        case 'PODCAST_STATUS_ON':
            return Object.assign({},state,{
                podcast: true,
            });
        case 'PODCAST_STATUS_OFF':
            return Object.assign({},state,{
                podcast: false,
            });
        case 'COVER_STATUS_ON':
            return Object.assign({},state,{
                cover: true,
            });
        case 'COVER_STATUS_OFF':
            return Object.assign({},state,{
                cover: false,
            });
        case 'LOCATION_STATUS_ON':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case 'LOCATION_STATUS_OFF':
            return Object.assign({},state,{
                location: {
                    trigger: false,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });



        case "LOCAL_STATUS_ON":
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: true,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case "LOCAL_STATUS_OFF":
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case 'DOWNLOADED_STATUS_ON':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: true,
                    downloading: false,
                    history: false
                }
            });
        case 'DOWNLOADED_STATUS_OFF':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case 'DOWNLOADING_STATUS_ON':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: true,
                    history: false
                }
            });
        case 'DOWNLOADING_STATUS_OFF':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case 'HISTORY_STATUS_ON':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: true
                }
            });
        case 'HISTORY_STATUS_OFF':
            return Object.assign({},state,{
                location: {
                    trigger: true,
                    local: false,
                    downloaded: false,
                    downloading: false,
                    history: false
                }
            });
        case 'PLAYLIST_STATUS_ON':
            return Object.assign({},state,{
                playlist: true,
            });
        case 'PLAYLIST_STATUS_OFF':
            return Object.assign({},state,{
                playlist: false,
            });
        default:
            return state;
    }
}

export default userStatusReducer;
