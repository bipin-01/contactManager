import {
  CONTACTS_CREATE_FAIL,
  CONTACTS_CREATE_REQUEST,
  CONTACTS_CREATE_SUCCESS,
  CONTACTS_DELETE_FAIL,
  CONTACTS_DELETE_REQUEST,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_LIST_FAIL,
  CONTACTS_LIST_REQUEST,
  CONTACTS_LIST_SUCCESS,
  CONTACTS_UPDATE_FAIL,
  CONTACTS_UPDATE_REQUEST,
  CONTACTS_UPDATE_SUCCESS,
} from "../constants/contactsConstants";
import axios from "axios";

// @desc redux action for listing contacts dispatched to reducer function
export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contacts`, config);

    dispatch({
      type: CONTACTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_LIST_FAIL,
      payload: message,
    });
  }
};

// @desc redux action for listing contacts dispatched to reducer function
// @param [name, number, department, upic]
export const createContactAction = (name, number, department, upic) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CONTACTS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
 

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/contacts/create",
      { name, number, department, upic },
      config
    );

    console.log(data);

    console.log(data);
    dispatch({
      type: CONTACTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_CREATE_FAIL,
      payload: message,
    });
  }
};

// @desc redux action for deleting contacts dispatched to reducer function
// @param{id} unique id generated by mongodb
export const deleteContactAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/contacts/${id}`, config);

    dispatch({
      type: CONTACTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_DELETE_FAIL,
      payload: message,
    });
  }
};

// @desc redux action for deleting contacts dispatched to reducer function
// @param{id} unique id generated by mongodb
// @param[name, number, department, upic] for the contact
export const updateContactAction = (id, name, number, department, upic) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CONTACTS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/contacts/${id}`,
      { name, number, department, upic },
      config
    );

    dispatch({
      type: CONTACTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_UPDATE_FAIL,
      payload: message,
    });
  }
};
