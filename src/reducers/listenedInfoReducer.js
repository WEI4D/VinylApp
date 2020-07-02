let listened = JSON.parse(localStorage.getItem("listened"));
let initState = {
    listened: []
};
if( listened instanceof Array ) {
    initState = {
        listened
    };
}

const listenedInfoReducer = (state=initState,action) =>{
    switch (action.type) {
        case 'LISTENED_INFO_ADD':
            return Object.assign({},state,{
                listened: action.data,
            });
        case 'LISTENED_INFO_DEL':
            return Object.assign({},state,{
                listened: action.data,
            });
        default:
            return state;
    }
};

export default listenedInfoReducer;
