import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {

  const {data : session} = useSession();
  console.log("session", session);

  return (
    <div className='m-10'>
      FuturePreneurs 2023
      <br />
      {session ? <div> Signed In <button onClick={() => { signOut() }}>Sign Out</button> </div> :
        <button onClick={() => { signIn('google') }}>Sign In with Google</button>
      }
    </div>
  )
}
