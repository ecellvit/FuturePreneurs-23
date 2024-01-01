import React from "react";

const RegisterButton = (props) => {
  return (
    <button className="rounded-full py-1 px-1 bg-gradient-to-br from-cyan-600 via-green-400 to-purple-600 font-semibold">
      <div className="py-2 px-4 rounded-full bg-black">{props.text}</div>
    </button>
  );
};

export default RegisterButton;
