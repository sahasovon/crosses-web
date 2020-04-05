import React from 'react';


class GameActivity extends React.Component {

    renderTableData() {
        return this.props.activities.map((activity, index) => {
            return (
                <tr key={index}>
                    <td>{activity}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                <h5 className="text-center">Activity Log</h5>
                <table className="table table-sm table-striped table-bordered">
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </>
        );
    }
}

export default GameActivity;
