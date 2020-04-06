import React from 'react';


class GameBox extends React.Component {

    getResultClass() {
        if (this.props.resultBoxes.length === 0) {
            return '';
        }

        const isInResultsBox = this.props.resultBoxes.filter(
            b => (b[0] === this.props.row && b[1] === this.props.column)
        );

        if (isInResultsBox.length === 0) {
            return '';
        }

        // Horizontal line
        if (this.props.resultBoxes[0][0] === this.props.resultBoxes[1][0]) {
            return 'game-box-stick game-box-stick-horizontal';
        }

        // Vertical line
        if (this.props.resultBoxes[0][1] === this.props.resultBoxes[1][1]) {
            return 'game-box-stick game-box-stick-vertical';
        }

        // Diagonal line (left to right)
        if (
            this.props.resultBoxes[0][0] === this.props.resultBoxes[0][1] &&
            this.props.resultBoxes[1][0] === this.props.resultBoxes[1][1]
        ) {
            return 'game-box-stick game-box-stick-diagonal-lr';
        }

        // Diagonal line (right to left)
        if (
            (this.props.resultBoxes[0][0] + 1) === this.props.resultBoxes[1][0] &&
            (this.props.resultBoxes[0][1] - 1) === this.props.resultBoxes[1][1]
        ) {
            return 'game-box-stick game-box-stick-diagonal-rl';
        }
    }

    render() {
        if (this.props.value === 0) {
            return (
                <div
                    className="game-box-item game-box-active"
                    onClick={() => this.props.action(this.props.row, this.props.column)}
                />
            );
        }

        return (
            <div className="game-box-item">
                <div className={this.getResultClass()}/>

                {this.props.value > 0 ? this.props.players.first : this.props.players.second}
            </div>
        );
    }
}

export default GameBox;
