export const dynamic = "force-dynamic"; // defaults to auto

export const POST = async (request: Request) => {
  console.log("Job received");
  const body = await request.json();
  const name = body.name;
  const date = body.date;
  console.log(`Job received: ${name}, ${date}`);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Response("ok", {
    status: 200,
  });
};
