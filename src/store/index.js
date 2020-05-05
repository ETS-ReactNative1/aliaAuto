import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducers from './reducers';

const store = createStore(RootReducers, applyMiddleware(ReduxThunk));

export default store;
