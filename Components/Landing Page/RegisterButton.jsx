import React from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from 'next-auth/react';

const RegisterButton = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <button className=" rounded-full py-1 px-1 bg-gradient-to-br from-cyan-600 via-green-400 to-purple-600 font-semibold"
    onClick={()=>{
      if(session){
        router.push('/userDetails')
      }
      else{
        signIn('google', { callbackUrl: '/userDetails' });
      }
    }}>
      <div className="py-2 px-4 rounded-full bg-black">{props.text}</div>
    </button>
  );
};

export default RegisterButton;
