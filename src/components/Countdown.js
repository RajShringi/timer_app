import React from "react";
import { BiChevronsUp, BiChevronsDown } from "react-icons/bi";
import Button from "./Button";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "00",
      min: "00",
      sec: "00",
      isClockRunning: false,
    };
    this.timer = null;
    this.resetHour = "00";
    this.resetMin = "00";
    this.resetSec = "00";
  }

  componentWillUnmount() {
    this.stopCountdown();
  }

  increaseTime = ({ target }) => {
    const name = target.name;
    let obj = {};
    this.setState((prevState) => {
      let time = Number(prevState[name]) + 1;
      if (name === "min" && time > 59) {
        // if min is greater than 59 add 1 to hour so 00:60:00 -> 01:00:00
        time = "00";
        obj[name] = time;
        obj["hour"] = Number(prevState.hour) + 1;
        obj["hour"] = obj["hour"] < 10 ? `0${obj["hour"]}` : obj["hour"];
      } else if (name === "sec" && time > 59) {
        // if sec is greater than 59 add 1 to min so 00:60 -> 01:00
        time = "00";
        obj[name] = time;
        obj["min"] = Number(prevState.min) + 1;
        obj["min"] = obj["min"] < 10 ? `0${obj["min"]}` : obj["min"];
      } else {
        time = time < 10 ? `0${time}` : time;
        obj[name] = time;
      }

      return obj;
    });
  };

  decreaseTime = ({ target }) => {
    const name = target.name;
    let obj = {};
    this.setState((prevState) => {
      const { hour, min, sec } = prevState;
      let time = Number(prevState[name]) - 1;
      time = time < 0 ? 0 : time;
      if (name === "min" && min <= 0 && hour > 0) {
        obj[name] = 59;
        obj["hour"] = Number(hour) - 1;
        obj["hour"] = obj["hour"] < 10 ? `0${obj["hour"]}` : obj["hour"];
      } else if (name === "sec" && sec <= 0 && min > 0) {
        obj[name] = 59;
        obj["min"] = Number(min) - 1;
        obj["min"] = obj["min"] < 10 ? `0${obj["min"]}` : obj["min"];
      } else {
        time = time < 10 ? `0${time}` : time;
        obj[name] = time;
      }
      return obj;
    });
  };

  startCountdown = () => {
    const { hour, min, sec } = this.state;
    this.resetHour = hour;
    this.resetMin = min;
    this.resetSec = sec;
    this.countdown();
    this.timer = setInterval(this.countdown, 1000);
  };

  stopCountdown = () => {
    clearInterval(this.timer);
    this.setState({
      isClockRunning: false,
    });
  };

  resetCountdown = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      hour: this.resetHour,
      min: this.resetMin,
      sec: this.resetSec,
      isClockRunning: false,
    });
  };

  countdown = () => {
    console.log("called");
    this.setState((prevState) => {
      let { hour, min, sec } = prevState;

      if (hour === "00" && min === "00" && sec === "00") {
        clearInterval(this.timer);
        alert("times up");
        return {
          isClockRunning: false,
        };
      } else {
        if (min > 0 && sec <= 0) {
          sec = 59;
          min = min - 1 < 0 ? 0 : min - 1;
          min = min < 10 ? `0${min}` : min;
        } else if (hour > 0 && min <= 0 && sec <= 0) {
          min = 59;
          sec = 59;
          hour = hour - 1 < 0 ? 0 : hour - 1;
          hour = hour < 10 ? `0${hour}` : hour;
        } else {
          sec = Number(sec) - 1;
          sec = sec < 0 ? 0 : sec;
          sec = sec < 10 ? `0${sec}` : sec;
        }

        return {
          hour,
          min,
          sec,
          isClockRunning: true,
        };
      }
    });
  };

  render() {
    const { hour, min, sec, isClockRunning } = this.state;
    return (
      <div className="basis-[35%] bg-gray-900 border-2 border-white p-8 text-center rounded-lg relative">
        <h2 className="font-bold text-4xl">Countdown</h2>
        <div className="mb-4 py-2 text-center">
          <div className="text-lg flex justify-center items-center space-x-2">
            <span>Hours</span>
            <span>:</span>
            <span>Minutes</span>
            <span>:</span>
            <span>Secounds</span>
          </div>
          <div>
            <div className="text-2xl flex justify-between items-center  my-2">
              <button
                onClick={this.increaseTime}
                name="hour"
                disabled={isClockRunning}
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsUp className="pointer-events-none" />
              </button>
              <button
                onClick={this.increaseTime}
                name="min"
                disabled={isClockRunning}
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsUp className="pointer-events-none" />
              </button>
              <button
                onClick={this.increaseTime}
                name="sec"
                disabled={isClockRunning}
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsUp className="pointer-events-none" />
              </button>
            </div>
            <div className="text-2xl grid grid-cols-5 items-center">
              <span>{hour}</span>
              <span>:</span>
              <span>{min}</span>
              <span>:</span>
              <span>{sec}</span>
            </div>
            <div className="text-2xl flex justify-between items-center  my-2">
              <button
                onClick={this.decreaseTime}
                name="hour"
                disabled={isClockRunning}
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsDown className="pointer-events-none" />
              </button>
              <button
                onClick={this.decreaseTime}
                disabled={isClockRunning}
                name="min"
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsDown className="pointer-events-none" />
              </button>
              <button
                onClick={this.decreaseTime}
                disabled={isClockRunning}
                name="sec"
                className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
              >
                <BiChevronsDown className="pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {!this.timer && <Button name="Start" method={this.startCountdown} />}

          {this.timer && isClockRunning && (
            <Button name="Stop" method={this.stopCountdown} />
          )}

          {this.timer && !isClockRunning && (
            <div className="flex justify-center items-center space-x-8">
              {hour === "00" && min === "00" && sec === "00" ? (
                ""
              ) : (
                <Button name="Resume" method={this.startCountdown} />
              )}

              <Button name="Reset" method={this.resetCountdown} />
            </div>
          )}
        </div>
        <button
          onClick={this.props.toggleShowCountdown}
          className="text-white absolute top-[-6%] right-[-3%]  text-xl bg-zinc-600 w-[35px] h-[35px] rounded-full"
        >
          X
        </button>
      </div>
    );
  }
}
export default Countdown;
