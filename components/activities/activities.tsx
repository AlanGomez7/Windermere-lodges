import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ActivitiesList({ activity }: { activity: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative h-96 group overflow-hidden rounded-md cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={activity.image || "/placeholder.svg"}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-25"
        />

        {/* Overlay that darkens on hover */}
        <div
          className="absolute inset-0 bg-black/40 
      transition-colors duration-500 
      group-hover:bg-black/90"
        />

        {/* Title (initially visible) */}
        <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 group-hover:top-6 group-hover:items-start">
          {activity.title}
        </span>

        {/* Description (hidden until hover) */}
        <div
          className="
      absolute inset-0 flex flex-col justify-center items-center
      text-white px-4 text-center opacity-0 
      transition-opacity duration-500 group-hover:opacity-100
      group-hover:mt-8
    "
        >
          <span className="max-w-md text-base leading-relaxed">
            {activity.intro}
          </span>
        </div>
      </div>

      {/* modal */}

      {open && (
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
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable content area */}
            <div className="overflow-y-auto max-h-[70vh] pr-2">
              <div className="space-y-6">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {activity.title}
                </h2>

                {/* Intro */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {activity.intro}
                </p>

                {/* Sections with headers + points */}
                <div className="space-y-6">
                  {activity.sections?.map((section: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg md:text-xl font-semibold text-emerald-700">
                        {section.header}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                        {section.points.map((point: string, pIdx: number) => (
                          <li key={pIdx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                {/* {activity.tips && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-2">
                        Practical Tips
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm md:text-base">
                        {activity..map((tip: string, tIdx: number) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
