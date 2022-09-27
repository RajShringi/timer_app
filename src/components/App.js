import React from "react";
import Countdown from "./Countdown";
import Stopwatch from "./StopWatch";
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showStopwatch: false,
      showCountdown: false,
    };
  }
  toggleShowStopwatch = () => {
    this.setState((prevState) => {
      return {
        showStopwatch: !prevState.showStopwatch,
      };
    });
  };
  toggleShowCountdown = () => {
    this.setState((prevState) => {
      return {
        showCountdown: !prevState.showCountdown,
      };
    });
  };
  render() {
    return (
      <div className="text-white h-screen bg-zinc-800 overflow-y-auto">
        <div className="container mx-auto">
          <header className="text-center text-5xl py-6">
            <h1>🚀 Timers 🚀</h1>
          </header>
          <main>
            <div>
              <div className="flex justify-center items-center space-x-4 mb-6">
                {!this.state.showStopwatch && (
                  <button
                    onClick={this.toggleShowStopwatch}
                    className="bg-gray-800 rounded-lg p-2 hover:bg-gray-900"
                  >
                    Show Stopwatch
                  </button>
                )}
                {!this.state.showCountdown && (
                  <button
                    onClick={this.toggleShowCountdown}
                    className="bg-gray-800 rounded-lg p-2 hover:bg-gray-900"
                  >
                    Show Countdown
                  </button>
                )}
              </div>
              <div className="flex justify-center items-center space-x-4">
                {/* stopwatch */}
                {this.state.showStopwatch && (
                  <Stopwatch toggleShowStopwatch={this.toggleShowStopwatch} />
                )}
                {/* Countdown */}
                {this.state.showCountdown && (
                  <Countdown toggleShowCountdown={this.toggleShowCountdown} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
