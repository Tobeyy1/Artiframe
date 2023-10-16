import { NextResponse } from "next/server";
import { hashPassword } from "@/app/helpers/auth";
import { connectToDatabase } from "@/app/helpers/db";

export async function POST(request: Request, response: Response) {
  try {
    const { email, password } = await request.json();
    console.log("From the Register Backend", {
      email,
      password,
    });

    const hashedPassword = await hashPassword(password);

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({
      email: email,
    });

    if (existingUser) {
      client.close();

      return NextResponse.json({
        message: "User already exists",
        status: 422,
      });
    }

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      subscription: "free",
    });

    client.close();
    return NextResponse.json({
      status: 201,
      message: "Registration Complete! Please Log In!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong!!",
    });
  }
}
