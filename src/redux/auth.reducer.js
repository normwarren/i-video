import axios from "axios";

const initialState = {
  user_id: null,
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  authenticated: false,
  videos: [],
  cart: [],
  total: 0
};

//AUTH
const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const GET_USER = "GET_USER_DETAILS";

//SHOP
const GET_VIDEO = "GET_VIDEO";
// const SEARCH_SWAG = "SEARCH_SWAG";

//CART
const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// const CHECKOUT = "CHECKOUT";
// const SIGN_OUT = "SIGN_OUT";

export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  };
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    payload: username
  };
}
export function updateUserDetails(obj) {
  return {
    type: UPDATE_USER_DETAILS,
    payload: obj
  };
}
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.getUser(URL.id).then(response => response.data)
  };
}

export function getVideo() {
  return {
    type: GET_VIDEO,
    payload: axios.getVideo(URL.video).then(response => response.data)
  };
}
export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: axios.post(`${URL.cart}/${id}`).then(response => response.data)
  };
}
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload, type);
  switch (type) {
    case UPDATE_USER_ID:
      return { ...state, user_id: payload };
    case UPDATE_USERNAME:
      return { ...state, username: payload };
    case UPDATE_USER_DETAILS:
      const { firstname, lastname, email } = payload;
      return { ...state, firstname, lastname, email };
    case GET_USER + "_FULFILLED":
      const { user_id } = payload;
      return { ...state, user_id };
    //VIDEOS
    case GET_VIDEO + "_FULFILLED":
      return Object.assign({}, state, { videos: payload });
    case GET_VIDEO + "_REJECTED":
      return Object.assign({}, state, { videos: [] });
    case ADD_TO_CART + "_FULFILLED":
      return Object.assign({}, state, {
        cart: payload.cart,
        total: payload.total
      });
    default:
      return state;
  }
}
