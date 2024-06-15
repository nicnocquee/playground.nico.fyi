import { redirect } from "next/navigation";
import { authorize } from "../../basic-auth";
import { clearData, seedData } from "./action";

export const POST = async (request: Request) => {
  const resp = authorize();
  if (resp) {
    return resp;
  }

  const formData = await request.formData();
  const action = formData.get("action")?.toString() || "seed";

  if (action === "seed") {
    await seedData();
  } else {
    await clearData();
  }

  redirect("/suspense/with-prisma");
};
