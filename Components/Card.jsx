import Image from 'next/image';
import LeaveButton from './LeaveButton';

const Card = ({ name, imageSrc }) => {
  return (
    <div
      className="relative w-96 h-48 rounded-3xl overflow-hidden shadow-lg mx-4 my-4 flex items-center"
      style={{ backgroundColor: '#141B2B' }} // Light blue color
    >
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-2">
        <div>
          <p className="font-bold text-lg mb-1 text-white">{name}</p>
        </div>
        <div>
          <LeaveButton className="p-1" />
        </div>
      </div>
    </div>
  );
};

export default Card;
