const rawUrl = import.meta.env.VITE_API_URL || "";

if (!rawUrl) {
  console.error(
    "VITE_API_URL is not set — API requests will fail. Check this deploy's environment variables.",
  );
}

// Guards against an easy-to-make deployment mistake: setting the env var
// without a scheme (e.g. "myapp.up.railway.app" instead of
// "https://myapp.up.railway.app"). Without a scheme, the browser treats
// a fetch target built from it as a RELATIVE path and silently glues it
// onto whatever page you're currently on instead of the real API host —
// this exact bug produced requests like
// "https://yoursite.com/admin/myapp.up.railway.app/api/auth/login" in
// production (a 404 with no obvious cause from the error alone).
export const API_URL = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
