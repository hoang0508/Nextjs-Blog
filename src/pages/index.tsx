import { BlogType } from "@/@types/type";
import BlogHeader from "@/components/BlogHeader";
import BlogPreview from "@/components/BlogPreview";
import { getBlogs } from "@/server/blogs";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

const Home: NextPage = ({
  blogPost,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // filterWord
  const [filterWord, setFilterWord] = useState<string[]>([]);

  // select index
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  // filter blog
  const filteredBlog: BlogType[] = useMemo(() => {
    return filterWord.length > 0
      ? blogPost &&
          blogPost.length > 0 &&
          blogPost.filter((item: BlogType) => {
            return filterWord.some((filter) => item.tag.includes(filter));
          })
      : blogPost;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterWord]);

  // handle click tag lable selected
  const handleFilterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx));
      setFilterWord(filterWord.filter((item) => item !== tag.innerText));
    } else {
      setSelectedIdx([...selectedIdx, idx]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="layout">
        <section>
          <div className="text-center mt-5">
            <h2 className="text-[40px] mb-3 font-semibold">
              Welcome to Blog githup Javascipt Framework
            </h2>
            <p className="text-base">
              A full-stack blog made with Next.js, TailwindCSS, Github GraphQL
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center mt-10">
          <div className="flex gap-x-3 mb-5">
            {tags &&
              tags.length > 0 &&
              tags.map((item: string, index: number) => (
                <button
                  className={`${
                    selectedIdx.includes(index) ? "bg-blue-700" : "bg-blue-500"
                  } text-white py-2 px-3 rounded-lg hover:bg-blue-400 transition duration-150 ease-out`}
                  key={index}
                  onClick={(e) => handleFilterLabel(e.target, index)}
                >
                  {item}
                </button>
              ))}
          </div>
          {filteredBlog &&
            filteredBlog.length > 0 &&
            filteredBlog.map((item: BlogType) => (
              <Link
                href={item.url}
                className="max-w-[500px] w-full bg-gray-200 p-3 rounded-lg text-[#000000] cursor-pointer mb-5"
                key={item?.id}
              >
                <BlogHeader data={item} />
                <BlogPreview data={item} />
              </Link>
            ))}
        </section>
      </main>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const blog: BlogType[] = await getBlogs();
  const tag: string[] = blog?.flatMap((item) => item.tag);
  const tagBlog = [...new Set(tag)];

  return {
    props: {
      blogPost: blog || [],
      tags: tagBlog,
    },
    revalidate: 10,
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   context.res.setHeader(
//     "Cache-Control",
//     "s-maxage=5, stale-while-revalidate=5"
//   );

//   const blog: BlogType[] = await getBlogs();
//   const tag: string[] = blog?.flatMap((item) => item.tag);
//   const tagBlog = [...new Set(tag)];

//   return {
//     props: {
//       blogPost: blog || [],
//       tags: tagBlog,
//     },
//   };
// };
