export function discussionGql(ghDiscussionGqlCategoryId: string | undefined) {
  return `{
    repository(owner: "hoang0508", name: "Nextjs-Blog") {
      discussions(first: 100, categoryId: "${ghDiscussionGqlCategoryId}") {
        nodes {
          title
          url
          number
          bodyHTML
          bodyText
          createdAt
          lastEditedAt
          author {
            login
            url
            avatarUrl
          }
          labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }`;
}

export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(owner: "hoang0508", name: "Nextjs-Blog") {
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`;
}
