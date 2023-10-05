import { useRouter } from "next/router"

function joinTeam() {
  console.log("joining team here")

  // get the entered code form user
  const code = "qj4j56h6j";
  fetch('http://localhost:3000/api/joinTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamCode: code,
    })
  }).then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
}

export default function Abc() {
  const router = useRouter()

  return (
    <div>
      asdf -{router.query.teamCode}

      <div>
        <input id="teamCode">
        </input>
        <button onClick={() => { joinTeam() }}>Join Team</button>
      </div>
    </div>
  )
}