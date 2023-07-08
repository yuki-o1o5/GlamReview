export const userInitialState = {
  user: null,
  useId: "",
};

export function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        userId: action.payload.useId,
      };

    case "LOGOUT":
      return { ...state, user: null, userId: null };
    default:
      return state;
  }
}
