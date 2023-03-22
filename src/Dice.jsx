const Dice = (props) => {
  return (
    <div
      className={props.isHeld ? "dice held" : "dice"}
      onClick={props.handleClick}
    >
      {props.value}
    </div>
  );
};

export default Dice;
