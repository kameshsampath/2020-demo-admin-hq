import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { updateGameConfig } from "../actions"
import './GameConfig.scss';

function BalloonGameConfig ({ game, updateGameConfig, username, password, validAuth, gameType }) {

    const [background, setBackground] = useState('default')
    const [speed, setSpeed] = useState(70);
    const [size, setSize] = useState(0.6);
    const [opacity, setOpacity] = useState(85);
    const [goldenSnitch1, setGoldenSnitch1] = useState(false);
    const [goldenSnitch2, setGoldenSnitch2] = useState(false);
    const [pred, setPred] = useState(1);
    const [pgreen, setPgreen] = useState(1);
    const [pblue, setPblue] = useState(1);
    const [pyellow, setPyellow] = useState(1);
    const [pgoldenSnitch1, setPgoldenSnitch1] = useState(50);
    const [pgoldenSnitch2, setPgoldenSnitch2] = useState(50);

    function resetter (state, action) {
        console.log("Game Config:%s, Action:%s", JSON.stringify(state), action);
        if (game && 'reset' === game.state) {
            setBackground(game.configuration.background);
            setSpeed(game.configuration.speed);
            setSize(game.configuration.size);
            setOpacity(game.configuration.opacity);
            setGoldenSnitch1(game.configuration.goldenSnitch1);
            setGoldenSnitch2(game.configuration.goldenSnitch2);
            setPred(game.configuration.points.red);
            setPblue(game.configuration.points.blue);
            setPgreen(game.configuration.points.green);
            setPyellow(game.configuration.points.yellow);
            setPgoldenSnitch1(game.configuration.points.goldenSnitch1);
            setPgoldenSnitch2(game.configuration.points.goldenSnitch2);
        }
    }

    if (!game || !validAuth) {
        return <div />;
    }

    const computeUpdateRequired = () => {
        return background !== game.configuration.background ||
            speed !== game.configuration.speed ||
            size !== game.configuration.size ||
            opacity !== game.configuration.opacity ||
            goldenSnitch1 !== game.configuration.goldenSnitch1 ||
            goldenSnitch2 !== game.configuration.goldenSnitch2 ||
            pred !== game.configuration.points.red ||
            pgreen !== game.configuration.points.green ||
            pblue !== game.configuration.points.blue ||
            pyellow !== game.configuration.points.yellow ||
            pgoldenSnitch1 !== game.configuration.points.goldenSnitch1 ||
            pgoldenSnitch2 !== game.configuration.points.goldenSnitch2
    }

    return (
        <div className="game-config section">
            <h1 className="title">Game Configuration
                <button
                    className='button'
                    type="button"
                    disabled={!computeUpdateRequired()}><FontAwesomeIcon icon={faCog}
                        onClick={() => {
                            updateGameConfig(game.state, username, password, gameType, background, speed, size, opacity, goldenSnitch1, goldenSnitch2, pred, pgreen, pblue, pyellow, pgoldenSnitch1, pgoldenSnitch2)
                        }
                        }
                    />
                    Change
                </button>
            </h1>
            <div className="field columns">
                <div className="column is-one-quarter">
                    <label className="label">Background</label>
                    <div className="select">
                        <select
                            name="background"
                            value={background}
                            onChange={e => setBackground(e.target.value)}>
                            <option>default</option>
                            <option>blue</option>
                            <option>green</option>
                            <option>canary</option>
                        </select>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <div className="field">
                        <label className="label">Speed</label>
                        <div className="select">
                            <select
                                name="speed"
                                onChange={e => setSpeed(e.target.value)}
                                value={speed}>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                                <option>60</option>
                                <option>70</option>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <label className="label">Size</label>
                    <div className="select">
                        <select
                            name="size"
                            onChange={e => setSize(e.target.value)}
                            value={size}>
                            <option>0.3</option>
                            <option>0.6</option>
                            <option>0.9</option>
                        </select>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <div className="field">
                        <label className="label">Opacity</label>
                        <div className="select">
                            <select
                                name="opacity"
                                onChange={e => setOpacity(e.target.value)}
                                value={opacity}>
                                <option>50</option>
                                <option>65</option>
                                <option>85</option>
                                <option>95</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field columns">
                <div className="column is-one-quarter">
                    <label className="checkbox">
                        <input
                            name="goldenSnitch1"
                            onChange={e => setGoldenSnitch1(e.target.checked)}
                            type="checkbox"
                            checked={goldenSnitch1}
                        />
                            Golden Snitch 1
                        </label>
                </div>
                <div className="column is-one-quarter">
                    <label className="checkbox">
                        <input
                            name="goldenSnitch2"
                            onChange={e => setGoldenSnitch2(e.target.checked)}
                            type="checkbox"
                            checked={goldenSnitch2} />
                            Golden Snitch 2
                        </label>
                    </div>

            </div>
            <h2 className="subtitle">Points Config</h2>
            <div className="columns">
                <div className="column field is-one-quarter">
                    <label className="label">Red</label>
                    <div className="select is-rounded is-danger">
                        <select
                            name="pred"
                            onChange={e => setPred(e.target.value)}
                            value={pred}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                </div>
                <div className="column field is-one-quarter">
                    <label className="label">Green</label>
                    <div className="select is-rounded is-success">
                        <select
                            name="pgreen"
                            onChange={e => setPgreen(e.target.value)}
                            value={pgreen}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                </div>
                <div className="column field is-one-quarter">
                    <label className="label">Blue</label>
                    <div className="select is-rounded is-info">
                        <select
                            name="pblue"
                            onChange={e => setPblue(e.target.value)}
                            value={pblue}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                </div>
                <div className="column field is-one-quarter">
                    <label className="label">Yellow</label>
                    <div className="select is-rounded is-warning">
                        <select
                            name="pyellow"
                            onChange={e => setPyellow(e.target.value)}
                            value={pyellow}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                </div>
            </div>
            <div className="columns">
                <div className="column field is-one-quarter">
                    <label className="label">Golden Snitch 1</label>
                    <div className="select is-rounded">
                        <select
                            name="pgoldenSnitch1"
                            onChange={e => setPgoldenSnitch1(e.target.value)}
                            value={pgoldenSnitch1}>
                                <option>50</option>
                                <option>100</option>
                                <option>150</option>
                            </select>
                        </div>
                </div>
                <div className="column field is-one-quarter">
                    <label className="label">Golden Snitch 2</label>
                    <div className="select is-rounded">
                        <select
                            name="pgoldenSnitch2"
                            onChange={e => setPgoldenSnitch2(e.target.value)}
                            value={pgoldenSnitch2}>
                                <option>50</option>
                                <option>100</option>
                                <option>150</option>
                            </select>
                        </div>
                    </div>
            </div>
        </div>
    );
}

function mapStateToProps (state) {
    return state.appReducer;
}

function mapDispatchToProps (dispatch) {
    return {
        updateGameConfig: (state, username, password, gameType,
            background, speed, size, opacity,
            goldenSnitch1, goldenSnitch2,
            pred, pgreen, pblue, pyellow,
            pgoldenSnitch1, pgoldenSnitch2) => {
            dispatch(updateGameConfig(state, username, password, gameType,
                background, speed, size, opacity,
                goldenSnitch1, goldenSnitch2,
                pred, pgreen, pblue, pyellow,
                pgoldenSnitch1, pgoldenSnitch2));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BalloonGameConfig);