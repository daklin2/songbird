import { connect } from 'react-redux';

import QuizQuestion from './QuizQuestion';
import birdsData from '../../constants/birdsData';
import {
  replaceQuizQuestionIndex,
  setQuizLevel,
  setQuizScore,
} from '../../redux/actions/Creators/quiz.creator';

const mapStateToProps = ({ quiz: { level, score, chosenBirdIndex } }) => ({
  birdsData: birdsData.map((el) => el.data),
  maxQuizLevel: birdsData.length,
  quizLevel: level,
  chosenBirdIndex,
  currentQuizScore: score,
});

const mapToDispatch = (dispatch) => ({
  replaceQuizQuestion: (index) => dispatch(replaceQuizQuestionIndex(index)),
  setQuizLevel: (level) => dispatch(setQuizLevel(level)),
  setQuizScore: (score) => dispatch(setQuizScore(score)),
});

export default connect(mapStateToProps, mapToDispatch)(QuizQuestion);
