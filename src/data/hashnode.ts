const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com";
const PUBLICATION_HOST = "blog.mohsin.xyz";

export interface HashnodePost {
  title: string;
  slug: string;
  brief: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  content?: {
    html: string;
    markdown: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

interface PostEdge {
  node: HashnodePost;
}

interface PostsResponse {
  data: {
    publication: {
      posts: {
        edges: PostEdge[];
      };
    };
  };
}

interface SinglePostResponse {
  data: {
    publication: {
      post: HashnodePost | null;
    };
  };
}

async function fetchFromHashnode<T>(query: string): Promise<T> {
  const response = await fetch(HASHNODE_GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Hashnode API error: ${response.status}`);
  }

  return response.json();
}

export async function getHashnodePosts(): Promise<HashnodePost[]> {
  const query = `
    query Publication {
      publication(host: "${PUBLICATION_HOST}") {
        posts(first: 20) {
          edges {
            node {
              title
              slug
              brief
              publishedAt
              coverImage {
                url
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchFromHashnode<PostsResponse>(query);
  return response.data.publication.posts.edges.map((edge) => edge.node);
}

export async function getHashnodePost(slug: string): Promise<HashnodePost | null> {
  const query = `
    query Publication {
      publication(host: "${PUBLICATION_HOST}") {
        post(slug: "${slug}") {
          title
          slug
          brief
          publishedAt
          coverImage {
            url
          }
          content {
            html
          }
          seo {
            title
            description
          }
        }
      }
    }
  `;

  const response = await fetchFromHashnode<SinglePostResponse>(query);
  return response.data.publication.post;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getHashnodePosts();
  return posts.map((post) => post.slug);
}
