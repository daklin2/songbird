import { connect } from 'react-redux';

import Header from './Header';
import birdsData from '../../constants/birdsData';

const mapStateToProps = () => ({
  birdsSubTitles: birdsData.map((item) => item.subTitle),
});

export default connect(mapStateToProps)(Header);
