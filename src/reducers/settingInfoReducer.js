let initState = {
    data: {
        "left-cover": {
            pic: "",
            type: "",
            name: ""
        },
        "right-first": {
            pic: "",
            type: "",
            name: ""
        },
        "right-second": {
            pic: "",
            type: "",
            name: ""
        },
        "right-third": {
            pic: "",
            type: "",
            name: ""
        },
        "right-four": {
            pic: "",
            type: "",
            name: ""
        },
    }
};
const settingInfoReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'SETTING_INFO_ON':
            return Object.assign({},state,{
                data: action.data
            });
        case 'SETTING_INFO_OFF':
            return Object.assign({},state,{
                data: {
                    "left-cover": {
                        pic: "",
                        type: "",
                        name: ""
                    },
                    "right-first": {
                        pic: "",
                        type: "",
                        name: ""
                    },
                    "right-second": {
                        pic: "",
                        type: "",
                        name: ""
                    },
                    "right-third": {
                        pic: "",
                        type: "",
                        name: ""
                    },
                    "right-four": {
                        pic: "",
                        type: "",
                        name: ""
                    },
                }
            });
        default:
            return state;
    }
};

export default settingInfoReducer;
