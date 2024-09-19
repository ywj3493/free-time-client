import { auth } from "@/auth";
import FreeTime from "@/components/free-time/FreeTime";
import { redirect } from "next/navigation";

export default async function FreeTimePage({
  params,
}: {
  params: { userId: string };
}) {
  const userId = params.userId;

  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return <FreeTime userId={userId} />;
}
