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
    alert("已複製：" + tmp);
  } catch (err) {
    alert("複製失敗：" + err);
  }
});
