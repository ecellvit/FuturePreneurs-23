import Image from "next/image";

const Card = ({ name, Role, regNo, leader, removeMember, imageSrc }) => {
  return (
    <div
      className="relative w-96 h-48 rounded-3xl overflow-hidden shadow-lg mx-4 my-4 flex items-center"
      style={{ backgroundColor: '#141B2B' }} // Light blue color
    >
      <div className="h-3/4 w-full flex justify-center">
        <Image src={imageSrc} className="h-full"/>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-2">
        <div className="">
          <p className="font-bold text-lg mb-1 text-white">{name}  [{regNo}] - {Role}</p>
        </div>

        {leader && 
          <div>
            {Role === 'Member' && 
            <button className="bg-red-500 text-white px-3 py-1 rounded-full" 
              onClick={()=>{removeMember()}}> Remove </button>
            }
          </div>
          
        }
      </div>
    </div>
  );
};

export default Card;
