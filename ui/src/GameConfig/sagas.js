import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage } from '../Socket/actions';
import { UPDATE_GAME_CONFIG } from './actions';
import { OUTGOING_MESSAGE_TYPES } from '../Socket/messageTypes';

function* executeUpdateGameConfig (action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.UPDATE_GAME_CONFIG,
    game: {
      state: action.payload.state,
      configuration: {
        background: action.payload.background,
        size: action.payload.size,
        speed: action.payload.speed,
        opacity: action.payload.opacity,
        goldenSnitch1: action.payload.goldenSnitch1,
        goldenSnitch2: action.payload.goldenSnitch2,
        points: {
          red: action.payload.pred,
          green: action.payload.pgreen,
          blue: action.payload.pblue,
          yellow: action.payload.pyellow,
          goldenSnitch1: action.payload.pgoldenSnitch1,
          goldenSnitch2: action.payload.pgoldenSnitch2
        }
      }
    },
    username: action.payload.username,
    password: action.payload.password,
    gameType: action.payload.gameType
  }));
}

function* watchUpdateGameConfig () {
  yield takeLatest(UPDATE_GAME_CONFIG, executeUpdateGameConfig);
}

export default [
  watchUpdateGameConfig()
];