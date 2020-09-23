import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import GameStatus from '../../GameStatus';
import GameTools from '../../GameTools';
import Leaderboard from '../../Leaderboard';
import Bots from '../../Bots';

import './Home.scss';
import { skipAuthCheck, sendAuthCheck, logout } from '../actions';

function Home ({ game, validAuth, skipAuth, sendAuthCheck, skipAuthCheck, logout }) {
  const [tab, updateTab] = useState('leaderboard');
  const [usernameText, updateUsernameText] = useState('');
  const [passwordText, updatePasswordText] = useState('');
  const [showPassword, updateShowPassword] = useState(true);
  const [gameid, updateGameId] = useState('');

  function renderAuth() {
    if (validAuth) {
      return (
        <div className="logout">
          <button
            className="button is-danger is-rounded is-small"
            onClick={() => {
              updateUsernameText('');
              updatePasswordText('');
              logout();
            }}>Logout
          </button>
        </div>
      );
    }
    return (
      <div className="notification">
        <p>Read Only Mode.  To change game settings, please <a className="" onClick={() => skipAuthCheck(false)}>log in</a></p>
      </div>);
  }

  function renderTab() {
    switch (tab) {
      case 'bots':
        return (
          <section className='section'>
            <Bots/>
          </section>
        );
      default:
        return (
          <section className='section'>
            <Leaderboard/>
          </section>
        );
    }
  }

  function onLoginKey(e) {
    if (e.key === 'Enter') {
      sendAuthCheck(usernameText, passwordText, gameid);
    }

    if (e.key === 'Escape') {
      skipAuthCheck(true);
    }
  }

  return (
    <div className='home'>
      {renderAuth()}
      <section className='section'>
        <GameStatus game={game}/>
        <GameTools/>
      </section>
      {gameid === 'gtp' && 
        <div className='tabs is-boxed'>
          <ul>
            <li className={tab === 'leaderboard' ? 'is-active' : ''}>
              <a onClick={() => updateTab('leaderboard')}>Leaderboard</a>
            </li>
            <li className={tab === 'bots' ? 'is-active' : ''}>
              <a onClick={() => updateTab('bots')}>Bots</a>
            </li>
          </ul>
        </div>
      }
      {gameid === 'gtp' && renderTab()}
      <div className={cx('modal', 'login-modal', {'is-active': !validAuth && !skipAuth})}>
        <div className='modal-background'/>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Login</p>
            <button className='delete' aria-label='close' onClick={() => skipAuthCheck(true)}/>
          </header>
          <section className='modal-card-body'>
            <p className=''>Log in required make game changes.  Skip for read-only mode</p>
            <form className='login-form'
                  onKeyDownCapture={onLoginKey}>
              <div className='field'>
                <label className='label'>Username</label>
                <div className='control username-input-control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='username'
                    value={usernameText}
                    onChange={e => updateUsernameText(e.target.value)}
                  />
                </div>
              </div>
             <div className='field'>
               <label className='label'>Password
                 <FontAwesomeIcon className='toggle-hide-password' onClick={() => updateShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye}/>
               </label>
                <div className='control password-input-control'>
                  <input
                    className='input'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    value={passwordText}
                    onChange={e => updatePasswordText(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Select a Game</label>
                <div className='select game-input-control'>
                  <select
                    className='select'
                    value={gameid}
                    onChange={e => updateGameId(e.target.value)}>
                    <option value="default">Select a Game</option>
                    <option value="balloon-game">Balloon Popping</option>
                    <option value="gtp">Guess The Price</option>
                  </select>
                </div>
              </div>
            </form>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success'
              onClick={
                () => sendAuthCheck(usernameText, passwordText, gameid)}>Submit
            </button>
            <button className='button' onClick={() => skipAuthCheck(true)}>Skip</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    sendAuthCheck: (username, password, gameid) => {
      dispatch(sendAuthCheck(username, password, gameid));
    },
    skipAuthCheck: (skipAuth) => {
      dispatch(skipAuthCheck(skipAuth));
    },
    logout: () => {
      dispatch(logout())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
