import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import _ from 'lodash';
  
 const initialState = {
    products: [],
    alertMessage : "",
    product : {}
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case HYDRATE:
          return {...state, ...action.payload};
      case "PRODUCTS":
           return {...state,  ...action.payload}
      case "PRODUCT" : 
           return {...state, ...action.payload}
      case "DELETE_PRODUCT" : 
           const updatedPoducts =  _.filter(state.products, (obj)=> obj.id !== action.payload.productId)
           return {...state, products : updatedPoducts}
      case "ALERT" : 
            return {...state, ...action.payload}
      case "CLEAR_ALERT":
            return {...state, alertMessage : ""}
      default:
          return state;
      }
  };
  
  export {rootReducer, initialState};