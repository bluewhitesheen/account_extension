function extractFruits() {
  const items = Array.from(document.querySelectorAll(".fruit")).map(el => el.textContent.trim());
  return items.join(",");
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-fruits") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    try {
      const [{ result: tmp }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractFruits,
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => navigator.clipboard.writeText(text),
        args: [tmp],
      });

      console.log("已複製水果清單：" + tmp);
    } catch (err) {
      console.error("複製失敗：", err);
    }
  }
});
