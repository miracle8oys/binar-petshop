import { loginReducer } from "./authReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    loginReducer
});

export default allReducers