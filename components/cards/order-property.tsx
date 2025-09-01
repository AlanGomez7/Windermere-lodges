import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LodgeOrder() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <>
      <div className="flex py-5 justify-start px-5">
        <div className="flex flex-col rounded-lg bg-white text-surface w-full shadow-secondary-1 dark:bg-surface-dark dark:text-white h-[230px] md:max-w-2xl md:flex-row shadow-sm">
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg hidden md:block"
            src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium">Card title</h5>
            <p className="mb-4 text-base">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            {!isConfirmed && <div className="flex gap-4">
              <Button
                className="bg-emerald-400"
                onClick={() => setIsConfirmed(true)}
              >
                Confirm
              </Button>
              <Link href={"/our-lodges"}>
                <Button className="border border-emerald-400 bg-white text-emerald-400 hover:bg-emerald-50">
                  check others
                </Button>
              </Link>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
