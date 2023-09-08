document.addEventListener("DOMContentLoaded", function () {
   chrome.contextMenus.create({
     title: "填充剪贴板",
     contexts: ["editable"],
     onclick: function () {
       chrome.permissions.request({ permissions: ['clipboardRead'] }, function (granted) {
         if (granted) {
           navigator.clipboard.readText().then(function (clipboardText) {
             document.getElementById("clipboard-content").innerText = clipboardText;
           });
         }
       });
     }
   });
 });
 