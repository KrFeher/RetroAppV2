const retroReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RETROS":
      return action.payload;
    default:
      return state;
  }
};

export default retroReducer;
