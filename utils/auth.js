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

      console.log("==========",tokenDetails.payload._id)
      return tokenDetails.payload._id

    } catch (err) {
      console.log(err);
      throw new Error("Please SignOut and SignIn Again");
    }
  };
