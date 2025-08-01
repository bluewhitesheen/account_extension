function extractFruits() {
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從0開始，要+1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const iframe = document.querySelector('iframe');
  const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  const targetPane = innerDoc?.querySelector('div#tab_Check_Pane');
  
  const expendUsage = innerDoc.querySelector('#tarSummary').value;
  const AISNumber = innerDoc.querySelector("#txtVisa").value
  
  const subPane2 = targetPane?.querySelector('div#sort-02');
  const targetRow2 = subPane2?.querySelector("table#tabVisaList");
  const tdList2 = Array.from(targetRow2.querySelectorAll('td'));
  const items2 = tdList2.map(td => td.textContent.trim());
  console.log(expendUsage, AISNumber, items2[17]);

  const subPane3 = targetPane?.querySelector('div#sort-03');
  const targetInvoice = subPane3?.querySelector("table#tabInvoiceTitle");
  const InvoiceList = Array.from(targetInvoice.querySelectorAll('td'));
  const InvoiceItems = InvoiceList.map(td => td.textContent.trim());

  const targetReceipt = subPane3?.querySelector("table#tabPInvoiceTitle");
  const receiptList = Array.from(targetReceipt.querySelectorAll('td')).slice(17);
  const receiptItems = receiptList.map(td => td.textContent.trim());
  const receiptSelectedItems = receiptItems.slice(7, 10);

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
    if (field === "縣市代碼") return "30";
    if (field === "機關代號") return "05552";
    if (field === "清單編號") return "";
    if (field === "清單明細編號") return "";
    if (field === "受款人編號") return receiptSelectedItems[2] || InvoiceItems[23] || "";
    if (field === "請購單號碼(空白)") return AISNumber || "";
    if (field === "請購單明細編號(空白)") return items2[17] || "";
    if (field === "明細金額") return receiptSelectedItems[0] || InvoiceItems[18] || "";
    if (field === "支票號碼") return "";
    if (field === "支票領取憑證號碼") return "";
    if (field === "指定兌付銀行名稱") return "";
    if (field === "支票特別註記") return "";
    if (field === "交付方式") return "";
    if (field === "發票號碼") return InvoiceItems[15] || "";
    if (field === "發票日期") return InvoiceItems[16].replaceAll("/", "-") || "";
    if (field === "發票金額") return InvoiceItems[18] || "";
    if (field === "附記事項") return "";
    if (field === "明細備註") return expendUsage || "";
    if (field === "製單日期") return getTodayDate() || "";
    if (field === "清單建立人員") return "";
    if (field === "支出用途") return "";
    if (field === "原始憑證留存受款單位") return "";
    if (field === "交付方式代碼") return "";
    if (field === "單據類別代碼") return "";
    if (field === "指定兌付銀行代號") return "";
    if (field === "受款人明細編號") return "0001";
    if (field === "受款人姓名/公司") return receiptSelectedItems[1] || InvoiceItems[25] || "";
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
