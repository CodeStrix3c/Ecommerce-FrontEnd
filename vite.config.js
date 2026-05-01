import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function imageProxyPlugin() {
  const handleImageProxy = async (req, res, next) => {
    if (!req.url?.startsWith("/api/image-proxy")) {
      next();
      return;
    }

    try {
      const requestUrl = new URL(req.url, "http://localhost");
      const imageUrl = requestUrl.searchParams.get("url");

      if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
        res.statusCode = 400;
        res.end("A valid image URL is required.");
        return;
      }

      const upstream = await fetch(imageUrl);

      if (!upstream.ok) {
        res.statusCode = upstream.status;
        res.end(await upstream.text());
        return;
      }

      const contentType = upstream.headers.get("content-type") || "application/octet-stream";
      const buffer = Buffer.from(await upstream.arrayBuffer());

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=300");
      res.end(buffer);
    } catch (err) {
      res.statusCode = 502;
      res.end(err.message || "Image proxy failed.");
    }
  };

  return {
    name: "local-image-proxy",
    configureServer(server) {
      server.middlewares.use(handleImageProxy);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleImageProxy);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imageProxyPlugin()],
  build: {
    outDir: "public_html",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
