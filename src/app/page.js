import { fetchUserAction } from "@/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await fetchUserAction();

  if (!userData?.data && !userData?.data?.length) {
    redirect('/sign-in')
  }

  return (
    <div>
      <h2>
        {userData?.data?.email}
      </h2>
    </div>

  );
}
