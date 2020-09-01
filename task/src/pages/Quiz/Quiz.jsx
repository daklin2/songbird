import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Styles from './Quiz.module.scss';

const Quiz = ({
  birdsData,
  quizLevel,
  currentQuizScore,
  chosenBirdIndex,
  replaceQuizQuestion,
  setQuizLevel,
  setQuizScore,
  maxQuizLevel,
}) => {
  const [rightAnswerIndex, setRightAnswerIndex] = useState(
    Math.floor(Math.random() * birdsData[quizLevel].length)
  );
  const [gameIsActive, setGameIsActive] = useState(true);
  const [quizScoreToGet, setQuizScoreToGet] = useState(5);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [currentQuestionObj, setCurrentQuestionObj] = useState(
    birdsData[quizLevel].map((el) => ({ ...el, status: 'inactive' }))
  );

  const handlerClickQuizButton = (index) => {
    replaceQuizQuestion(index);

    if (index === rightAnswerIndex && gameIsActive) {
      setGameIsActive(false);
      currentQuestionObj[index].status = true;
      setQuizScore(currentQuizScore + quizScoreToGet);
    } else if (gameIsActive) {
      currentQuestionObj[index].status = false;
      setQuizScoreToGet(quizScoreToGet - 1);
    }
  };

  const handlerClickNextLevel = () => {
    if (gameIsOver) {
      setQuizScore(0);
      setQuizLevel(0);
      setQuizScoreToGet(5);
      setGameIsActive(true);
      setGameIsOver(false);
    }

    if (maxQuizLevel === quizLevel + 1) {
      setGameIsOver(true);
    } else if (!gameIsActive) {
      setQuizLevel(quizLevel + 1);
      setGameIsActive(true);
      setQuizScoreToGet(5);
    }
  };

  useEffect(() => {
    setCurrentQuestionObj(birdsData[quizLevel].map((el) => ({ ...el, status: 'inactive' })));
    setRightAnswerIndex(Math.floor(Math.random() * birdsData[quizLevel].length));
  }, [quizLevel]);

  const quizDescriptionHtml = () => (
    <>
      <div className={Styles.Quiz__instruction_body}>
        <img
          className={Styles['Quiz__instruction_body-img']}
          src={currentQuestionObj[chosenBirdIndex].image}
          alt={currentQuestionObj[chosenBirdIndex].name}
        />
        <div className={Styles['Quiz__instruction_body-data']}>
          <div className={Styles['Quiz__instruction_body-name']}>
            {currentQuestionObj[chosenBirdIndex].name}
          </div>
          <div className={Styles['Quiz__instruction_body-species']}>
            {currentQuestionObj[chosenBirdIndex].species}
          </div>
          {/* <div className={Styles['Quiz__instruction_body-name']}>currentQuestionObj[chosenBirdIndex].name</div> */}
        </div>
      </div>
      <div className={Styles.Quiz__instruction_description}>
        {currentQuestionObj[chosenBirdIndex].description}
      </div>
    </>
  );

  const quizInteractiveSectionHtml = () => (
    <div className={Styles.Quiz__interactive}>
      <div className={Styles['Quiz__questions-container']}>
        {currentQuestionObj.map((bird, index) => {
          const indicatorClass = classNames(Styles['Quiz__questions-indicator'], {
            [Styles['Quiz__questions-indicator--true']]: bird.status === true,
            [Styles['Quiz__questions-indicator--false']]: bird.status === false,
            [Styles['Quiz__questions-indicator--inactive']]: bird.status === 'inactive',
          });

          return (
            <button
              key={bird.name}
              type="button"
              className={Styles['Quiz__questions-question']}
              onClick={() => handlerClickQuizButton(index)}
            >
              <div className={indicatorClass} />
              <div>{bird.name}</div>
            </button>
          );
        })}
      </div>
      <div className={Styles.Quiz__instruction}>
        {chosenBirdIndex !== null ? quizDescriptionHtml() : <div>Выберите ответ</div>}
      </div>
    </div>
  );

  return (
    <div className={Styles.Quiz}>
      <div className={Styles['Quiz-container']}>
        <Header />
        <div />
        {!gameIsOver ? (
          quizInteractiveSectionHtml()
        ) : (
          <div className={Styles.Quiz__endgame}>
            <h1 className={Styles['Quiz__endgame-Header']}>Поздравляем!</h1>
            <p className="lead text-center">
              Вы прошли викторину и набрали
              {currentQuizScore}
              из 30 возможных баллов
            </p>
          </div>
        )}
        <button className={Styles.Quiz__next} type="button" onClick={handlerClickNextLevel}>
          {!gameIsOver ? 'Next Level' : 'Попробовать ещё раз'}
        </button>
      </div>
    </div>
  );
};

Quiz.defaultProps = {
  quizLevel: 0,
  chosenBirdIndex: 0,
  maxQuizLevel: 0,
  currentQuizScore: 0,
};

Quiz.propTypes = {
  birdsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))).isRequired,
  quizLevel: PropTypes.number,
  chosenBirdIndex: PropTypes.number,
  replaceQuizQuestion: PropTypes.func.isRequired,
  setQuizLevel: PropTypes.func.isRequired,
  setQuizScore: PropTypes.func.isRequired,
  maxQuizLevel: PropTypes.number,
  currentQuizScore: PropTypes.number,
};

export default Quiz;
