/**
 * Sets a new cookie.
 * @param {String} cookieName Cookie name
 * @param {Object} cookieValue Cookie value
 * @param {Integer} hours Number of hours for cookie
 */
const setCookie = function(cookieName, cookieValue, hours) {
  let date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

/**
 * Fetches a cookie by name
 * @param {String} cookieName Cookie name to fetch
 */
const getCookie = function(cookieName) {
  let name = cookieName + "=";
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
};

/**
 * Checks a cookie by name
 * @param {String} cookieName Cookie name to check
 */
const checkCookie = function(cookieName) {
  let user = getCookie(cookieName);
  if (user !== "") {
    return user;
  } else {
    return null;
  }
};

/**
 * Deletes a cookie by name
 * @param {String} cookieName Cookie name to delete
 */
const deleteCookie = function(cookieName) {
  let date = new Date();
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + null + ";" + expires + ";path=/";
};

export { setCookie, getCookie, checkCookie, deleteCookie };
