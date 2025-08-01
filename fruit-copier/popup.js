function extractFruits() {
  const iframe = document.querySelector('iframe');
  const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  const targetPane = innerDoc?.querySelector('div#tab_Check_Pane');
  const targetSubPane = targetPane?.querySelector('div#sort-03');
  const targetRow = targetSubPane?.querySelector("table#tabPInvoiceTitle");
  const tdList = Array.from(targetRow.querySelectorAll('td')).slice(17);
  const items = tdList.map(td => td.textContent.trim());
  const subItems = items.slice(7, 10);

  const fields = [
    "年度", "縣市代碼", "機關代號", "清單編號", "清單明細編號", "受款人編號", "請購單號碼(空白)",
    "請購單明細編號(空白)", "明細金額", "支票號碼", "支票領取憑證號碼", "指定兌付銀行名稱",
    "支票特別註記", "交付方式", "發票號碼", "發票日期", "發票金額", "附記事項", "明細備註",
    "製單日期", "清單建立人員", "支出用途", "原始憑證留存受款單位", "交付方式代碼", "單據類別代碼",
    "指定兌付銀行代號", "受款人明細編號", "受款人姓名/公司", "金融機構代號", "銀行部門",
    "金融機構名稱", "銀行帳號", "地址", "郵遞區號", "電話", "電子郵件", "個人或公司",
    "受款人清單匯入"
  ];

  const record = fields.map(field => {
    if (field === "年度") return "114";
    if (field === "縣市代碼") return "";
    if (field === "機關代號") return "";
    if (field === "清單編號") return "";
    if (field === "清單明細編號") return "";
    if (field === "受款人編號") return subItems[2] || "";
    if (field === "請購單號碼(空白)") return "";
    if (field === "請購單明細編號(空白)") return "";
    if (field === "明細金額") return subItems[0] || "";
    if (field === "支票號碼") return "";
    if (field === "支票領取憑證號碼") return "";
    if (field === "指定兌付銀行名稱") return "";
    if (field === "支票特別註記") return "";
    if (field === "交付方式") return "";
    if (field === "發票號碼") return "";
    if (field === "發票日期") return "";
    if (field === "發票金額") return "";
    if (field === "附記事項") return "";
    if (field === "明細備註") return "";
    if (field === "製單日期") return "";
    if (field === "清單建立人員") return "";
    if (field === "支出用途") return "";
    if (field === "原始憑證留存受款單位") return "";
    if (field === "交付方式代碼") return "";
    if (field === "單據類別代碼") return "";
    if (field === "指定兌付銀行代號") return "";
    if (field === "受款人明細編號") return "0001";
    if (field === "受款人姓名/公司") return subItems[1] || "";
    if (field === "金融機構代號") return "";
    if (field === "銀行部門") return "";
    if (field === "金融機構名稱") return "";
    if (field === "銀行帳號") return "";
    if (field === "地址") return "";
    if (field === "郵遞區號") return "";
    if (field === "電話") return "";
    if (field === "電子郵件") return "";
    if (field === "個人或公司") return "";
    if (field === "受款人清單匯入") return "1";

    return ""; // fallback
  });

  const output = record.join("\t");
  return output;
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
