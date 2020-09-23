import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStop, faPlay, faStar, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';
import { updateGameState, resetGame } from '../actions';
import GAME_STATES from '../../utilities/GameStates'
import './GameTools.scss';

function GameTools ({ game, updateGameState, resetGame, username, password, validAuth, gameType }) {
  if (!game) {
    return <div/>;
  }

  return (
    <div className='game-tools horizontal-button-container'>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          updateGameState(GAME_STATES.LOBBY, username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faHome}/> Lobby
      </button>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          updateGameState(GAME_STATES.STOPPED, username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faStop}/> Stop
      </button>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          updateGameState(GAME_STATES.PAUSED, username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faPause}/> Pause
      </button>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          updateGameState(GAME_STATES.ACTIVE, username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faPlay}/> Play
      </button>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          updateGameState(GAME_STATES.BONUS, username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faStar}/> Bonus
      </button>
      <button
        className='button'
        type='button'
        disabled={!validAuth}
        onClick={() => {
          resetGame(username, password, gameType);
        }}>
        <FontAwesomeIcon icon={faUndo}/> Reset
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    updateGameState: (state, username, password, gameType) => {
      dispatch(updateGameState(state, username, password, gameType));
    },
    resetGame: (username, password, gameType) => {
      dispatch(resetGame(username, password, gameType));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTools);

