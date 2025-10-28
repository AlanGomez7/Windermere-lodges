"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function CookieModal() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // 🔹 Check localStorage before showing modal
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShowDialog(true);
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
      gsap.to(sheetRef.current, { y: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [showDialog]);

  // 🔹 Actions
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

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent", JSON.stringify(preferences));
    setShowDialog(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
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
              bg-white rounded-2xl shadow-2xl border border-gray-200
              w-full max-h-[90vh] sm:max-h-fit p-6
              sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
              flex flex-col relative
            "
            style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                We value your privacy 🍪
              </h2>
              {/* <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>

            {/* Description */}
            {!showCustomize ? (
              <>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We use cookies to enhance your browsing experience, serve personalized
                  content, and analyze our traffic. You can allow all cookies or manage your preferences.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-auto">
                  <button
                    onClick={handleNecessaryOnly}
                    className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm font-medium transition"
                  >
                    Allow Necessary Only
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm font-medium transition"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAllowAll}
                    className="w-full sm:w-auto rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2 text-sm font-medium transition"
                  >
                    Allow All
                  </button>
                </div>

                {/* Customize link */}
                <p className="text-sm text-gray-500 mt-5 text-center">
                  <button
                    className="text-emerald-600 hover:underline"
                    onClick={() => setShowCustomize(true)}
                  >
                    Customize preferences
                  </button>
                </p>
              </>
            ) : (
              <>
                {/* Customization Section */}
                <p className="text-gray-600 leading-relaxed mb-4">
                  Choose which types of cookies you want to accept. You can change this anytime.
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { key: "analytics", label: "Analytics cookies", desc: "Help us understand how visitors interact with our website." },
                    { key: "marketing", label: "Marketing cookies", desc: "Used to deliver personalized ads and measure their effectiveness." },
                    { key: "preferences", label: "Preference cookies", desc: "Remember your choices such as language or theme." },
                  ].map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[key as keyof typeof preferences]}
                          onChange={() => togglePreference(key as keyof typeof preferences)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-emerald-600 transition-all after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  ))}
                </div>

                {/* Save / Back buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm font-medium transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2 text-sm font-medium transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
