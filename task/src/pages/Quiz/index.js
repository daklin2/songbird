import { connect } from 'react-redux';

import Quiz from './Quiz';
import { replaceQuizQuestionIndex, setQuizLevel } from '../../redux/actions/Creators/quiz.creator';
import birdsData from '../../constants/birdsData';

const mapStateToProps = ({ quiz: { level, chosenBirdIndex } }) => ({
  birdsData: birdsData.map((el) => el.data),
  quizLevel: level,
  chosenBirdIndex,
});

const mapToDispatch = (dispatch) => ({
  replaceQuizQuestion: (index) => dispatch(replaceQuizQuestionIndex(index)),
  setQuizLevel: (level) => dispatch(setQuizLevel(level)),
});

export default connect(mapStateToProps, mapToDispatch)(Quiz);
