const initialState = {
    users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        // users: state.users.filter(
        //   (user) => user._id !== action.payload
        // ),
      };
    default:
      return state;
  }
};

export default userReducer;