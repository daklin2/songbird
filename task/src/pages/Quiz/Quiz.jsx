import React from 'react';

import Header from '../../components/Header';
import Styles from './Quiz.module.scss';

const Quiz = () => {
  return (
    <div className={Styles.Quiz}>
      <div className={Styles['Quiz-container']}>
        <Header />
      </div>
    </div>
  );
};

export default Quiz;
