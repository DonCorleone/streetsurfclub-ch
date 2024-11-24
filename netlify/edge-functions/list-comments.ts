import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {

  const apiKey = Netlify.env.get("GOOGLE_BLOGGER_API_KEY");
  const blogId = Netlify.env.get("GOOGLE_BLOGGER_ID");

  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/comments?key=${apiKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  } else {
    const data = await res.json();

    return {
      body: JSON.stringify(data),
      statusCode: 200,
    }
  }
};
export const config = { path: "/list-comments" };
