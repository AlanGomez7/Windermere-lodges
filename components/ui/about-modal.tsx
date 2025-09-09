import { X } from "lucide-react";
import { useState } from "react";

export default function AboutModal({
  setShowDialog,
  about,
  showDialog,
}: {
  setShowDialog: (value: boolean) => void;
  about: string;
  showDialog: boolean;
}) {
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className="bg-white rounded-2xl justify-center shadow-2xl pl-14 pr-8 py-10 w-1/2 max-w-2xl relative overflow-y-auto max-h-full  border border-gray-200"
            style={{ scrollbarGutter: "stable" }}
          >
            <button
              type="button"
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>
            {about}
          </div>

        </div>
      )}
    </>
  );
}
