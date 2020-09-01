import { SET_QUIZ_REPLACE_QUESTION, SET_QUIZ_LEVEL } from '../Types/action-types';

export const replaceQuizQuestionIndex = (index) => ({
  type: SET_QUIZ_REPLACE_QUESTION,
  payload: index,
});

export const setQuizLevel = (level) => ({
  type: SET_QUIZ_LEVEL,
  payload: level,
});
