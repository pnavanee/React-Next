import {createStore, applyMiddleware} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {rootReducer, initialState} from './reducer';
import thunkMiddleware  from 'redux-thunk';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }

// create a makeStore function
export const initStore = () => createStore(rootReducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper(initStore);

