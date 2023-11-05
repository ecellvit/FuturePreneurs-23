import styles from "../styles/teamCode.module.css";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import Alert from "@/components/Alert/Alert";

export default function TeamCode() {
  const [teamName, setTeamName] = useState("Team Futurepreneur"); // To store the team name
  const [teamCode, setTeamCode] = useState("abc123"); //To store the team code recieved from the backend
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(""); //Store the alert text to be displayed

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
