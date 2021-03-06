const log = require('../utils/log')('global-socket-handler');
const {INCOMING_MESSAGE_TYPES, OUTGOING_MESSAGE_TYPES} = require('./message-types');

function processSocketMessage(conn, messageStr) {
  let messageObj;

  try {
    messageObj = JSON.parse(messageStr);
  } catch (error) {
    log.error('Malformed socket message JSON: %o', error);
    return;
  }

  switch (messageObj.type) {
    case INCOMING_MESSAGE_TYPES.INIT:
      initHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.PING:
      pingHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_GAME:
      resetHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.UPDATE_GAME:
      gameHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.BOT_PING:
      botPingHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.BOT_CONFIG:
      botConfigHandler(conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.AUTH_CHECK:
      authCheckHandler(conn, messageObj);
      break;

    default:
      log.warn(`Unhandled Game Message of type '${messageStr}'`);
      break;
  }
}

/**
 * Wraps a message handler with some generic logging
 * @param {Function} fn The handler function implementation
 * @param {String} type The named type of the payload
 */
function wrapMessageHandler (type, fn) {
    return function messageHandlerWrapper (ws, messageObj) {
        log.info(`processing message of type '${type}'`);
        log.debug(`payload for message '${type}' was: %j`, messageObj);

        fn(ws, messageObj)
    }
}

const initHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.INIT, require('./init'));
const pingHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.PING, function (ws, messageObj) {
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.PING_RESPONSE}));
});
const gameHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.UPDATE_GAME, require('./game'));
const resetHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_GAME, require('./reset-game'));
const botPingHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.BOT_PING, require('./bot-ping'));
const botConfigHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.BOT_CONFIG, require('./bot-config'));
const authCheckHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.AUTH_CHECK, require('./auth-check'));


module.exports = processSocketMessage;
