class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0,
    };

    this.shotSound = new Audio("./assets/audio/shoot.mp3");
    this.scoreSound = new Audio("./assets/audio/score.mp3");
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.65) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 250);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };

  render() {
    let shotPercentageDiv;
    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />
        <div className="versus">
          <h1>VS.</h1>
        </div>
        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  );
}

function App(props) {
  const kodiaks = {
    name: "Anchorage Kodiaks",
    logoSrc: "./assets/images/kodiaks.jpg",
  };

  const pride = {
    name: "Phoenix Pride",
    logoSrc: "./assets/images/pride.jpg",
  };

  const wolfpack = {
    name: "Minneapolis Wolfpack",
    logoSrc: "./assets/images/wolfpack.jpg",
  };

  const kong = {
    name: "Indianapolis Kong",
    logoSrc: "./assets/images/kong.jpg",
  };

  return (
    <div className="App">
      <Game venue="Blackwater Arena" homeTeam={kodiaks} visitingTeam={pride} />
      <Game
        venue="877-CASH-NOW Stadium"
        homeTeam={kong}
        visitingTeam={wolfpack}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
