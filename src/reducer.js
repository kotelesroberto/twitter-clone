export const initialState = {
  user: null,
};

// Reducer is always jsut listening to dispatch
// state: state of the application
// action: what to do? Add to basket, remmove from basket, etc?
const reducer = (state, action) => {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
