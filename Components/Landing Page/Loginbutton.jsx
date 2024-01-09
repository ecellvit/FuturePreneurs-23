import { signIn, signOut, useSession } from 'next-auth/react';
import { IoIosContact } from "react-icons/io";
export default function LoginButton(){
  const { data: session } = useSession();
    return(
        <div>
        
        {session ? (
            <div>
              <button className="flex flex-row justify-evenly items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 md:px-3 md:py-1.5"
                onClick={() => {
                  signOut();
                }}>
                <IoIosContact />
                <span>Log Out</span>
              </button>{' '}
            </div>
          ) : (
            <button className="flex flex-row justify-evenly items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              onClick={() => {

                signIn('google', { callbackUrl: '/' });
              }}>
              <IoIosContact />
              <span>Log In</span>
            </button>
          )}
          </div>
    )
}