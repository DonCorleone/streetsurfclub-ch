import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {

  const apiKey = Netlify.env.get("GOOGLE_BLOGGER_API_KEY");
  const blogId = Netlify.env.get("GOOGLE_BLOGGER_ID");
  const url = new URL(request.url);
  const encodedQ= url.searchParams.get("encodedQ");;
  if (!encodedQ) {
    return {
      statusCode: 400,
      body: "Missing encodedQ",
    };
  }



  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/search?key=${apiKey}&fetchImages=true&q=${encodedQ}`, {
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
        "content-type": "text/event-stream"
      }
    });
  }
};
export const config = { path: "/find-post" };
