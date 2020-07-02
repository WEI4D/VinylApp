let initState = {
    camp: false
};
const campStatusReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'CAMP_STATUS_ON_ACTION':
            return Object.assign({},state,{
                camp: true
            });
        case 'CAMP_STATUS_OFF_ACTION':
            return Object.assign({},state,{
                camp: false
            });
        default:
            return state;
    }
};

export default campStatusReducer;
