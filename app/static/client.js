var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

// function analyze() {
//   var uploadFiles = el("file-input").files;
//   if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

//   el("analyze-button").innerHTML = "Analyzing...";
//   var xhr = new XMLHttpRequest();
//   var loc = window.location;
//   xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
//     true);
//   xhr.onerror = function() {
//     alert(xhr.responseText);
//   };
//   xhr.onload = function(e) {
//     if (this.readyState === 4) {
//       var response = JSON.parse(e.target.responseText);
//       el("result-label").innerHTML = `This is most likely ${response["result"]}`;
//       el("plot-label").innerHTML = `${response["plot"]}`;
//     }
//     el("analyze-button").innerHTML = "Analyze";
//   };

//   var fileData = new FormData();
//   fileData.append("file", uploadFiles[0]);
//   xhr.send(fileData);
// }

function analyze() {
  var fileData = new FormData();

  var uploadFiles = el("file-input").files;    //check for uploaded image
  var fileName = el("upload-label").innerHTML; //check for chosen filename

  if (uploadFiles.length === 1) {
    fileData.append("file", uploadFiles[0]);
  } else if (fileName !== "No file chosen") {
    fileData.append("filename", fileName);
  } else {
    alert("Please select a file to analyze!");
    return;
  }

  el("analyze-button").innerHTML = "Analyzing...";
  el("result-label").innerHTML = "<em>Please be patient: this may take up to 20 seconds.</em>";
  el("spinner").className = "";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `This is most likely ${response["result"]}`;
      el("plot-label").innerHTML = `${response["plot"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
    el("spinner").className = "no-display";
  };

  xhr.send(fileData);
}

