function addFilter() {
    testArray = [""];
    newArrEntry = document.getElementById("site").value;
    if(newArrEntry.localeCompare("") == 0)
    {
        console.log("Empty string added");
        return;
    }

    chrome.storage.sync.get({
        list:testArray},
        function(data) {

        testArray = data.list;

        for(var i = 0; i < testArray.length; i++) {
            console.log("Element \"" + testArray[i] + "\"");
            if(testArray[i].localeCompare(newArrEntry) == 0) {
                console.log("Element \"" + newArrEntry + "\" exists!");
                document.getElementById("site").value = "";
                return;
            }
        }

        if(testArray.length == 1 && testArray[0].localeCompare("") == 0) {
            testArray[0] = newArrEntry;
        }
        else {
            testArray.push(newArrEntry);
        }

        chrome.storage.sync.set( {list:testArray}, function() {
            console.log("Saved a new array item");
            document.getElementById("site").value = "";
            table_redraw();
        });
    });
}

function removeFilter()
{
    testArray = [""];
    elementId = this.id;
    chrome.storage.sync.get({
            list:testArray},
        function(data) {

            testArray = data.list;


            testArray.splice(elementId, 1);
            console.log(elementId);

            chrome.storage.sync.set( {list:testArray}, function() {
                console.log("Saved a new array item");
                document.getElementById("site").value = "";
                table_redraw();
            });
        });
}

function table_redraw()
{
    testArray = [""];
    chrome.storage.sync.get({
            list:testArray},
        function(data) {
            testArray = data.list;
            var div = document.getElementById("table");
            var searchExtension = document.getElementById("search_extension");
            div.innerHTML = "";
            searchExtension.innerHTML = "Add this text after \"q=\" in your search provider URL:<br>\"";

            if(testArray.length == 0 || testArray[0].localeCompare("") == 0) {
                console.log("Empty storage");
                searchExtension.innerHTML = searchExtension.innerHTML.concat("\"");
                return;
            }
            var table = document.createElement("TABLE");
            // table.bgColor = "red";
            div.appendChild(table);
            var row;
            var btn;

            for(var i = 0; i < testArray.length; i++)
            {
                if(i != 0)
                {
                    searchExtension.innerHTML = searchExtension.innerHTML.concat(" ");
                }
                row = table.insertRow();
                row.insertCell(0).innerHTML = testArray[i];
                btn = document.createElement("BUTTON");
                btn.id = i;
                btn.textContent = "delete";
                btn.addEventListener('click', removeFilter);
                row.insertCell(1).appendChild(btn);
                searchExtension.innerHTML = searchExtension.innerHTML.concat("-site:" + testArray[i]);
            }
            searchExtension.innerHTML = searchExtension.innerHTML.concat("\"");
        });
}


document.addEventListener('DOMContentLoaded', table_redraw);
document.getElementById('add').addEventListener('click', addFilter);
