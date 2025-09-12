import { Button } from "./button";
import { Icons } from "../ui/icons";
import ListingModal from "./listings-modal";
import { useState } from "react";
const amenityIconMap: Record<string, string> = {
  "Lake Access": "/icons/water.png",
  Wifi: "/icons/wifi.png",
  "Shared Pool": "/icons/swim.png",
  "Washing Machine": "/icons/w_machine.png",
  "Hair Dryer": "/icons/dryer.png",
  Kitchen: "/icons/cook.png",
  TV: "/icons/tv.png",
};

const policyIconMap: Record<string, keyof typeof Icons> = {
  "House rules": "calendarClock",
  "Cancellation Policy": "ban",
  "Safety & Property": "wrench",
};

export default function KnowMore({ policy }: any) {
  const IconComponent = Icons[policyIconMap[policy.label]];
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div
        key={policy.label}
        className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center">
            {IconComponent && (
              <IconComponent className="h-6 w-6" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold">{policy.label}</h3>
            <p className="text-sm text-gray-600">{policy.value}</p>
            {/* <Button
              variant="link"
              className="p-0 mt-2 text-emerald-700 hover:text-emerald-800"
              onClick={()=>setShowModal(true)}
            >
              show more
            </Button> */}
          </div>
        </div>
      </div>

      <ListingModal value={policy.data} setShowDialog={setShowModal} showDialog={showModal}/>
    </>
  );
}
