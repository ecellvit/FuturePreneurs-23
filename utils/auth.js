import connectMongoDB from '@/libs/mongodb';
import { Users } from '@/models/user';
import { jwtVerify } from 'jose';
import mongoose from 'mongoose';

export default async function getTokenDetails(token) {
  try {
    connectMongoDB();

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );

    const userId = tokenDetails.payload._id;

    const user = await Users.findById(userId);

    if (user.teamRole != '0') {
      throw new Error('Not allowed bro');
    }

    return user.teamId.toString();

  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}
