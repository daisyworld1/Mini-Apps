
document.getElementById('import').onclick = function() {
    var files = document.getElementById('selectFiles').files;
    console.log('file: ', files)
    var fr = new FileReader();
    fr.readAsText(files.item(0));
    fr.onload = function(e) { 
      console.log(e.target.result);
      $.post("http://localhost:3000/toCSV",
      { json: e.target.result },
      function(data){
        $('#result').val(data);
      });
    }
  };

//create a link for user to download csv file
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("result").value;
    var filename = "myFile.csv";
    
    download(filename, text);
}, false);


