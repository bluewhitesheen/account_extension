import { joinFruits } from './module.js';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "COPY_FRUITS" && message.tabId) {
    const [{ result: rawList }] = await chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      function: () => {
        return Array.from(document.querySelectorAll(".fruit")).map(el => el.textContent);
      }
    });

    const tmp = joinFruits(rawList);

    await chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      func: (text) => navigator.clipboard.writeText(text),
      args: [tmp]
    });

    sendResponse({ success: true, content: tmp });
    return true; // keep message channel open
  }
});
