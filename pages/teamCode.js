import styles from "../styles/teamCode.module.css";
import { FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import Alert from "@/components/Alert/Alert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function TeamCode() {
  const router = useRouter();
  const { data:session, status } = useSession();
  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") { //Checks if session is not ready and redirects to root.
        console.log("Please Login First!");
        router.push("/");
      }
      else if (status === "authenticated"){
        console.log(`Getting data`, status);
        getData();
      }
    }
  }, [status, router]);
  // console.log(session);

  const [teamName, setTeamName] = useState("Team Futurepreneur"); // To store the team name
  const [teamCode, setTeamCode] = useState("abc123"); //To store the team code recieved from the backend
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(""); //Store the alert text to be displayed

  const getData = () => {
    // console.log(process.env.NEXT_PUBLIC_SERVER);
    // console.log(session.accessTokenBackend);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/team/getTeamDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        // console.log("no team found");
        // console.log(err);
      });
  };
  return (
    <main className={styles.main}>
      {showAlert && <Alert name={alertText} />}
      <div className={styles.container}>
        <h1 className={styles.teamName}>{teamName}</h1>
        <div className={styles.teamDetails}>
          <div className={styles.teamCodeDiv}>
            <div className={styles.bold}>{`Team Code`}</div>
            <span>
              {` ${teamCode}`}
              <div className={styles.icon}>
                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(teamCode); //Copies the text to clipboard
                    setAlertText("Team Code copied !!");
                    setShowAlert((prev) => !prev);
                    setTimeout(() => {
                      setShowAlert((prev) => !prev);
                    }, 3000);
                  }}
                />
              </div>
            </span>
          </div>
          <div className={styles.teamCodeDiv}>
            <div className={styles.bold}>{`Team Code URL :`}</div>
            <span>
              {` https://www.futurepreneurs.ecell/joinTeam/${teamCode}`}
              <div className={styles.icon}>
                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.futurepreneurs.ecell/joinTeam/${teamCode}`
                    ); // Just a sample URL
                    setAlertText("Team URL copied !!");
                    setShowAlert((prev) => !prev);
                    setTimeout(() => {
                      setShowAlert((prev) => !prev);
                    }, 3000);
                  }}
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
