import React from 'react';
import PropTypes from 'prop-types';

import Styles from './Header.module.scss';

const Header = ({ birdsSubTitles }) => {
  const score = 0;

  return (
    <div className={Styles.Header}>
      <div className={Styles.Header__top}>
        <div className={Styles['Header__top-logo']} />
        <div className={Styles['Header__top-score']}>
          {' '}
          Score:
          {score}
        </div>
      </div>
      <div className={Styles.Header__pagination}>
        {birdsSubTitles.map((item) => (
          <div className={Styles.Header__pagination_items} key={item}>
            <button type="button" className={Styles['Header__pagination_items-link']}>
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Header.propTypes = {
  birdsSubTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
