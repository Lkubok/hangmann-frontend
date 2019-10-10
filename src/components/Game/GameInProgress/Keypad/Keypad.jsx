import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import { connect } from "react-redux";
import { pressLetter } from "../../../../actions/gameActions";
import "react-simple-keyboard/build/css/index.css";
import * as selectors from "../../../../reducers/selectors";
import "./Keypad.scss";
import _ from "lodash";

class Keypad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typed: [],
      guessed: []
    };
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }
  onKeypadPress = button => {
    const { typed } = this.props;
    if (!typed.includes(button)) this.sendValue(button);
  };
  handleKeyPress = e => {
    const { typed } = this.props;
    if (!typed.includes(e.key)) this.sendValue(e.key);
  };
  sendValue = value => {
    const { pressLetter, gameId } = this.props;
    pressLetter(value, gameId);
  };

  listTypedButtons = () => {
    return this.props.typed.join(" ");
  };

  render() {
    const badButtonsArray = _.difference(this.props.typed, this.props.guessed);
    const { guessed, typed } = this.props;
    const letters = "q w e r t y u i o p a s d f g h j k l z x c v b n m";
    const arrayLetters = letters.split(" ");
    const untypedLetters = _.without(arrayLetters, ...typed.join(", "));

    return (
      <div className="keyboard" key={`${this.props.typed.join("-")}`}>
        <Keyboard
          onKeyPress={this.onKeypadPress}
          layout={{
            default: [
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "z x c v b n m"
            ]
          }}
          buttonTheme={[
            {
              class: "key-button key-button-typed-bad",
              buttons: `${badButtonsArray.join(" ")}`
            },
            {
              class: "key-button key-button-typed-good",
              buttons: `${guessed.join(" ")}`
            },

            {
              class: "key-button key-button-untyped",
              buttons: `${untypedLetters.join(" ")}`
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: selectors.getGameId(state),
  typed: selectors.getTypedLetters(state),
  guessed: selectors.getGuessedLetters(state)
});
const mapDispatchToProps = {
  pressLetter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keypad);
