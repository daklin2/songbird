import { combineReducers } from 'redux';

import quizReducer from './quiz.reducer';

const reducers = combineReducers({
  quiz: quizReducer,
});

export default reducers;
