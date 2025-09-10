import { X } from "lucide-react";

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
            className="
      bg-white rounded-2xl shadow-2xl relative overflow-y-auto border border-gray-200
      w-full h-full max-w-none m-0
      sm:w-1/2 sm:max-w-2xl sm:h-auto sm:pl-14 sm:pr-8 sm:py-10 sm:
    "
            style={{ scrollbarGutter: "stable" }}
          >
            <button
              type="button"
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="pt-5">{about}</div>
          </div>
        </div>
      )}
    </>
  );
}
