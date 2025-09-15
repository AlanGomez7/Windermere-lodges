import { X } from "lucide-react";

export default function ListingModal({
  setShowDialog,
  value,
  showDialog,
}: {
  setShowDialog: (value: boolean) => void;
  value: any;
  showDialog: boolean;
}) {
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6">
          <div
            className="bg-white rounded-2xl shadow-2xl relative border border-gray-200
    w-full max-w-md h-auto max-h-[90vh] p-6
    sm:max-w-2xl sm:p-10 flex flex-col"
            style={{ scrollbarGutter: "stable" }}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable content area */}
            <div className="overflow-y-auto max-h-[70vh] pr-2">
              {value.map((v: any, i: number) => (
                <div className="pt-5" key={i}>
                  <p className="mb-5 text-2xl font-semibold">{v.title}</p>
                  {v.data.map((d: any, j: number) => (
                    <div key={j}>
                      <li className="p-4 sm:p-6">{d}</li>
                      <hr />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
