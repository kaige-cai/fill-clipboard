// 监听扩展程序安装事件
chrome.runtime.onInstalled.addListener(function () {
   // 设置上下文菜单，以在右键单击时显示选项
   chrome.contextMenus.create({
      title: "填充剪贴板",
      contexts: ["editable"],
      id: "pasteClipboard"
   });
});

// 监听上下文菜单项的点击事件
chrome.contextMenus.onClicked.addListener(function (info, tab) {
   if (info.menuItemId === "pasteClipboard") {
      // 请求剪贴板读取权限
      chrome.permissions.request({ permissions: ['clipboardRead', 'clipboardWrite'] }, function (granted) {
         if (granted) {
            // 读取剪贴板内容
            navigator.clipboard.readText().then(function (clipboardText) {
               // 复制到系统剪贴板
               navigator.clipboard.writeText(clipboardText).then(function () {
                  console.log("文本已成功复制到剪贴板");
               }).catch(function (error) {
                  console.error("复制文本到剪贴板时发生错误:", error);
               });
            });
         }
      });
   }
});

// 监听内容脚本请求的剪贴板内容
chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
   if (request.action === "getClipboardContent") {
      // 请求剪贴板读取权限
      chrome.permissions.request({ permissions: ['clipboardRead'] }, function (granted) {
         if (granted) {
            // 读取剪贴板内容并发送给内容脚本
            navigator.clipboard.readText().then(function (clipboardText) {
               sendResponse({ clipboardContent: clipboardText });
            });
         }
      });
   }
});

