var sponsortabs = [];

checkUpdate();

browser.webNavigation.onCompleted.addListener(navigationCompleteListener);

// GC closing tabs to keep sponsortabs map clean
browser.tabs.onRemoved.addListener(function (tabId) {
    if (sponsortabs[tabId]) {
        delete sponsortabs[tabId];
    }
    browser.notifications.clear(NOTIFICATION_ID);
});

// Register for periodic endpoint updates
browser.runtime.onInstalled.addListener(function () {
    browser.alarms.create("SLupdateCheck", {
        delayInMinutes: UPDATE_CHECK_INTERVAL,
        periodInMinutes: UPDATE_CHECK_INTERVAL
    })
});

browser.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "SLupdateCheck") {
        checkUpdate();
    }
});