function find_and_replace(class_name, text) {
    var elements = document.getElementsByClassName(class_name);
    var size = elements.length;
    for ( var i = 0; i < size ; i++) {
        elements[i].value = elements[i].value.replace(text, '');
        elements[i].jsaction = '';
        elements[i].my_param = text;
        elements[i].addEventListener("keydown", function(event) {
            // event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementsByClassName('gLFyf gsfi');
                var size = elements.length;
                for (var i = 0; i < size ; i++) {
                    elements[i].value = elements[i].my_param.concat(elements[i].value);
                }
            }
        }, false);
    }
}

if (document.title.indexOf("Google") != -1) {
    testArray = [""];
    chrome.storage.sync.get({
            list:testArray},
        function(data) {
            testArray = data.list;

            if(testArray.length == 0 || testArray[0].localeCompare("") == 0) {
                console.log("Empty storage");
                return;
            }

            var filterLine = "";
            for(var i = 0; i < testArray.length; i++)
            {
                filterLine = filterLine.concat("-site:" + testArray[i] + " ");
            }
            
            document.title = document.title.replace(filterLine, '');
            find_and_replace('gLFyf gsfi', filterLine);
        });
}
