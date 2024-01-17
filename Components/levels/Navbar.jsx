import Image from 'next/image';
import GameTimer from './GameTimer';
import image from 'public/assets/levels/navbar/downloadNewspaper.svg';
import logo from 'public/assets/logos/FP LOGO.svg';


const Navbar = (props) => {

  const levelNames = {
    qualifier: 'Qualifier',
    level0: 'Round 1',
    level1: 'Round 2',
    level2: 'Round 3',
    level3: 'Round 4',
    level4: 'Round 5',
  };
  
  return (
    <main>
      <nav className="flex justify-around h-16 items-center w-full bg-[#050C17] border-b-2 border-white text-white">
        <div className="left flex w-1/3 justify-around items-center">
          <div className="logo">
            <Image src={logo} className="h-16 p-3" />
          </div>
          {/* <div className="newspaper hover:cursor-pointer">
            <Image src={image} className="h-full p-3" />
          </div> */}
        </div>
        <div className="mid w-1/3 flex justify-center text-2xl font-bold">
          {levelNames[props.level]}
        </div>
        <div className="right w-1/3 flex justify-center flex-col items-center">
          <div className="underline text-sm">Team Name:</div>
          <div className="text-lg font-bold">{props.teamName}</div>
        </div>
      </nav>
      <div className="flex w-full justify-center bg-[url('/assets/bg/spceBg.svg')] pb-4">
        <div
          style={{
            borderBottom: '65px solid #1e273d97 ',
            borderLeft: '25px solid transparent',
            borderRight: ' 25px solid transparent',
            height: '0px',
            width: '250px',
            rotate: '180deg',
          }}>
          <div className="rotate-180">
            <GameTimer
              sendData={props.sendData}
              level={props.level}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
