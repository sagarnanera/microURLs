import { combineReducers } from 'redux';
import userReducer from './userReducer';
import urlReducer from './ShortenURLreducer';

const rootReducer = combineReducers({
    user: userReducer,
    urls: urlReducer,
});

export default rootReducer;
