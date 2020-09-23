const log = require('../utils/log')('game-socket-handler');
const {GAME_DATA_KEYS, GAME_STATES} = require("../datagrid/game-constants");
const AMQ_MESSAGE_TYPES = require('../messaging/message-types');
const GAME_CONFIG = require('../utils/GameConfigs');
const validAuth = require('./valid-auth');

async function gameHandler(ws, messageObj) {
  if (!validAuth(ws, messageObj)) {
    return;
  }

  let game;
  try {
    let str = await global.gameData.get(GAME_DATA_KEYS.CURRENT_GAME);
    if (str) {
      game = JSON.parse(str);
    } else {
      log.error("Game configuration missing");
    }
  } catch (error) {
    log.error('Failed to read game. Error: %o', error);
    return;
  }

  if (!game) {
    return;
  }

  log.debug("GAME TYPE" + messageObj.gameType);
  Object.assign(game, messageObj.game);
  Object.assign(game.configuration, GAME_CONFIG[messageObj.gameType])
  game.date = new Date().toISOString()
  log.debug("Updated game" + JSON.stringify(game));

  try {
    await global.gameData.put(GAME_DATA_KEYS.CURRENT_GAME, JSON.stringify(game));
  } catch (error) {
    log.error('Failed to update game. Error: %o', error);
    return;
  }

  global.game = game;

  try {
    global.amqpGameSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.GAME.GAME,
        game: global.game
      })
    });
  } catch (error) {
    log.error('error occurred in sending game update');
    log.error(error);
  }
}

module.exports = gameHandler;

