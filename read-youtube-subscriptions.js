function waitForIt(it) {
  return new Promise(resolve => {
    const checkExistInterval = setInterval(() => {
      if (it()) {
        clearInterval(checkExistInterval);
        resolve();
      }
    }, 100);
  });
}

function openAllSubscriptions() {
  Array.from(
    document.querySelectorAll('ytd-guide-collapsible-entry-renderer a').values()
  )
    .filter(({ title }) => title.startsWith('Nog') && title.endsWith('tonen'))
    .forEach(el => el.click());
}

function readAllUnreadSubscriptions() {
  const unreadSubscriptionElements =
    Array.from(document.querySelectorAll('#newness-dot').values()).filter(
      el => getComputedStyle(el).display !== 'none'
    ) || [];

  const intervalId = setInterval(() => {
    unreadSubscriptionElements.pop().click();
    if (unreadSubscriptionElements.length === 0) {
      clearInterval(intervalId);
    }
  }, 500);
}

waitForIt(
  () =>
    document.querySelectorAll('ytd-guide-collapsible-entry-renderer a').length
)
  .then(() => openAllSubscriptions())
  .then(() =>
    waitForIt(
      () => document.querySelectorAll('ytd-guide-entry-renderer').length > 35
    )
  )
  .then(() => readAllUnreadSubscriptions());
