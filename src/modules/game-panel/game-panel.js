import React from 'react';
import GameBox from "./game-box";
import GameActivity from "./game-activity";

class GamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.makeATurn = this.makeATurn.bind(this);
        this.restartGame = this.restartGame.bind(this);

        this.state = {
            isStarted: false,
            alert: {
                active: false,
                isBlink: false,
                alertText: '',
            },
            game: {}
        };
    }

    componentDidMount() {
        this.startGame();
    }

    startGame(restart = false) {
        const whoPlayFirst = Math.random() >= 0.5;

        fetch(process.env.REACT_APP_API_URL + '/game', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "restart": restart,
                "players": {
                    "first": whoPlayFirst ? "X" : "O",
                    "second": whoPlayFirst ? "O" : "X"
                }
            })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({
                    isStarted: true,
                    game: response.game,
                    alert: {
                        active: (response.type === 'old'),
                        alertText: 'Starting from old game',
                    }
                });
            });
    }

    restartGame() {
        if (window.confirm('Are you sure to restart game?')) {
            this.startGame(true);
        }
    }

    makeATurn(row, col) {
        if (this.state.game.result !== 'ongoing') {
            return;
        }

        fetch(process.env.REACT_APP_API_URL + '/game/' + this.state.game._id + '/turn', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                "row": row,
                "column": col
            })
        })
            .then(res => {
                if (res.status !== 200) {
                    throw Error('Some error occurred')
                }

                return res.json();
            })
            .then(response => {
                this.setState({
                    isStarted: true,
                    game: response.game
                });

                if (response.game.result !== 'ongoing') {
                    this.setState({
                        alert: {
                            active: true,
                            isBlink: true,
                            alertText: (response.game.result === 'draw') ? 'Game Drawn' : ('Player ' + response.game.result + ' Won'),
                        }
                    });
                }
            })
            .catch(err => {
                console.log('Error', err);
            });
    }

    alertBox() {
        if (!this.state.alert.active) {
            return (<></>);
        }

        return (<div className="col-12 text-center">
            <div className={`alert alert-info ${this.state.alert.isBlink ? 'alert-blink' : ''}`}>
                {this.state.alert.alertText}
            </div>
        </div>);
    }

    render() {
        const { isStarted, game } = this.state;

        if (!isStarted) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 mx-auto">
                            Game Starting ...
                        </div>
                    </div>
                </div>
            );
        }

        console.log(game);

        const createBoxes = () => {
            let boxes = [];

            for (let r = 0; r < game.boxNumber; r++) {
                let children = [];

                for (let c = 0; c < game.boxNumber; c++) {
                    let key = r.toString() + c.toString();

                    children.push(
                        <GameBox
                            key={key}
                            row={r}
                            column={c}
                            players={game.players}
                            value={game.boxData[r][c]}
                            action={this.makeATurn}
                        />);
                }

                boxes.push(<div className="d-flex" key={r}>{children}</div>);
            }

            return boxes;
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                        <div className="row">
                            <div className="col-12 col-md-3 text-center game-player">
                                <h4>Player 1</h4>
                                <span className={`game-icon ${ (game.players.first === 'X') ? 'game-icon-x' : 'game-icon-o'}`}>
                        </span>
                            </div>
                            <div className="col-12 col-md-6">
                                {createBoxes()}
                            </div>
                            <div className="col-12 col-md-3 text-center game-player">
                                <h4>Player 2</h4>
                                <span className={`game-icon ${ (game.players.first === 'O') ? 'game-icon-x' : 'game-icon-o'}`}>
                        </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>Playing: <b>Player { (game.nextTurnBy === 'first') ? '1' : '2' }</b></p>
                            </div>
                            {this.alertBox()}
                            <div className="col-12 pt-4 pb-3">
                                <button className="btn btn-danger" onClick={this.restartGame}>
                                    Restart Game
                                </button>
                            </div>
                            <div className="col-12 col-md-9 mx-auto pt-2">
                                <GameActivity activities={game.activities}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamePanel;
