export function getAccessToken() {
  if (localStorage.getItem("remember")) {
    return localStorage.getItem("accessToken");
  } else {
    return sessionStorage.getItem("accessToken");
  }
}

export function setAccessToken(accessToken: string, remember: boolean) {
  if (remember) {
    localStorage.setItem("remember", "true");
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("remember");
    sessionStorage.setItem("accessToken", accessToken);
  }
}

export function removeAccessToken() {
  localStorage.removeItem("remember");
  sessionStorage.removeItem("remember");
  sessionStorage.removeItem("accessToken");
}
