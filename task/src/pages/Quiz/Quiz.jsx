import React from 'react';

import Header from '../../components/Header';
import Styles from './Quiz.module.scss';
import QuizQuestion from '../../components/QuizQuestion';

const Quiz = () => {
  return (
    <div className={Styles.Quiz}>
      <div className={Styles['Quiz-container']}>
        <Header />
        <QuizQuestion />
      </div>
    </div>
  );
};

export default Quiz;
