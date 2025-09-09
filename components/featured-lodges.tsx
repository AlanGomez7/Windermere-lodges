
import LodgeCard from "./cards/lodge-card";

export const FeaturedLodges = ({ lodges }: { lodges: any }) => {

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Featured Lodges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most popular luxury lodges, each offering a unique Lake
            District experience with stunning views and premium amenities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lodges.slice(0, 3).map((lodge: any) => (
            <LodgeCard lodge={lodge} key={lodge.id} needsButton={false}/>
          ))}
        </div>
      </div>
    </section>
  );
};
