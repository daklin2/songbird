import { connect } from 'react-redux';

import Header from './Header';
import birdsData from '../../constants/birdsData';

const mapStateToProps = ({ quiz: { level, score } }) => ({
  birdsSubTitles: birdsData.map((item) => item.subTitle),
  quizLevel: level,
  quizScore: score,
});

// const mapToDispatch = (dispatch) => ({
//
// });

export default connect(mapStateToProps)(Header);
