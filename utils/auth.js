import { Users } from "@/models/user";
import { jwtVerify } from "jose";


export default async function getTokenDetails (session) {

  const token = session.accessTokenBackend;
  console.log('token', token)

    try {
      // const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const tokenDetails = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      )

      const userId = tokenDetails.payload._id
      console.log('aaaaaa', userId)
      const user = await Users.findOne({"_id": userId})
      console.log('sssssss', user)
      return user.teamId

    } catch (err) {
      console.log(err);
      throw new Error("Please SignOut and SignIn Again");
    }
  };
