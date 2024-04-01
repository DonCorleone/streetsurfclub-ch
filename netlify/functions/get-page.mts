import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {

    const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
    const pageId = context.params?.["pageId"] || "defaultPageId";

    console.log('context: ' + JSON.stringify(context));
    console.log('req: ' + JSON.stringify(req));
    console.log('apiKey: ' + apiKey);

    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/14706135/pages/${pageId}?key=${apiKey}`, {
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
