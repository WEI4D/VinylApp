let initState = {
    userDetail: {
        trigger: false,
        info: {
            username: "",
            password: "",
            tag: "",
            avatar: "",
            signature: "",
        }
    }
};
const userDetailStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'USER_DETAIL_STATUS_ON':
            return Object.assign({},state,{
                userDetail: {
                    trigger: true,
                    info: action.data
                },
            });
        case 'USER_DETAIL_STATUS_OFF':
            return Object.assign({},state,{
                userDetail: {
                    trigger: false,
                    info: {
                        username: "",
                        password: "",
                        tag: "",
                        avatar: "",
                        signature: "",
                    }
                }
            });
        default:
            return state;
    }
};

export default userDetailStatusReducer;
