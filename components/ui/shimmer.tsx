import { Badge } from "@/components/ui/badge";
export default function Shimmer() {
  return (
    <div className="overflow-hidden rounded-md group-hover:shadow-md transition-shadow animate-pulse duration-750">
      <div className="relative bg-gray-200 w-[400px]">
        <div className="aspect-w-16 aspect-h-9 relative h-48"></div>
        {/* <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
          <Heart size={20} />
        </button> */}

        {/* <Badge className="absolute top-3 left-3 bg-emerald-600">Featured</Badge> */}
      </div>

      <div className="p-5 bg-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xl font-bold bg-gray-300 py-4 px-16 rounded-sm"></div>
          <div className="text-xl font-bold bg-gray-300 py-3 px-5 rounded-sm"></div>
        </div>

        <div className="bg-gray-300 text-sm py-2 px-25 my-3 rounded-sm"></div>
        <div className="bg-gray-300 text-sm py-2 px-25 my-3 rounded-sm"></div>
        <div className="bg-gray-300 text-sm py-2 px-25 my-3 rounded-sm"></div>

        <div className="flex pt-8 gap-5 text-xs">
          <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge>
          <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge>
          <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge>
          <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge>
          {/* <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge> */}
        </div>
      </div>
      <div className="p-5 flex justify-between items-center bg-gray-100">
        <div>
          <div className="bg-gray-300  py-5 px-10 rounded-lg"></div>
          {/* <Badge variant="outline" className="bg-gray-300  py-2 px-8"></Badge> */}
        </div>
        <div className="bg-gray-300  py-5 px-12 rounded-lg"></div>
      </div>
    </div>
  );
}
