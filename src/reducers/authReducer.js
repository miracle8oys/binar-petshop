const initialUser = {
    user: {},
    error: ''
}
export const loginReducer = (state = initialUser, action) => {
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                error: ''
            }
        default: 
            return state
    }
}
