let initState = {
    podcastDetail: {
        trigger: false,
        target: {
            name: "",
            id: ""
        }
    }
};
const podcastDetailStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'PODCAST_DETAIL_STATUS_ON':
            return Object.assign({},state,{
                podcastDetail: {
                    trigger: true,
                    target: action.data
                },
            });
        case 'PODCAST_DETAIL_STATUS_OFF':
            return Object.assign({},state,{
                podcastDetail: {
                    trigger: false,
                    target: {
                        id: "",
                        name: ""
                    }
                }
            });
        default:
            return state;
    }
};

export default podcastDetailStatusReducer;
