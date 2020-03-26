import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Tic Tac Toe Game
      </header>

      <div className="container game-start">
          <button className="btn btn-outline-info">
              Start Game
          </button>
      </div>

      <div className="container">
        <div className="row">
            <div className="col-12 col-md-8 mx-auto">
                <div className="row">
                    <div className="col-12 col-md-3 text-center game-player">
                        <h4>Player 1</h4>
                        <span className="game-icon game-icon-x">
                        </span>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex">
                            <div className="flex-item">1</div>
                            <div className="flex-item">2</div>
                            <div className="flex-item">3</div>
                        </div>
                        <div className="d-flex">
                            <div className="flex-item">4</div>
                            <div className="flex-item">5</div>
                            <div className="flex-item">6</div>
                        </div>
                        <div className="d-flex">
                            <div className="flex-item">7</div>
                            <div className="flex-item">8</div>
                            <div className="flex-item">9</div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 text-center game-player">
                        <h4>Player 2</h4>
                        <span className="game-icon game-icon-o">
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <p>Playing: <b>Player 1</b></p>
                    </div>
                    <div className="col-12 pt-4 pb-3">
                        <button className="btn btn-danger">
                            Restart Game
                        </button>
                    </div>
                    <div className="col-12 col-md-9 mx-auto pt-2">
                        <h6 className="text-center">Activity Log</h6>
                        <table className="table table-sm table-striped table-borderless">
                            <tbody>
                            <tr>
                                <td>Details</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
