"use client";

import { Preview } from "@/components/preview";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

interface ClientProps {
  id?: string;
  title?: string;
  description?: string;
  textEditor?: string;
  image?: string;
  category?: string;
  avatar?: string | null;
  author?: string | null;
  createdAt?: Date;
  views?: number;
}

export const Client = ({
  id,
  title,
  description,
  textEditor,
  image,
  category,
  avatar,
  author,
  views,
  createdAt,
}: ClientProps) => {
  // Update views on mount
  useEffect(() => {
    const updateViews = async () => {
      try {
        await axios.patch(`/api/posts/${id}/views`);
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    if (id) updateViews();
  }, [id]);

  // Validate textEditor content
  const isDataMeaningful =
    textEditor &&
    textEditor.trim() !== "" &&
    textEditor.trim() !== "<p><br></p>";

  if (!isDataMeaningful) {
    return null;
  }

  return (
    <section>
      <div className="container mx-auto mt-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="mt-5 flex flex-col gap-6">
            {category && (
              <h5 className="text-pink-600 text-xl font-medium">{category}</h5>
            )}
            <h2 className="font-semibold text-4xl leading-snug text-black">
              {title}
            </h2>
            <p className="desc line-clamp-4">{description}</p>
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20">
                <Image
                  src={avatar || "/noavatar.png"}
                  alt={author || "Author avatar"}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3>
                  Written By:
                  <span className="font-semibold"> {author || "Unknown"}</span>
                </h3>
                <p>
                  {createdAt
                    ? format(new Date(createdAt), "MMMM do, yyyy")
                    : "Date not available"}
                </p>
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  {views ?? 0} views
                </span>
              </div>
            </div>
          </div>
          <div>
            {image && (
              <div className="relative aspect-video">
                <Image
                  src={image}
                  fill
                  alt="Blog Banner"
                  className="rounded-lg hover:-translate-y-2 transition-all duration-200 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="my-20 main_class_blog">
          <div
            className="flex-1 text-start"
            dangerouslySetInnerHTML={{ __html: textEditor }}
          />
        </div>
      </div>
    </section>
  );
};
