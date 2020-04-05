import React from 'react';

class GameStart extends React.Component {
    render() {
        return (
            <div className="container game-start">
                <button className="btn btn-outline-info" onClick={this.props.action}>
                    Start Game
                </button>
            </div>
        );
    }
}

export default GameStart;
