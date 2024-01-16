import { Jwt } from "jsonwebtoken";

const auth = async (authHeader) => {
    // const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
    throw new Error("Access Denied: No token provided");
    }
  
    try {
      const tokenDetails = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //fetch user details from express server
      // const user = await fetch("", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).then((res) => res.json());
      
      // const user = await User.findById({ _id: tokenDetails._id });
      if (!user) {
        throw new Error("Please SignOut and SignIn Again");
      }
      req.user = tokenDetails;
      next();
    } catch (err) {
      console.log(err);
      throw new Error("Please SignOut and SignIn Again");
    }
  };
  
  module.exports = auth;