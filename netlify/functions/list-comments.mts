import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event, context) => {

  const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
  const blogId = process.env["GOOGLE_BLOGGER_ID"];

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
}
