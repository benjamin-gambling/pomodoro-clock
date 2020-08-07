import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "session",
      status: "stopped",
      session: 25,
      break: 5,
      sessionTimer: 1500,
      breakTimer: 300,
      count: 1,
      darkmode: false,
    };
    this.timerID = null;
    this.audio = new Audio("https://onlineclock.net/audio/options/default.mp3");
    this.adjustTime = this.adjustTime.bind(this);
    this.startStop = this.startStop.bind(this);
    this.clockify = this.clockify.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.nightmode = this.nightmode.bind(this);
    //Not Passed Down
    this.countdown = this.countdown.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.determineTheme = this.determineTheme.bind(this);
  }

  adjustTime(mode, change) {
    let newTime = this.state[mode] + parseInt(change);
    if (newTime > 0 && newTime < 61) {
      this.setState({
        [mode]: newTime,
        [`${mode}Timer`]: this.state[`${mode}Timer`] + 60 * change,
      });
    }
  }

  startStop() {
    if (this.state.status === "stopped") {
      this.timerID = setInterval(() => {
        this.countdown();
      }, 1000);
      this.setState({ status: "playing" }, this.determineTheme);
    } else {
      clearInterval(this.timerID);
      this.setState({ status: "stopped" }, this.determineTheme);
    }
  }

  countdown() {
    let mode = this.state.label;
    let timer = this.state[`${mode}Timer`] - 1;
    this.setState({ [`${mode}Timer`]: timer });
    if (timer === 0) {
      this.audio.play();
    }
    if (timer < 0) {
      this.state.label === "session"
        ? this.setState(
            {
              label: "break",
              [`${mode}Timer`]: this.state[mode] * 60,
            },
            this.determineTheme
          )
        : this.setState(
            {
              label: "session",
              [`${mode}Timer`]: this.state[mode] * 60,
              count: this.state.count + 1,
              breakTimer:
                this.state.count % 4 === 0
                  ? this.state.break * 120
                  : this.state.break * 60,
            },
            this.determineTheme
          );
    }
  }

  clockify(mode) {
    let mins = Math.floor(this.state[`${mode}Timer`] / 60);
    let secs = this.state[`${mode}Timer`] - mins * 60;
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    return mins + ":" + secs;
  }

  resetTimer() {
    this.setState({
      label: "session",
      status: "stopped",
      session: 25,
      break: 5,
      sessionTimer: 1500,
      breakTimer: 300,
      count: 0,
    });
    clearInterval(this.timerID);
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  determineTheme() {
    let theme = "";
    this.state.status === "stopped"
      ? (theme = "paused")
      : this.state.label === "session"
      ? (theme = "work")
      : (theme = "break");
    if (this.state.darkmode === true) theme = `dark${theme}`;
    this.changeTheme(theme);
  }

  changeTheme(theme) {
    document.documentElement.className = "";
    document.documentElement.classList.add(`theme-${theme}`);
  }

  nightmode() {
    this.setState(
      {
        darkmode: !this.state.darkmode,
      },
      this.determineTheme
    );
  }

  render() {
    return (
      <div className="clock">
        <Display label={this.state.label} clockify={this.clockify} />
        <Settings
          label={this.state.label}
          session={this.state.session}
          break={this.state.break}
          adjustTime={this.adjustTime}
        />
        <Controls
          status={this.state.status}
          darkmode={this.state.darkmode}
          startStop={this.startStop}
          resetTimer={this.resetTimer}
          nightmode={this.nightmode}
        />
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    let mode = this.props.label;
    return (
      <div className="display">
        <h3 className="timer-label">{mode}</h3>
        <div className="countdown">{this.props.clockify(mode)}</div>
      </div>
    );
  }
}

const Timers = (props) => {
  return (
    <div>
      <h3>{props.mode}</h3>
      <div className="time-adjust">
        <button onClick={() => props.adjustTime(props.mode, "-1")}>
          <i className="fa fa-minus"></i>
        </button>
        <h3>{props.time}</h3>
        <button onClick={() => props.adjustTime(props.mode, "1")}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <Timers
          mode="session"
          time={this.props.session}
          adjustTime={this.props.adjustTime}
        />
        <Timers
          mode="break"
          time={this.props.break}
          adjustTime={this.props.adjustTime}
        />
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    const button =
      this.props.status === "stopped" ? (
        <i className="fa fa-play" />
      ) : (
        <i className="fa fa-pause" />
      );
    return (
      <div className="controls">
        <button onClick={() => this.props.startStop()}>{button}</button>
        <button id="refresh" onClick={() => this.props.startStop()}>
          <i className="fa fa-refresh" />
        </button>
        <button id="nightmode" onClick={() => this.props.nightmode()}>
          {this.props.darkmode ? (
            <i className="fa fa-sun-o"></i>
          ) : (
            <i className="fa fa-moon-o"></i>
          )}
        </button>
      </div>
    );
  }
}

export default Clock;
