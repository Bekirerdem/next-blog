import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function PostPage({ post }) {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [text, textSet] = useState("");
  const [url, urlSet] = useState(null);

  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    urlSet(url);
  }, []);

  const content = useHydrate(post, {
    components: mdxComponents,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const userToken = await getAccessTokenSilently();

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, userToken, url: "http" }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
  };

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <hr className="my-4" />
        <div className="prose">{content}</div>
      </article>
      <form className="mt-10" onSubmit={onSubmit}>
        <div className="mt-4">
          <textarea
            rows="3"
            className="border border-gray-300 rounded w-full block px-2 py-1"
            onChange={(e) => textSet(e.target.value)}
          />
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button className="bg-blue-700 text-white px-2 py-1 rounded mt-4">
                Send
              </button>
              <img
                src={user.picture}
                width={30}
                className="rounded-full mt-4"
              />
              <span className="mt-4">{user.name}</span>
              <button
                className="mt-4 px-4"
                typeof="button"
                onClick={() =>
                  logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })
                }
              >
                X
              </button>
            </div>
          ) : (
            <button
              typeof="button"
              onClick={() => loginWithRedirect()}
              className="bg-blue-700 text-white px-2 py-1 rounded mt-4"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
