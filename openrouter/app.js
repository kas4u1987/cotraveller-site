// Sign-in callback for CoTraveller. After the traveller approves on openrouter.ai, OpenRouter sends the browser here
// with ?code=…&state=… (or ?error=…). The app's sign-in sheet waits for cotraveller://openrouter, so the page hands
// both values on and nothing else. The code alone is useless: trading it for a key needs a secret that never leaves
// the phone.
(function () {
  "use strict";
  var token = /^[A-Za-z0-9._~+\/=-]{1,1024}$/;
  var params = new URLSearchParams(window.location.search);
  var code = params.get("code");
  var state = params.get("state");
  var error = params.get("error");

  // Keep the code out of the address bar and the history.
  window.history.replaceState(null, "", window.location.pathname);

  var query = null;
  if (code !== null && token.test(code) && state !== null && token.test(state)) {
    query = "code=" + encodeURIComponent(code) + "&state=" + encodeURIComponent(state);
  } else if (error !== null && token.test(error)) {
    query = "error=" + encodeURIComponent(error);
  }

  if (query === null) {
    document.getElementById("message").textContent = "Something was missing. Go back to CoTraveller and try again.";
    return;
  }
  // Always the app's fixed address, never one taken from the page's own address.
  window.location.replace("cotraveller://openrouter?" + query);
})();
