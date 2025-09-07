import { auth } from "@/auth";
import MyAccount from "@/components/my-account";

export default async function MyAccountPage() {
  const session = await auth();
  return <MyAccount user={session?.user} />;
}
