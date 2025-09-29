import { Button } from "./button";
import { Icons } from "../ui/icons";
import ListingModal from "./listings-modal";
import { useState } from "react";

const policyIconMap: Record<string, keyof typeof Icons> = {
  "House rules": "calendarClock",
  "Cancellation Policy": "ban",
  "Safety & Property": "wrench",
};

export default function KnowMore({ policy }: any) {
  const IconComponent = Icons[policyIconMap[policy.label]];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        key={policy.label}
        className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
      >
        <div className="flex items-start gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center">
            {IconComponent && (
              <IconComponent className="h-5 w-5" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{policy.label}</h3>
            {policy.showDetails ? (
              <p className="text-xs text-gray-600 my-3">{policy.value}</p>
            ) : (
              <p className="text-xs text-gray-600 my-3">
                Add your trip days for more details
              </p>
            )}
          </div>
        </div>
        {policy.showDetails && (
          <Button
            variant="link"
            className={`ml-6 text-emerald-700 hover:text-emerald-800 text-xs mt-auto self-start ${
              policy.showDetails ? "block" : "hidden"
            }`}
            onClick={() => setShowModal(true)}
          >
            View details
          </Button>
        )}
      </div>

      <ListingModal
        value={policy.data}
        setShowDialog={setShowModal}
        showDialog={showModal}
      />
    </>
  );
}
