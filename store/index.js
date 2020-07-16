import {createStore, applyMiddleware} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {rootReducer, initialState} from './reducer';
import thunk from 'redux-thunk';

// create a makeStore function
export const makeStore = () => createStore(rootReducer,applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});

