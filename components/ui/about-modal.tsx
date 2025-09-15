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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-6">
          <div
            className="
      bg-white rounded-2xl shadow-2xl relative border border-gray-200
      w-full max-w-lg h-auto max-h-[90vh] overflow-y-auto
      p-5 sm:p-8 md:p-10
    "
            style={{ scrollbarGutter: "stable" }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="pt-6">{about}</div>
          </div>
        </div>
      )}
    </>
  );
}
