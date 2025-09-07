import { auth } from "@/auth";
import MyAccount from "@/components/my-account";
import { checkUser } from "../queries/auth";

export default async function MyAccountPage() {
  const session = await auth();

  const user = await checkUser({email:session?.user?.email});
  return <MyAccount user={user} />;
}
