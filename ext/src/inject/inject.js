var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (addedNode) {
      var isSet = document.querySelector("#chase-amazon-ext");
      if (isSet === null) {
        const $amzOrderNumber = document.querySelector(
          "#transactionFlyoutContainer > div:nth-child(6) > div > dl > div:nth-child(7) > dt"
        );
        if ($amzOrderNumber) {
          // console.log("🔶 Amazon order number found.");

          if ($amzOrderNumber.textContent === "Amazon order number") {
            const orderNumberElem = document.querySelector(
              "#transactionFlyoutContainer > div:nth-child(6) > div > dl > div:nth-child(7) > dd"
            );
            if (orderNumberElem) {
              var orderNumber = orderNumberElem.textContent;
              // console.log(`🟧 ${orderNumber} 🟧`);
              var newlink = document.createElement("a");
              newlink.setAttribute("target", "_amazon");
              newlink.setAttribute(
                "href",
                "https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_search?opt=ab&search=" +
                  orderNumber
              );
              newlink.text = "Search Amazon";
              newlink.setAttribute(
                "style",
                "background-color: #FF9900; padding: 3px; border: 1px solid black; color: black"
              );
              newlink.id = "chase-amazon-ext";

              orderNumberElem.appendChild(newlink);
            }
          }
        }
      }
    });
  });
});

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      console.log("Observing DOM changes for chase-amazon extension");
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }, 10);
});
