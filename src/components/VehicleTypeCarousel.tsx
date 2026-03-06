import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const vehicleTypes = [
  { id: "sedan", label: "Sedan", image: "/images/sedan.png" },
  { id: "truck", label: "Truck", image: "/images/truck.png" },
  { id: "suv", label: "SUV", image: "/images/suv.png" },
  { id: "minivan", label: "Minivan", image: "/images/minivan.png" },
  { id: "convertible", label: "Convertible", image: "/images/convertible.png" },
  { id: "hatchback", label: "Hatchback", image: "/images/hatchback.png" },
  { id: "coupe", label: "Coupe", image: "/images/coupe.png" },
];

interface VehicleTypeCarouselProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function VehicleTypeCarousel({ selected, onSelect }: VehicleTypeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onEmblaSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    onSelect(vehicleTypes[idx].id);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onEmblaSelect);
    return () => { emblaApi.off("select", onEmblaSelect); };
  }, [emblaApi, onEmblaSelect]);

  // Sync tabs to carousel
  const handleTabClick = (idx: number) => {
    setSelectedIndex(idx);
    onSelect(vehicleTypes[idx].id);
    emblaApi?.scrollTo(idx);
  };

  // Sync if selected prop changes externally
  useEffect(() => {
    const idx = vehicleTypes.findIndex((v) => v.id === selected);
    if (idx >= 0 && idx !== selectedIndex) {
      setSelectedIndex(idx);
      emblaApi?.scrollTo(idx);
    }
  }, [selected, emblaApi, selectedIndex]);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-center">
        {vehicleTypes.map((v, i) => (
          <button
            key={v.id}
            onClick={() => handleTabClick(i)}
            className={cn(
              "text-sm font-medium transition-colors pb-1 border-b-2",
              i === selectedIndex
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden rounded-xl">
          <div className="flex">
            {vehicleTypes.map((v) => (
              <div key={v.id} className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center py-4">
                <img
                  src={v.image}
                  alt={v.label}
                  className="max-h-[300px] md:max-h-[360px] object-contain drop-shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
