/**
 * Next.js (React Server Components) uses "#" inside internal module URLs.
 * If your project folder path contains "#", the dev server starts but pages
 * crash with errors like:
 *   "Could not find the module ... global-error.js# in the React Client Manifest"
 *
 * There is no reliable framework fix — the project must live on a path
 * without "#" characters.
 *
 * Set SKIP_PATH_CHECK=1 to bypass this guard (you will still get runtime errors).
 */
const cwd = process.cwd();

if (process.env.SKIP_PATH_CHECK === "1") {
  process.exit(0);
}

if (cwd.includes("#")) {
  console.error("");
  console.error("  ------------------------------------------------------------------");
  console.error("  Next.js cannot run from a folder whose path contains the # character.");
  console.error("  ------------------------------------------------------------------");
  console.error("");
  console.error("  Current directory:");
  console.error("   ", cwd);
  console.error("");
  console.error("  Fix (pick one):");
  console.error("    1) Move or rename the parent folder so the path does not contain #.");
  console.error("    2) Clone the repo to a clean path, then run from there, e.g.:");
  console.error("");
  console.error("       cd ~ && git clone git@github.com:maharramgz/-Backend-implementation-Maharram-Guluzade.git laundry-room-helper");
  console.error("       cd laundry-room-helper/frontend && npm install && npm run dev");
  console.error("");
  console.error("  Advanced: SKIP_PATH_CHECK=1 npm run dev  (still broken; only for debugging)");
  console.error("");
  process.exit(1);
}
