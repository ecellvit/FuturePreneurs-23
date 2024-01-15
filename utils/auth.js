import connectMongoDB from "@/libs/mongodb";
import { Users } from "@/models/user";
import { jwtVerify } from "jose";


export default async function getTokenDetails (session) {

  connectMongoDB()

  const token = session.accessTokenBackend;
  console.log('token', token)

    try {
      const tokenDetails = await jwtVerify(token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      )

      const userId = tokenDetails.payload._id
      const user = await Users.findOne({"_id": userId})
      if(user.teamRole != '0'){
        throw new Error("Not allowed bro");
      }
      return user.teamId

    } catch (err) {
      console.log(err);
      throw new Error("Kuch Error hogya bro");
    }
  };
