function extractFruits() {
  const items = Array.from(document.querySelectorAll(".fruit")).map(el => el.textContent.trim());
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
