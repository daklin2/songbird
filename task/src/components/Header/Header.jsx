import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Styles from './Header.module.scss';

const Header = ({ birdsSubTitles, quizLevel, quizScore }) => {
  return (
    <div className={Styles.Header}>
      <div className={Styles.Header__top}>
        <div className={Styles['Header__top-logo']} />
        <div className={Styles['Header__top-score']}>
          Score:
          {quizScore}
        </div>
      </div>
      <div className={Styles.Header__pagination}>
        {birdsSubTitles.map((item, index) => {
          const linkClass = classNames(Styles['Header__pagination_items-link'], {
            [Styles['Header__pagination_items-link--active']]: index === quizLevel,
          });

          return (
            <div className={Styles.Header__pagination_items} key={item}>
              <button type="button" className={linkClass}>
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Header.defaultProps = {
  quizLevel: 0,
  quizScore: 0,
};

Header.propTypes = {
  birdsSubTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizLevel: PropTypes.number,
  quizScore: PropTypes.number,
};

export default Header;
