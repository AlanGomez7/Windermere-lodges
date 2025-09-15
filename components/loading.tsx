import Shimmer from "./ui/shimmer";

function Loading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Lodges</h2>
        <div className="text-sm text-gray-500">Showing 0 lodges</div>
      </div>

      <div className="grid h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </div>
    </div>
  );
}

export default Loading;
