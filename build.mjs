import { cp, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await mkdir("dist/assets", { recursive: true });
await Promise.all([
  cp("index.html", "dist/index.html"),
  cp("styles.css", "dist/styles.css"),
  cp("script.js", "dist/script.js"),
  cp("assets/bambie.png", "dist/assets/bambie.png"),
]);

console.log("Bambie is ready in dist/");
