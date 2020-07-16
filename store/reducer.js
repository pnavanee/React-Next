
 const initialState = {
    products: []
  };

  const rootReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case "PRODUCTS":
           return {...state, products : action.payload}
      default:
          return state;
      }
  };
  
  export {rootReducer, initialState};