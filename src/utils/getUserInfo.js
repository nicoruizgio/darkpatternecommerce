export function getUserInfo() {
  let userId = localStorage.getItem("userId");
  let userKey = localStorage.getItem("userKey");

  if (!userId || !userKey) {
    const url = new URL(window.location.href);
    userKey = url.searchParams.get("key") || "";
    userId = url.searchParams.get("id") || "";

    if (userKey) localStorage.setItem("userKey", userKey);
    if (userId) localStorage.setItem("userId", userId);
  }

  return { userId, userKey };
}