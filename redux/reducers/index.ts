import { combineReducers } from 'redux';
import { PollReducer } from './pollReducer';
import { AnswersReducer } from './answersReducer';

const rootReducer = combineReducers({
  pollReducer: PollReducer,
  answersReducer:AnswersReducer,
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };