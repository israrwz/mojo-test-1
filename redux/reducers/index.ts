import { combineReducers } from 'redux';
import { PollReducer } from './pollReducer';

const rootReducer = combineReducers({
  pollReducer: PollReducer,
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };