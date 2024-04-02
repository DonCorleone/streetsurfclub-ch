import type {Config, Context, Handler} from "@netlify/functions";

export const handler: Handler = async (event, context) => {

  const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
  const postid= event.queryStringParameters?.["postid"];
  if (!postid) {
    return {
      statusCode: 400,
      body: "Missing postid",
    };
  }

  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/14706135/posts/${postid}?key=${apiKey}`, {
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
