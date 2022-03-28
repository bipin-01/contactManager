import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  contactCreateReducer,
  contactDeleteReducer,
  contactListReducer,
  contactUpdateReducer,
} from "./reducers/contactsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducers = combineReducers({
  contactList: contactListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  contactCreate: contactCreateReducer,
  contactDelete: contactDeleteReducer,
  contactUpdate: contactUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
