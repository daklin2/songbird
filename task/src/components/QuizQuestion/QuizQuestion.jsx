import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import Styles from './QuizQuestion.module.scss';

const QuizQuestion = ({
  birdsData,
  quizLevel,
  currentQuizScore,
  chosenBirdIndex,
  replaceQuizQuestion,
  setQuizLevel,
  setQuizScore,
  maxQuizLevel,
}) => {
  const [gameIsActive, setGameIsActive] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [quizScoreToGet, setQuizScoreToGet] = useState(5);
  const [rightAnswerIndex, setRightAnswerIndex] = useState(
    Math.floor(Math.random() * birdsData[quizLevel].length)
  );
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
    // eslint-disable-next-line
  }, [quizLevel]);

  const quizDescriptionHtml = () => (
    <>
      <div className={Styles.QuizQuestion__instruction_body}>
        <img
          className={Styles['QuizQuestion-img']}
          src={currentQuestionObj[chosenBirdIndex].image}
          alt={currentQuestionObj[chosenBirdIndex].name}
        />
        <div className={Styles['QuizQuestion__instruction_body-data']}>
          <div className={Styles['QuizQuestion__instruction_body-name']}>
            {currentQuestionObj[chosenBirdIndex].name}
          </div>
          <div className={Styles['QuizQuestion__instruction_body-species']}>
            {currentQuestionObj[chosenBirdIndex].species}
          </div>
          {/* eslint-disable-next-line */}
          <audio
            key={currentQuestionObj[chosenBirdIndex].name}
            className={Styles['QuizQuestion-audio']}
            controls
          >
            <source src={currentQuestionObj[chosenBirdIndex].audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div className={Styles.QuizQuestion__instruction_description}>
        {currentQuestionObj[chosenBirdIndex].description}
      </div>
    </>
  );

  const quizInteractiveSectionHtml = () => (
    <div className={Styles.QuizQuestion__interactive}>
      <div className={Styles['QuizQuestion__questions-container']}>
        {currentQuestionObj.map((bird, index) => {
          const indicatorClass = classNames(Styles['QuizQuestion__questions-indicator'], {
            [Styles['QuizQuestion__questions-indicator--true']]: bird.status === true,
            [Styles['QuizQuestion__questions-indicator--false']]: bird.status === false,
            [Styles['QuizQuestion__questions-indicator--inactive']]: bird.status === 'inactive',
          });

          return (
            <button
              key={bird.name}
              type="button"
              className={Styles['QuizQuestion__questions-question']}
              onClick={() => handlerClickQuizButton(index)}
            >
              <div className={indicatorClass} />
              <div>{bird.name}</div>
            </button>
          );
        })}
      </div>
      <div className={Styles.QuizQuestion__instruction}>
        <div className={Styles['QuizQuestion__instruction-container']}>
          {chosenBirdIndex !== null ? quizDescriptionHtml() : <div>Выберите ответ</div>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={Styles.QuizQuestion__preview}>
        {gameIsActive ? (
          <div className={Styles['QuizQuestion__preview-img']} />
        ) : (
          <img
            className={Styles['QuizQuestion-img']}
            src={currentQuestionObj[rightAnswerIndex].image}
            alt={currentQuestionObj[rightAnswerIndex].name}
          />
        )}
        <div className={Styles.QuizQuestion__preview_question}>
          <div className={Styles['QuizQuestion__preview_question-header']}>
            {gameIsActive ? '******' : currentQuestionObj[rightAnswerIndex].name}
          </div>
          <div>
            {/* eslint-disable-next-line */}
            <audio
              key={currentQuestionObj[rightAnswerIndex].name}
              className={Styles['QuizQuestion-audio']}
              controls
            >
              <source src={currentQuestionObj[rightAnswerIndex].audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      {!gameIsOver ? (
        quizInteractiveSectionHtml()
      ) : (
        <div className={Styles.QuizQuestion__endgame}>
          <h1 className={Styles['QuizQuestion__endgame-Header']}>Поздравляем!</h1>
          <p className="lead text-center">
            Вы прошли викторину и набрали
            {currentQuizScore}
            из 30 возможных баллов
          </p>
        </div>
      )}
      <button className={Styles.QuizQuestion__next} type="button" onClick={handlerClickNextLevel}>
        {!gameIsOver ? 'Next Level' : 'Попробовать ещё раз'}
      </button>
    </>
  );
};

QuizQuestion.defaultProps = {
  quizLevel: 0,
  chosenBirdIndex: 0,
  maxQuizLevel: 0,
  currentQuizScore: 0,
};

QuizQuestion.propTypes = {
  birdsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))).isRequired,
  quizLevel: PropTypes.number,
  chosenBirdIndex: PropTypes.number,
  replaceQuizQuestion: PropTypes.func.isRequired,
  setQuizLevel: PropTypes.func.isRequired,
  setQuizScore: PropTypes.func.isRequired,
  maxQuizLevel: PropTypes.number,
  currentQuizScore: PropTypes.number,
};

export default QuizQuestion;
