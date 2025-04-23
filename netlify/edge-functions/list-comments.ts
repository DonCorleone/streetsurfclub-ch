import type { Context } from "@netlify/edge-functions";
import Redis from 'ioredis';

// Initialize Redis client
const redisUrl = Netlify.env.get("REDIS_URL");

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}

const redis = new Redis(redisUrl);

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

  const url = new URL(request.url);
  const postid = url.searchParams.get("postid");
  if (!postid) {
    return new Response(JSON.stringify({ error: "Missing postid" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  }


  try {
    const value = await redis.hgetall('comments:' + postid);
    if (!value) {
      return new Response(JSON.stringify({ error: "No comments found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }
    // Convert the value to a JSON string');
// Convert the response into an array of comment objects
    const comments = Object.values(value).map(commentString => JSON.parse(commentString));

    return new Response(JSON.stringify(comments), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    });
  }
};

export const config = { path: "/list-comments" };
