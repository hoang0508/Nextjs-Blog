import { BlogType } from "@/@types/type";
import Image from "next/image";
import React from "react";

interface IBlogHeader {
  data: BlogType;
}

const BlogHeader = ({ data }: IBlogHeader) => {
  const createDate: Date = new Date(data?.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="flex gap-x-3 mb-3">
      <div>
        <Image
          src={data?.authorAvatar}
          alt="image"
          className="w-10 h-10 object-cover rounded-full"
          width={40}
          height={40}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-y-1 text-sm">
        <span>{data?.authorName}</span>
        <div>
          <span>{data?.authorUrl}</span> <span>-</span>{" "}
          <span className="font-bold">
            {createDate.toLocaleDateString("vi-VI", options)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
