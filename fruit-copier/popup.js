function extractFruits() {
  console.log("yee")
  const container = document.querySelector('div.tb-over');
  const targetRow = container?.querySelector('tr#tabPInvoiceTitleItemTmp1');

  const tdList = targetRow
    ? Array.from(targetRow.querySelectorAll('td')).filter(td => td.id.startsWith('ITEM'))
    : [];

  const items = tdList.map(td => td.textContent.trim());
  console.log(items);
  return items.join(",");
}

document.getElementById("copyBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const [{ result: tmp }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractFruits, 
  });

  try {
    await navigator.clipboard.writeText(tmp); 
    console.log("已複製水果清單：" + tmp);
  } catch (err) {
    console.error("複製失敗：" + err);
  }
});
