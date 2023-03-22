import { BlogType } from "@/@types/type";
import React from "react";

interface IBlogPreview {
  data: BlogType;
}

const BlogPreview = ({ data }: IBlogPreview) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">{data?.title}</h3>
      <p className="text-base">{data?.bodyText.substring(0, 150) + "..."}</p>
      <div className="flex gap-x-3 items-center mt-3">
        {data?.tag.map((item, index) => (
          <span
            className="bg-blue-500 text-white rounded p-2 text-sm"
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
