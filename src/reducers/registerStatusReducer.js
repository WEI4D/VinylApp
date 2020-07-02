let initState = {
    register: false
};
const registerStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'REGISTER_STATUS_ON_ACTION':
            return Object.assign({},state,{
                register: true,
            });
        case 'REGISTER_STATUS_OFF_ACTION':
            return Object.assign({},state,{
                register: false,
            });
        default:
            return state;
    }
}

export default registerStatusReducer;
