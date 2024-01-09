import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const RegisterButton = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  

  return (
    <button className=" rounded-full py-1 px-1 bg-gradient-to-br from-cyan-600 via-green-400 to-purple-600 font-semibold"
    onClick={()=>{
      if(status == 'authenticated'){
        router.push('/userDetails')
      } else {
        signIn('google', { callbackUrl: '/' })
      }
    }}>
      <div className="py-2 px-4 rounded-full bg-black">{status=='authenticated'?'Get Started':'Register'}</div>
    </button>
  );
};

export default RegisterButton;
