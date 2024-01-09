
const LeaveButton = ({onClick}) => {
  return (
    <button 
      onClick={onClick}
      className="bg-red-500 text-white px-3 py-1 rounded-full">
      Leave
    </button>
  );
};

export default LeaveButton;
