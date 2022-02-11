function waitForIt(it) {
  return new Promise((resolve) => {
    const checkExistInterval = setInterval(() => {
      if (it()) {
        clearInterval(checkExistInterval);
        resolve();
      }
    }, 100);
  });
}

async function openMenuIfNecessary() {
  const isMenuOpen = document
    .querySelector("tp-yt-app-drawer")
    .hasAttribute("opened");
  if (isMenuOpen) {
    return;
  }

  document.querySelector("#guide-button").click();
  await waitForIt(
    () =>
      document.querySelectorAll("ytd-guide-collapsible-entry-renderer a").length
  );
}

async function openAllSubscriptions() {
  document.querySelectorAll("#expander-item")[1].click();
  waitForIt(
    () => document.querySelectorAll("ytd-guide-entry-renderer").length > 35
  );
}

async function readAllUnreadSubscriptions() {
  return new Promise((resolve) => {
    const unreadSubscriptionElements = Array.from(
      document.querySelectorAll("#newness-dot").values()
    ).filter((el) => getComputedStyle(el).display !== "none");

    const intervalId = setInterval(() => {
      unreadSubscriptionElements.pop()?.click();
      if (unreadSubscriptionElements.length === 0) {
        clearInterval(intervalId);
        resolve();
      }
    }, 500);
  });
}

(async () => {
  const initialUrl = window.location.href;
  await openMenuIfNecessary();
  await openAllSubscriptions();
  await readAllUnreadSubscriptions();
  window.location.href = initialUrl;
})();
