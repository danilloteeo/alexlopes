import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const barbers = [
  { name: "Alex Lopes", specialty: "Corte Clássico & Barba", avatar: "/barbers/alex.jpg", fallback: "AL" },
  { name: "João Silva", specialty: "Degradê & Pigmentação", avatar: "/barbers/joao.jpg", fallback: "JS" },
  { name: "Carlos Mendes", specialty: "Barba Completa & Navalha", avatar: "/barbers/carlos.jpg", fallback: "CM" },
  { name: "Rafael Costa", specialty: "Corte Moderno & Design", avatar: "/barbers/rafa.jpg", fallback: "RC" },
  { name: "Lucas Oliveira", specialty: "Sobrancelha & Acabamento", avatar: "/barbers/lucas.jpg", fallback: "LO" },
];

export default function BarbersGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      {barbers.map((barber) => (
        <Card key={barber.name} className="overflow-hidden hover:shadow-xl transition-shadow">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Avatar className="w-full h-full">
                <AvatarImage src={barber.avatar} alt={barber.name} />
                <AvatarFallback className="text-3xl">{barber.fallback}</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold">{barber.name}</h3>
              <Badge variant="secondary" className="mt-2">
                {barber.specialty}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}