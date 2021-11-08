function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  var tagName = node.tagName ? node.tagName.toLowerCase() : "";
  if (tagName == "input" || tagName == "textarea") {
    return;
  }
  if (node.classList && node.classList.contains("ace_editor")) {
    return;
  }

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/\bweb3\b/g, "my butt");
  v = v.replace(/\bweb 3\b/g, "my butt");
  v = v.replace(/\bWeb3\b/g, "My Butt");
  v = v.replace(/\bWeb 3\b/g, "My Butt");

  textNode.nodeValue = v;
}

document.addEventListener("DOMContentLoaded", (event) => {
  walk(document.body);

  // run when mouse moves
  document.addEventListener("mousemove", (event) => {
    console.log("mouse move");

    // hack for twitter to make it continuously scan
    if (window.location.hostname === "twitter.com") {
      walk(document.body);
    }
  });
});
