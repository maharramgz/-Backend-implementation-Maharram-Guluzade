/**
 * Next.js RSC breaks when the absolute path contains "#" (fragment delimiter in URLs).
 * SKIP_PATH_CHECK=1 bypasses this check; the app will still fail at runtime.
 */
const cwd = process.cwd();

if (process.env.SKIP_PATH_CHECK === "1") {
  process.exit(0);
}

if (cwd.includes("#")) {
  console.error("");
  console.error("  Next.js cannot run when the project path contains '#'.");
  console.error("  Current directory:", cwd);
  console.error("");
  console.error("  Use a checkout path without '#' (rename or re-clone the repository).");
  console.error("  SKIP_PATH_CHECK=1 bypasses this message only; it does not fix the issue.");
  console.error("");
  process.exit(1);
}
