import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/helpers/db";
import { getSession } from "next-auth/react";

export async function POST(request: Request, response: Response) {
  try {
    const { email, subscription } = await request.json();

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");

    try {
      const result = await usersCollection.updateOne(
        {
          email: email,
        },
        {
          $set: {
            subscription: subscription,
            date: new Date().toISOString().slice(0, 10),
          },
        }
      );
      // const data = await result.json();
      console.log(result);
    } catch (error) {
      client.close();

      return error;
    }

    client.close();
    return NextResponse.json({
      status: 201,
      message: "Subscription successfully updated",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
