import {
  SET_QUIZ_LEVEL,
  SET_QUIZ_REPLACE_QUESTION,
  SET_QUIZ_SCORE,
} from '../actions/Types/action-types';

const initialState = {
  level: 0,
  score: 0,
  chosenBirdIndex: null,
};

const quizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_QUIZ_REPLACE_QUESTION:
      return {
        ...state,
        chosenBirdIndex: payload,
      };
    case SET_QUIZ_LEVEL:
      return {
        ...state,
        level: payload,
      };
    case SET_QUIZ_SCORE:
      return {
        ...state,
        score: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default quizReducer;
