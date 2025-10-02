import Shimmer from "@/components/ui/shimmer";

function SkeletonBox({ className }: { className: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}

function Loader() {
  return (
    <>
      <div className="relative pt-32 pb-20 flex items-center justify-center">
        {/* Background shimmer instead of image */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />

        <div className="container mx-auto px-4 text-center text-white z-10">
          {/* Title shimmer */}
          <SkeletonBox className="h-10 w-64 mx-auto mb-4" />
          {/* Description shimmer */}
          <SkeletonBox className="h-5 w-96 mx-auto" />
        </div>
      </div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-row">
            <div className="w-svw">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Lodges</h2>
                <div className="text-sm text-gray-500">Showing 0 lodges</div>
              </div>

              <div className="flex flex-col justify-center items-center w-full gap-4">
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Loader;
