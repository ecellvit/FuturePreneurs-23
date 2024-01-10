import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingIcons from "react-loading-icons";

const RegisterButton = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className=" rounded-full py-1 px-1 bg-gradient-to-br from-cyan-600 via-green-400 to-purple-600 font-semibold w-42"
      onClick={() => {
        setIsLoading(true);
        if (status == "authenticated") {
          fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
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
              const user = data.user;
              if (user.hasFilledDetails == true) {
                if (user.teamId !== null) {
                  const redirect =
                    user.teamRole == "1"
                      ? "/memberDashboard"
                      : "/leaderDashboard";
                  router.push(redirect);
                } else {
                  router.push("/makeTeam");
                }
              }
              // console.log('user', user)
              else {
                router.push("/userDetails");
              }
            });
        } else {
          signIn("google", { callbackUrl: "/" });
        }
      }}
    >
      <div className="py-2 px-4 rounded-full bg-black">
        {isLoading ? <LoadingIcons.Oval height={"20px"}/> : (status == "authenticated" ? "Get Started" : "Register")}
      </div>
    </button>
  );
};

export default RegisterButton;
