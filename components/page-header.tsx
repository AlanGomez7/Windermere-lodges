import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export function PageHeader({
  title,
  description,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-20 flex items-center justify-center">
      <Image src={backgroundImage} alt="" fill className="object-cover brightness-50" priority/>
      <div className="container mx-auto px-4 text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  );
}




    // <div className="relative pt-32 pb-20 flex items-center justify-center">
    //   <Image src={backgroundImage} alt=""fill/>
    //   <div className="container mx-auto px-4 text-center text-white">
    //     <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
    //     <p className="text-xl max-w-2xl mx-auto">{description}</p>
    //   </div>
    // </div>