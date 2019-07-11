const initialState = {
    pins: []
  };
  const rootReducer = (state = initialState, action) => {
    if (action.type === 'Code Snippet') {
      return Object.assign({}, state, {
        pins: state.pins.concat(action.payload)
      });
    }
    return state;
  }
  
  export default rootReducer;