import Shimmer from "./ui/shimmer";

function Loading() {
  return (
    <div className="flex gap-3">
      <Shimmer />
      <Shimmer />
      <Shimmer />
    </div>
  );
}

export default Loading;
