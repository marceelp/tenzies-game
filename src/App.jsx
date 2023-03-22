import Confetti from "react-confetti";
import { useState } from "react";
import Dice from "./Dice";

export default function App() {
  const [diceRolls, setDiceRolls] = useState(
    Array.from({ length: 10 }, () => generateDice())
  );

  const diceMap = diceRolls.map((dice, index) => (
    <Dice
      key={index}
      value={dice.value}
      isHeld={dice.isHeld}
      handleClick={() => holdDice(index)}
    />
  ));

  function generateDice() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  }

  function roll() {
    setDiceRolls((prevDiceRolls) =>
      prevDiceRolls.map((dice) => (dice.isHeld ? dice : generateDice()))
    );
  }

  function holdDice(index) {
    setDiceRolls((prevDiceRolls) =>
      prevDiceRolls.map((dice, i) =>
        i === index ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  function restart() {
    setDiceRolls((prevDiceRolls) =>
      prevDiceRolls.map((dice) => generateDice())
    );
  }

  const win = diceRolls.every(
    (dice) => dice.isHeld && dice.value === diceRolls[0].value
  );

  return (
    <main>
      {win && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <section>{diceMap}</section>
      <button onClick={() => (win ? restart() : roll())}>
        {win ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
