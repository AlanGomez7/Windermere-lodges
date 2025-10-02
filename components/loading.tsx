import Shimmer from "./ui/shimmer";

function Loading() {
  return (
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
  );
}

export default Loading;
