import { Button } from "./ui/button";
import { doLogout } from "@/app/actions/auth";

export default function () {

  return (
    <form action={doLogout}>
      <Button type="submit" className="w-full">Logout</Button>
    </form>
  );
}
