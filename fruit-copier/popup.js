document.getElementById("copyBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const [{ result: tmp }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractFruits, // ⚠️ 現在只回傳字串，不寫剪貼簿
  });

  try {
    await navigator.clipboard.writeText(tmp); // ✅ 在 popup 中寫入，確保有焦點
    alert("已複製：" + tmp);
  } catch (err) {
    alert("複製失敗：" + err);
  }
});

function extractFruits() {
  const items = Array.from(document.querySelectorAll(".fruit")).map(el => el.textContent.trim());
  return items.join(",");
}
