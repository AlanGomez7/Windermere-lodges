import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AboutModal({
  setShowDialog,
  about,
  showDialog,
}: {
  setShowDialog: (value: boolean) => void;
  about: string;
  showDialog: boolean;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showDialog) {
      // Animate in
      gsap.fromTo(
        sheetRef.current,
        { y: "100%" },
        { y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Animate out
      gsap.to(sheetRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showDialog]);

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-6">
          <div
            ref={sheetRef}
            className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl border border-gray-200
          w-full max-h-[90vh] sm:max-h-fit p-6
          sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
          flex flex-col
        "
            style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <p className="py-4 text-xl">About</p>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-2">
              <div className="pt-6">{about}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
