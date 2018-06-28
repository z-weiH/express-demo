export default {
  namespaced: true,
  state : {
      city : new Date(),
  },
  mutations : {
      setCity(state, data) {
          state.city = data;
      },
  },
}