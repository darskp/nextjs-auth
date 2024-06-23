import { fetchUserAction } from "@/actions";
import Logout from "@/components/common/formElement/logout";
import { Button } from "@/components/ui/button";
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
      <Logout/>
    </div>

  );
}
