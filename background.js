function removeModalRestriction() {
    const modalElement = document.querySelector('div.MuiDialog-root');
    modalElement.parentElement.removeChild(modalElement);

    const bodyElement = document.querySelector('body');
    bodyElement.style.removeProperty("overflow");
}

chrome.action.onClicked.addListener((tab) => {
    if(tab.url.includes("factory.katanamrp.com")) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: removeModalRestriction
        }).then(() => {});
    }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   setTimeout(() => {
       if(tab.url.includes("factory.katanamrp.com") && changeInfo.status === 'complete' && tab.active) {
           chrome.scripting.executeScript({
               target: {tabId: tab.id},
               function: removeModalRestriction
           }).then(() => {});
       }
   }, 5000);
});
