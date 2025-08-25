import { NextResponse } from "next/server";
import { doSomething } from "../../action";

export const POST = async (request: Request) => {
  const { id } = await request.json();
  const result = await doSomething(id);
  return NextResponse.json(result);
};
