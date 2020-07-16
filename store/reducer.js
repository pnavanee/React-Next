import {createWrapper, HYDRATE} from 'next-redux-wrapper';
  
 const initialState = {
    products: []
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case HYDRATE:
          return {...state, ...action.payload};
      case "PRODUCTS":
           return {...state, products : action.payload}
      default:
          return state;
      }
  };
  
  export {rootReducer, initialState};