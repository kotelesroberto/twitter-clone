export const initialState = {
  loginScreenType: "landing", // landing | panel
  // user: {
  //   id: "44567889898",
  //   displayName: "Jimi Hendrix",
  //   occupation: "Musician",
  //   username: "JimiHendrix",
  //   verified: true,
  //   avatar: "https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg",
  // },
  user: null,
};

// Reducer is always jsut listening to dispatch
// state: state of the application
// action: what to do? Add to basket, remmove from basket, etc?
const reducer = (state, action) => {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case "SET_LOGINSCREEN":
      return {
        ...state,
        loginScreenType: action.loginScreenType,
      };

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
