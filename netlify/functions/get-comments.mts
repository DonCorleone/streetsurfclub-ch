import { google } from 'googleapis';
import {Handler} from "@netlify/functions";

// Initialize the Blogger API v3 with your API key
const blogger = google.blogger({
  version: 'v3',
  auth: process.env["GOOGLE_BLOGGER_API_KEY"]
});

export const handler: Handler = async (event, context) => {
  const blogId = process.env["GOOGLE_BLOGGER_ID"];
  const postId = event.queryStringParameters?.["postid"];

  if (!postId) {
    return {
      statusCode: 400,
      body: "Missing postid",
    };
  }

  // Define parameters for the API request
  const params = {
    blogId: blogId,
    postId: postId,
    view: 'AUTHOR'
  };

  // Fetch comments for the specified post
  try {
    const res = await blogger.comments.list(params);
    console.log(`Fetched ${res.data.items.length} comments.`);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data.items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
