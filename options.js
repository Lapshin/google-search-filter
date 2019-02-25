function addFilter() {
    filterSitesArray = [""];
    newArrEntry = document.getElementById("site").value;
    if(newArrEntry.localeCompare("") == 0)
    {
        console.log("Empty string added");
        return;
    }

    chrome.storage.sync.get({
        filterSites:filterSitesArray},
        function(data) {

        filterSitesArray = data.filterSites;

        for(var i = 0; i < filterSitesArray.length; i++) {
            console.log("Element \"" + filterSitesArray[i] + "\"");
            if(filterSitesArray[i].localeCompare(newArrEntry) == 0) {
                console.log("Element \"" + newArrEntry + "\" exists!");
                document.getElementById("site").value = "";
                return;
            }
        }

        if(filterSitesArray.length == 1 && filterSitesArray[0].localeCompare("") == 0) {
            filterSitesArray[0] = newArrEntry;
        }
        else {
            filterSitesArray.push(newArrEntry);
        }

        chrome.storage.sync.set( {filterSites:filterSitesArray}, function() {
            console.log("Saved a new array item");
            document.getElementById("site").value = "";
            table_redraw();
        });
    });
}

function removeFilter()
{
    filterSitesArray = [""];
    elementId = this.id;
    chrome.storage.sync.get({
            filterSites:filterSitesArray},
        function(data) {

            filterSitesArray = data.filterSites;


            filterSitesArray.splice(elementId, 1);
            console.log(elementId);

            chrome.storage.sync.set( {filterSites:filterSitesArray}, function() {
                console.log("Saved a new array item");
                document.getElementById("site").value = "";
                table_redraw();
            });
        });
}

function table_redraw()
{
    filterSitesArray = [""];
    chrome.storage.sync.get({
            filterSites:filterSitesArray},
        function(data) {
            filterSitesArray = data.filterSites;
            var div = document.getElementById("table");
            var searchExtension = document.getElementById("search_extension");
            div.innerHTML = "";
            searchExtension.innerHTML = "Add this text after \"q=\" in your search provider URL:<br>\"";

            if(filterSitesArray.length == 0 || filterSitesArray[0].localeCompare("") == 0) {
                console.log("Empty storage");
                searchExtension.innerHTML = searchExtension.innerHTML.concat("\"");
                return;
            }
            var table = document.createElement("TABLE");
            // table.bgColor = "red";
            div.appendChild(table);
            var row;
            var btn;

            for(var i = 0; i < filterSitesArray.length; i++)
            {
                if(i != 0)
                {
                    searchExtension.innerHTML = searchExtension.innerHTML.concat(" ");
                }
                row = table.insertRow();
                row.insertCell(0).innerHTML = filterSitesArray[i];
                btn = document.createElement("BUTTON");
                btn.id = i;
                btn.textContent = "delete";
                btn.addEventListener('click', removeFilter);
                row.insertCell(1).appendChild(btn);
                searchExtension.innerHTML = searchExtension.innerHTML.concat("-site:" + filterSitesArray[i]);
            }
            searchExtension.innerHTML = searchExtension.innerHTML.concat("\"");
        });
}


document.addEventListener('DOMContentLoaded', table_redraw);
document.getElementById('add').addEventListener('click', addFilter);
