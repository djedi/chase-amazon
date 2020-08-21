var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (addedNode) {
      var isSet = document.querySelector("#chase-amazon-ext");
      if (isSet === null) {
        var mdslink = document.querySelector("mds-link[id$=OrderNumber]");
        if (mdslink) {
		  console.log(mdslink);
          var link = mdslink.shadowRoot.querySelector("a");
          var orderNumber = link.text;
          var newlink = document.createElement("a");
          newlink.setAttribute("target", "_amazon");
          newlink.setAttribute(
            "href",
            "https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_search?opt=ab&search=" +
              orderNumber
          );
		  newlink.text = "Search Amazon";
		  newlink.setAttribute('style', 'background-color: yellow; padding: 3px; border: 1px solid navy;')
          newlink.id = "chase-amazon-ext";
          document.querySelector("#transactionFlyoutContainer > div:nth-child(6) > div > dl > div:last-child > dd")
            .appendChild(newlink);
        }
      }
    });
  });
});

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
	  clearInterval(readyStateCheckInterval);
	  console.log('Observing DOM changes for chase-amazon extension');
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }, 10);
});
