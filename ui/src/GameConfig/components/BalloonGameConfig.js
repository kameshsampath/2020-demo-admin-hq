import React from 'react';
import { connect } from 'react-redux';
import { updateGameState } from "../actions"
import './GameConfig.scss';

function BalloonGameConfig ({ game, updateGameState, username, password, validAuth, gameType }) {
    if (!game) {
        return <div />;
    }

    return (
        <section className="section">
            <h1 className="title">Game Configuration</h1>
            <div className="field">
                <label className="label">Background</label>
                <div className="select">
                    <select>
                        <option>default</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>canary</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Size</label>
                <div className="select">
                    <select>
                        <option>0.3</option>
                        <option>0.6</option>
                        <option>0.9</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Opacity</label>
                <div className="select">
                    <select>
                        <option>85</option>
                        <option>65</option>
                        <option>50</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <input type="checkbox" />
                <label className="checkbox">Golden Snitch 1</label>
            </div>
            <div className="field">
                <input type="checkbox" />
                <label className="checkbox">Golden Snitch 2</label>
            </div>

            <div className="field">
                <label className="label">Speed</label>
                <div className="select">
                    <select>
                        <option>70</option>
                        <option>90</option>
                        <option>100</option>
                    </select>
                </div>
            </div>

            <h2 className="subtitle">Points Config</h2>
            <div className="field is-horizontal">
                <label className="label">Red&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <label className="label">Yellow&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <label className="label">Green&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <label className="label">Blue&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <label className="label">Golden Snitch 1&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>50</option>
                        <option>100</option>
                        <option>150</option>
                    </select>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <label className="label">Golden Snitch 2&nbsp;&nbsp;&nbsp;</label>
                <div className="select">
                    <select>
                        <option>50</option>
                        <option>100</option>
                        <option>150</option>
                    </select>
                </div>
            </div>
            <button
                className='button is-success'
                disabled="true">Update
            </button>
        </section>

    );
}


function mapStateToProps (state) {
    return state.appReducer;
}

function mapDispatchToProps (dispatch) {
    return {
        updateGameState: (state, username, password, gameType) => {
            dispatch(updateGameState(state, username, password, gameType));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BalloonGameConfig);