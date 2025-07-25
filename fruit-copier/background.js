function extractFruits() {
  const iframe = document.querySelector('iframe');
  const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  const targetPane = innerDoc?.querySelector('div#tab_Check_Pane');
  const targetSubPane = targetPane?.querySelector('div#sort-03');
  const targetRow = targetSubPane?.querySelector("table#tabPInvoiceTitle");

  const tdList = Array.from(targetRow.querySelectorAll('td')).slice(17);

  console.log(tdList);
  const items = tdList.map(td => td.textContent.trim());
  console.log(items.join(","));
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
