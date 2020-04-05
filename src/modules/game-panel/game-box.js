import React from 'react';


class GameBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.value === 0) {
            return (
                <div
                    className="game-box-item game-box-active"
                    onClick={() => this.props.action(this.props.row, this.props.column)}
                >
                    __
                </div>
            );
        }

        return (
            <div className="game-box-item">
                {this.props.value > 0 ? this.props.players.first : this.props.players.second}
            </div>
        );
    }
}

export default GameBox;
