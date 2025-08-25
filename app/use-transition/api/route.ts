import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { id } = await request.json();
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, Math.floor(Math.random() * 10000));
  });
  return NextResponse.json({ id, status: 1 });
};
