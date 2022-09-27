import React from "react";
import Button from "./Button";
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "00",
      min: "00",
      sec: "00",
      centiSec: "00",
      isStop: true,
    };
    this.timer = null;
  }

  componentWillUnmount() {
    console.log("component will unmount");
    this.stopStopwatch();
  }

  stopStopwatch = () => {
    clearInterval(this.timer);
    console.log(this.timer);
    this.setState({
      isStop: true,
    });
  };

  startStopWatch = () => {
    this.stopwatch();
    console.log("called one");
    this.timer = setInterval(this.stopwatch, 10);
  };

  stopwatch = () => {
    console.log("called");
    this.setState((prevState) => {
      let { hour, min, sec, centiSec } = prevState;

      if (centiSec > 99) {
        centiSec = "00";
        sec = Number(sec) + 1;
        sec = sec < 10 ? `0${sec}` : sec;
      } else if (sec > 59) {
        sec = "00";
        min = Number(min) + 1;
        min = min < 10 ? `0${min}` : min;
      } else if (min > 59) {
        min = "00";
        hour = Number(hour) + 1;
        hour = hour < 10 ? `0${hour}` : hour;
      } else {
        centiSec = Number(centiSec) + 1;
        centiSec = centiSec < 10 ? `0${centiSec}` : centiSec;
      }
      return {
        centiSec,
        sec,
        min,
        hour,
        isStop: false,
      };
    });
  };

  resetStopwatch = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      hour: "00",
      min: "00",
      sec: "00",
      centiSec: "00",
      isStop: true,
    });
  };

  render() {
    const { hour, min, sec, centiSec, isStop } = this.state;
    return (
      <div className="self-stretch basis-[35%] bg-gray-900 border-2 border-white p-8 text-center rounded-lg relative">
        <h2 className="font-bold text-4xl mb-4">Stopwatch</h2>
        <div className="text-3xl my-6 grid grid-cols-7">
          <p>{hour}</p>
          <p>:</p>
          <p>{min}</p>
          <p>:</p>
          <p>{sec}</p>
          <p>:</p>
          <p>{centiSec}</p>
        </div>
        <div>
          {!this.timer && <Button name="Start" method={this.startStopWatch} />}

          {this.timer && isStop && (
            <div className="flex justify-center items-center space-x-8">
              <Button name="Resume" method={this.startStopWatch} />
              <Button name="Reset" method={this.resetStopwatch} />
            </div>
          )}

          {this.timer && !isStop && (
            <Button name="Stop" method={this.stopStopwatch} />
          )}
        </div>
        <button
          onClick={this.props.toggleShowStopwatch}
          className="text-white absolute top-[-6%] right-[-3%]  text-xl bg-zinc-600 w-[35px] h-[35px] rounded-full"
        >
          X
        </button>
      </div>
    );
  }
}
export default Stopwatch;
