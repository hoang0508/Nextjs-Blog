import { BlogType, BlogTypeDetails } from "./../@types/type";
import { discussionDetailGql, discussionGql } from "./gql";

const API_URL = "https://api.github.com/graphql";
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID;

// GET BLOG
export async function getBlogs(): Promise<BlogType[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: discussionGql(DISCUSSION_CATEGORY_ID) }),
  });
  const dataBlog = await response?.json();
  const discussions = dataBlog?.data?.repository?.discussions?.nodes;
  const posts =
    discussions &&
    discussions.length > 0 &&
    discussions.map((discussion: any): BlogType => {
      const {
        title,
        number: id,
        bodyHTML: html,
        bodyText,
        createdAt,
        author,
        labels,
      } = discussion;
      const url = `/blog/${id}`;
      const {
        login: authorName,
        url: authorUrl,
        avatarUrl: authorAvatar,
      } = author;
      const tag = labels.nodes.map((item: { name: string }) => item?.name);
      const post = {
        id,
        title,
        url,
        createdAt,
        html,
        bodyText,
        tag,
        authorAvatar,
        authorUrl,
        authorName,
      };
      return post;
    });
  console.log(posts);
  return posts;
}

// GET BLOG DETAILS
export async function getBlogsDetails(
  id: number | undefined
): Promise<BlogTypeDetails> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: discussionDetailGql(id) }),
  });
  const data = await response?.json();
  const {
    author: { login: authorName, url: authorUrl, avatarUrl: authorAvatar },
    title,
    bodyHTML: html,
    createdAt,
  } = data?.data?.repository?.discussion;
  const dataDetails = {
    authorAvatar,
    authorName,
    authorUrl,
    title,
    html,
    createdAt,
  };
  return dataDetails;
}
