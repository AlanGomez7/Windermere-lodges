"use client";
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CookieModal() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);

  // 🔹 Check localStorage before showing modal
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowDialog(true);
    }
  }, []);

  // 🔹 Animate open/close
  useEffect(() => {
    if (showDialog) {
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

  // 🔹 Handle actions
  const handleAllowAll = () => {
    localStorage.setItem("cookie_consent", "accepted_all");
    setShowDialog(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookie_consent", "rejected_all");
    setShowDialog(false);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("cookie_consent", "necessary_only");
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
        >
          <div
            ref={sheetRef}
            className="
              fixed bottom-0 left-0 right-0 z-50
              bg-white rounded-t-2xl shadow-2xl border border-gray-200
              w-full max-h-[90vh] sm:max-h-fit p-6
              sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
              flex flex-col
              relative
            "
            style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                We value your privacy 🍪
              </h2>
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. You can choose to
              allow all cookies or manage your preferences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-auto">
              <button
                type="button"
                className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm font-medium transition"
                onClick={handleNecessaryOnly}
              >
                Allow Necessary Only
              </button>
              <button
                type="button"
                className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm font-medium transition"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className="w-full sm:w-auto rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2 text-sm font-medium transition"
                onClick={handleAllowAll}
              >
                Allow All
              </button>
            </div>

            {/* Footer / Link */}
            <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
              <a
                href="#"
                className="hover:underline hover:text-emerald-600 transition"
              >
                Learn more about our Cookie Policy
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
