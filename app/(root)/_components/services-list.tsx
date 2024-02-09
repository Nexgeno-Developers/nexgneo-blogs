"use client";
import { Post, Services } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface PostsListProps {
  items: Services[];
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
                <Link href={item.url} target="_blank">
                  <div className="relative aspect-video">
                    <Image
                      alt="services img"
                      fill
                      src={item.image}
                      className="rounded-md"
                    />
                    <div className="absolute inset-0 bg-black opacity-70 rounded-md flex items-center justify-center">
                      <h3 className="text-white relative z-50 text-3xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="max-md:hidden">
            <CarouselPrevious />
          </div>
          <div className="max-md:hidden">
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
};
