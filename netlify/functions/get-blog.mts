export default async () => {

    const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
    const blogId = process.env["GOOGLE_BLOGGER_ID"];
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
