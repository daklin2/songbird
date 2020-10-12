import { SET_QUIZ_REPLACE_QUESTION, SET_QUIZ_LEVEL, SET_QUIZ_SCORE } from '../Types/action-types';

export const replaceQuizQuestionIndex = (index) => ({
  type: SET_QUIZ_REPLACE_QUESTION,
  payload: index,
});

export const setQuizLevel = (level) => ({
  type: SET_QUIZ_LEVEL,
  payload: level,
});

export const setQuizScore = (score) => ({
  type: SET_QUIZ_SCORE,
  payload: score,
});
