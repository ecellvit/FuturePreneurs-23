import Waiting from '@/Components/levels/Waiting';
import Game from '@/Components/levels/level0/game';
import Instructions from '@/Components/levels/level0/instruction';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Level0() {
  const { data: session, status } = useSession();

  const [curPage, setCurPage] = useState(-1);

  const [set, setset] = useState();
  const router = useRouter();

  useEffect(() => {
    // fetch /api/level0
    if (router.isReady) {
      if (status === 'unauthenticated') {
        router.push('/');
      } else if (status === 'authenticated') {
        getLevel0Data();
        checkCurrentLevel0();
      }
    }
  }, [status, router]);

  const checkCurrentLevel0 = () => {
    fetch('/api/levels/checkCurrentRound', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (data.round.level !== 0) {
            router.push(`/levels/level${data.round.level}`);
          }
        });
      } else {
        console.log('error');
      }
    });
  };

  const getLevel0Data = () => {
    // get question number & end Time from backend
    fetch('/api/levels/level0/getData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setCurPage(data.team.pageNo);
          setset(data.set);
        });
      } else {
        console.log('error');
      }
    });
  };

  return (
    <div>
      {curPage === -1 && (
        <Waiting text={'Please Wait for Level 1 to start'} />
      )}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Instructions />}
      {curPage === 1 && <Game set={set} />}
      {curPage === 2 && (
        <Waiting next={'1'} text={'Level 1 Submitted'} />
      )}
    </div>
  );
}
