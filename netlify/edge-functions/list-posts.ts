import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const apiKey = Netlify.env.get("GOOGLE_BLOGGER_API_KEY");
  const blogId = Netlify.env.get("GOOGLE_BLOGGER_ID");
  const url = new URL(request.url);
  let mobile = url.searchParams.get("mobile");
  let maxResults: string | null | undefined = url.searchParams.get("maxResults");

  if (maxResults == "-1"){
    if (mobile == "true") {
      maxResults = Netlify.env.get("BLOG_MAX_RESULTS_MOBILE");
    } else {
      maxResults = Netlify.env.get("BLOG_MAX_RESULTS");
    }
  }
  if (!maxResults) {
    maxResults = "300";
  }
  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&fetchImages=true&fetchBodies=false&maxResults=${maxResults}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  } else {
    return new Response(res.body, {
      headers: {
        "content-type": "text/event-stream",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  }
};
export const config = { path: "/list-posts" };

