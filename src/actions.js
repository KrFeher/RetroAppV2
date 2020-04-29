const setRetros = (retros) => {
  return {
    type: "SET_RETROS",
    payload: retros,
  };
};

export default {
  setRetros,
};
