import GameTimer from "./GameTimer";

const Navbar = (props) => {
    const levelNames = {
        "level0":"Round 1",
        "level1":"Round 2",
        "level2":"Round 3",
        "level3":"Round 4",
        "level4":"Round 5"
    }
  return (
    <main>
      <nav className="flex justify-around h-16 items-center w-full bg-[#555]">
        <div className="left flex w-1/3 justify-around">
          <div className="logo">logo</div>
          <div className="newspaper">newspaper</div>
        </div>
        <div className="mid w-1/3 flex justify-center">{levelNames[props.level]}</div>
        <div className="right w-1/3 flex justify-center">right</div>
      </nav>
      <div className="flex w-full justify-center">
      <div
        style={{
          borderBottom: "50px solid #555",
          borderLeft: "25px solid transparent",
          borderRight: " 25px solid transparent",
          height: "0px",
          width: "250px",
          rotate:"180deg"
        }}
      >
        <div className="rotate-180">
        <GameTimer level={"level0"} />
        </div>
      </div>
      </div>
    </main>
  );
};

export default Navbar;
