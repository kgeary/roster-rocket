function download(content, fileName = 'classes.csv', contentType = 'text/plain') {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export default download;
