import React from 'react';
import GamePanel from '../game-panel';
import GameStart from '../game-start';

class Panel extends React.Component {

    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        this.handler = this.handler.bind(this);

        // Set some state
        this.state = {
            isStartGame: false
        };
    }

    handler() {
        this.setState({
            isStartGame: true
        });
    }

    render() {
        const that = this;

        function ShowView() {
            if (that.state.isStartGame) {
                return <GamePanel/>;
            }

            return <GameStart action={that.handler}/>;
        }

        return (
            <ShowView/>
        );
    }
}

export default Panel;
