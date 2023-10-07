import styles from "../styles/teamCode.module.css";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import Alert from "@/Components/Alert/Alert";

export default function TeamCode() {
  const [teamName, setTeamName] = useState("Team Futurepreneur"); // To store the team name
  const [teamCode, setTeamCode] = useState("abc123"); //To store the team code recieved from the backend
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(""); //Store the alert text to be displayed

  return (
    <main>
      {showAlert && <Alert name={alertText} />}
      <div className={styles.container}>
        <h1 className={styles.teamName}>{teamName}</h1>
        <div className={styles.teamDetails}>
          <div className={styles.teamCodeDiv}>
            <h6>
              <span className={styles.bold}>{`Team Code :`}</span><span>{` ${teamCode}`}</span>
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
            </h6>
          </div>
          <div className={styles.teamCodeDiv}>
            <h6>
              <span className={styles.bold}>{`Team Code URL :`}</span><span>{` www.futurepreneurs.ecell/${teamCode}`}</span>
              <div className={styles.icon}>
              <FiCopy
                onClick={() => {
                  navigator.clipboard.writeText(`www.futurepreneurs.ecell/${teamCode}`); // Just a sample URL
                  setAlertText("Team URL copied !!");
                  setShowAlert((prev) => !prev);
                  setTimeout(() => {
                    setShowAlert((prev) => !prev);
                  }, 3000);
                }}
              />
              </div>
            </h6>
          </div>
        </div>
      </div>
    </main>
  );
}
