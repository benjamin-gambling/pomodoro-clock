import React from "react";

function Info(props) {
  return (
    <div className="info">
      <button className="close" onClick={props.toggleInfo}>
        <i className="fa fa-times"></i>
      </button>
      <br />
      <br />
      <br />
      <b>1 Pomodoro</b> = A time unit to maximise productivity
      <br />
      <br />
      The <b>Pomodoro Technique</b> is a time management method developed by
      Francesco Cirillo in the late 1980s. The technique uses a timer to break
      down work into intervals, traditionally 25 minutes in length, separated by
      short breaks. Each interval is known as a pomodoro, from the Italian word
      for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a
      university student.
      <br />
      <br />
      <u>
        <b>How this works:</b>
      </u>
      <ol>
        <li>Decide on the task to be done.</li>
        <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
        <li>
          Work on the task until the timer rings, take a short break (3–5
          minutes)
        </li>
        <li>
          When the timer rings again, continue with the task for another
          Pomodoro
        </li>
        <li>
          After 4 Pomodoros take a longer break (twice the of the shorter
          breaks)
        </li>
        <li>Then the process wil start again until the task is complete</li>
      </ol>
    </div>
  );
}

function RemoveInfoHelp(props) {
  if (props.showInfoHelp) {
    return (
      <p className="infoP">
        What am i? Press <i className="fa fa-info-circle"></i> to find out!
      </p>
    );
  } else return null;
}

function ShowInfo(props) {
  if (props.hidden) {
    return null;
  } else {
    return <Info toggleInfo={props.toggleInfo} />;
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      showInfoHelp: true,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.state.hidden
      ? this.setState({ hidden: false })
      : this.setState({ hidden: true });
    this.setState({ showInfoHelp: false });
  }

  render() {
    return (
      <div>
        <h1>
          POMODORO CLOCK{" "}
          <button onClick={this.toggleInfo}>
            <i className="fa fa-info-circle"></i>
          </button>
        </h1>
        <RemoveInfoHelp showInfoHelp={this.state.showInfoHelp} />
        <ShowInfo hidden={this.state.hidden} toggleInfo={this.toggleInfo} />
      </div>
    );
  }
}

export default Title;
