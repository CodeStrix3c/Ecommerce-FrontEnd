exports.handler = async (event) => {
  const imageUrl = event.queryStringParameters?.url;

  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
    return {
      statusCode: 400,
      body: "A valid image URL is required."
    };
  }

  try {
    const upstream = await fetch(imageUrl);

    if (!upstream.ok) {
      return {
        statusCode: upstream.status,
        body: await upstream.text()
      };
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = Buffer.from(await upstream.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
        "Content-Type": contentType
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: err.message || "Image proxy failed."
    };
  }
};
