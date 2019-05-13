const initialState = {
  user_id: null,
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  authenticated: false
};

const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";

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
    default:
      return state;
  }
}
