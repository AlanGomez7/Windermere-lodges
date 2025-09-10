import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ReviewCard({testimonial}:{testimonial: any}) {
  console.log(testimonial)
  return (
    <Card
      key={testimonial.id}
      className="testimonial-card flex-shrink-0 w-[350px] shadow-md"
    >
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={testimonial.visitor.avatar} alt={testimonial.name} />
          <AvatarFallback className="font-bold text-2xl">{testimonial.visitor.name.slice(0,1)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{testimonial.visitor.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{testimonial.visitor.address}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex mb-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600">{testimonial.content}</p>
      </CardContent>
    </Card>
  );
}
