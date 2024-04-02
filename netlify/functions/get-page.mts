import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event, context) => {

  const apiKey = process.env["GOOGLE_BLOGGER_API_KEY"];
  const pageid= event.queryStringParameters?.["pageid"];
  if (!pageid) {
    return {
      statusCode: 400,
      body: "Missing pageid",
    };
  }
  console.log('context: ' + JSON.stringify(context));
  console.log('event: ' + JSON.stringify(event));
  console.log('apiKey: ' + apiKey);

  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/14706135/pages/${pageid}?key=${apiKey}`, {
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
