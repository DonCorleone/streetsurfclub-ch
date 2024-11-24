import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {

    const apiKey = Netlify.env.get("GOOGLE_BLOGGER_API_KEY");
    const blogId = Netlify.env.get("GOOGLE_BLOGGER_ID");
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}?key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new Response(res.body, {
      headers: {
        "content-type": "text/event-stream"
      }
    });
  };
  export const config = { path: "/get-blog" };
