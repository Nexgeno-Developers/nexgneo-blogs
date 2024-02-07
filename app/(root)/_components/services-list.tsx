"use client";
import { Post } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface PostsListProps {
  items: Post[];
}

export const ServicesList = ({ items }: PostsListProps) => {
  return (
    <>
      <div className="mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-video">
                  <Image
                    alt="services img"
                    fill
                    src={item.image}
                    className="rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};
