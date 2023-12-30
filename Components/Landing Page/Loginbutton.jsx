import React from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { IoIosContact } from "react-icons/io";
export default function LoginButton(){
  const { data: session } = useSession();
  console.log('session', session);
    return(
        <div>
        
        {session ? (
            <div>
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex-row justify-evenly"
                onClick={() => {
                  signOut();
                }}>
                <IoIosContact />
                Log Out
              </button>{' '}
            </div>
          ) : (
            <button className="flex-row justify-evenly text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              onClick={() => {
                signIn('google', { callbackUrl: '/userDetails' });
              }}>
              <IoIosContact />
              Log In
            </button>
          )}
          </div>
    )
}