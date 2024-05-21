import type {Config, Context, Handler} from "@netlify/functions";

export const handler: Handler = async (event, context) => {

  const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
  const blogId = process.env["GOOGLE_BLOGGER_ID"];
  let maxResults = event.queryStringParameters?.["maxResults"];
  if (maxResults == "-1"){
    maxResults = process.env["BLOG_MAX_RESULTS"];
  }
  if (!maxResults) {
    maxResults = "50";
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
    const data = await res.json();

    return {
      body: JSON.stringify(data),
      statusCode: 200,
    }
  }
};

