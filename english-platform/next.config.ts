import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

/** When started via `npm run dev`, keep dev cache separate from `.next` to avoid Windows EPERM on `.next/trace` if another process (e.g. a second dev server) holds that folder open. */
const distDir =
  process.env.npm_lifecycle_event === "dev" ? ".next-dev" : ".next";

const parentLockfile = path.join(__dirname, "..", "package-lock.json");
const hasParentMonorepoLock = fs.existsSync(parentLockfile);

const nextConfig: NextConfig = {
  distDir,
  // Only when this app lives next to another package-lock (local nested layout). Skip on Vercel if the deploy root is only `english-platform`.
  ...(hasParentMonorepoLock
    ? { outputFileTracingRoot: path.join(__dirname, "..") }
    : {}),
};

export default nextConfig;
