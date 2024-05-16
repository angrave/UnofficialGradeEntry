/* eslint-disable no-console */
const { log } = console;

function runInGradeTab(callback) {
    const queryOptions = {
        active: true,
        currentWindow: true,
        url: 'https://banner.apps.uillinois.edu/FacultySelfService/ssb/GradeEntry*',
        windowType: 'normal',
    };
    chrome.tabs.query(queryOptions).then((result) => (result[0] ? callback(result[0].id) : console.log("This is not a final grade-entry page")));
}

function handleUIRequest(message) {
    const { action, data } = message;

    if (action !== 'gradehelper') {
        log(`Unknown uiRequest ${action}`);
        return;
    }

    const perform = (tabid) => {
        if (tabid === undefined) {
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabid },
            files: ['/gradehelper.js'],
        }).then(() => {
            chrome.tabs.sendMessage(tabid, { gradedata: data });
        });
    };

    runInGradeTab(perform);
}

// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (chrome.runtime.id !== sender.id) {
        log(`Ignoring message from ${sender.id}`);
        return;
    }
    handleUIRequest(message); 
    return;
});