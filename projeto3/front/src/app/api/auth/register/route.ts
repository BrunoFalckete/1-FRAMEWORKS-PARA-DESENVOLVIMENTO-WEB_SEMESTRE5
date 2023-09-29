import { NextRequest } from "next/server";
import { connectDB } from "../../../configs/dbConfig";

connectDB();

export async function POST(req: NextRequest){
  try {
    const {name, email, password} = await req.json();
  } catch (error) {}
}