//transform jquery :contains selector to case insensitive
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};



createUI();
/**
 * Create a Bootstrap dropdown menu.
 * @param {string} name Menu name
 * @param {array} submenus Array of hashes of id and name of the submenus.
 */
function createSubMenu(name, submenus) {

    return `<li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
        aria-haspopup="true" aria-expanded="false">${name}<span class="caret"></a>
      <ul class="dropdown-menu">
      ${submenus.map(entry => `<li><a href="#${entry.id}" aria-controls="#${entry.id}"
        role="button" data-toggle="tab">${entry.label}</a></li>`).join("")}
      </ul>
    </li>`;
}

/**
 * Create a Bootstrap 3 panel for simple (non-nested) metadata. Good for
 * General information, study, etc. but not for lists like model parameters or
 * references.
 *
 * @param {string} title Panel title
 * @param {object} formData Information from UI schema for this metadata
 * @param {object} data Object with keys as the properties ids in formData and
 * values as the actual metadata values.
 */
function createSimplePanel(title, formData, data) {

    return `<div class="panel panel-default">
      <div class="panel-heading">
        <h3>${title}</h3>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <th>Property</th>
            <th>Value</th>
          </thead>
          <tbody>
          ${formData.map(prop => `<tr>
            <td>${prop.label}</td>
            <td>${data && data[prop.id] ? data[prop.id] : ""}</td>
          </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div> <!-- .panel -->`;
}

/**
 * Create a Bootstrap 3 panel for complex (nested) metadata. Good for lists
 * like model parameters or references.
 *
 * @param {string} title Panel title
 * @param {object} formData Information from UI schema for this metadata
 * @param {object} data Object with keys as the properties ids in formData and
 * values as the actual metadata values.
 */
function createComplexPanel(title, formData, data) {

    let rows = [];
    if (data) {
        data.forEach(item => {
            let cells = [];
            formData.forEach(prop => {
                // Short long text to only 25 chars and keep the whole text in title
                let value = item[prop.id] ? item[prop.id] : "";
                let textContent = value.length > 20 ? value.substring(0, 24) + "..." : value;
                cells.push(`<td title="${value}">${textContent}</td>`);
            });

            let newRow = `<tr>${cells.join("")}</tr>`;
            rows.push(newRow);
        });
    }

    return `<div class="panel panel-default">
      <div class="panel-heading">
        <h3>${title}</h3>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            ${formData.map(prop => `<th>${prop.label}</th>`).join("")}
          </thead>
          <tbody>${rows.join("")}</tbody>
        </table>
      </div>
    </div> <!-- .panel -->`;
}

function createPlotPanel(img) {
    //return `<img  style='width:100%' src='data:image/svg+xml;utf8,${img}'/>`;
    return `<img  style='width:100%' src='${img}'/>`;
    //return img;
}

//*******************Sort*******************//
let compare = { // Declare compare object
    name: function(a, b) { // Add a method called name
        a = a.replace(/^the /i, ''); // Remove The from start of parameter
        b = b.replace(/^the /i, ''); // Remove The from start of parameter

        if (a < b) { // If value a is less than value b
            return -1; // Return -1
        } else { // Otherwise
            return a > b ? 1 : 0; // If a is greater than b return 1 OR
        } // if they are the same return 0
    },
    duration: function(a, b) { // Add a method called duration
        a = a.split(':'); // Split the time at the colon
        b = b.split(':'); // Split the time at the colon

        a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
        b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

        return a - b; // Return a minus b
    },
    date: function(a, b) { // Add a method called date
        a = new Date(a); // New Date object to hold the date
        b = new Date(b); // New Date object to hold the date

        return a - b; // Return a minus b
    }
};
async function createUI() {

    createNavBar();

    let body = document.getElementsByTagName("body")[0];

    let container = document.createElement("div");
    container.className = "container-fluid";

    let navBar = createNavBar();
    container.appendChild(navBar);

    let descriptionParagraph = document.createElement("p");
    // TODO: add contents to description paragraph
    container.appendChild(descriptionParagraph);

    let mainTable = document.createElement("div");
    mainTable.id = "MainTable";
    mainTable.innerHTML = `<table id="TableElement" class="sortable table table-sm table-responsive-xl">
        <thead>
          <!--
          <th id="cleft">Check</th>
          -->
          <th class="actives" id="col1" scope="col" data-sort="name">Model Name</th>
          <th class="actives hideColumn" id="col2" scope="col" data-sort="name">ModelID</th>
          <th class="actives" id="colS" data-sort="name">
            <span id="col3">Software</span><br/>
            <span><select id="soft" class="crit"><option >Select</option></select><button id="clearSoft" title="reset" class="glyphicon glyphicon-remove"></button></span>
          </th>
          <th class="actives" id="colE" data-sort="name">
            <span id="col4">Environment</span><br/>
            <span><select id="env" class="crit"><option >Select</option></select><button id="clearEnv" title="reset" class="glyphicon glyphicon-remove"></button></span>
          </th>
          <th class="actives" id="colH" data-sort="name">
            <span id="col5">Hazard</span><br/>
            <span>
              <select id="haz" class="crit"><option >Select</option></select><button id="clearHaz" title="reset" class="glyphicon glyphicon-remove"></button></span>
          </th>
          <th class="actives" id="colT" data-sort="name">
              <span id="col8">Type</span><br/>
              <span>
                <select id="type" class="crit"><option >Select</option></select><button id="clearType" title="reset" class="glyphicon glyphicon-remove"></button></span>
          </th>
          <th class="actives" id="col6" scope="col" data-sort="name">Execution Time </th>
          <th class="actives" id="col7" scope="col" data-sort="name">Upload Date </th>
          <th id="cright">Details</th>
        </thead>
        <tbody id="rows"></tbody>
        </table></div>`;
    container.appendChild(mainTable);

    // details dialog
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal", "fade");
    modalDiv.setAttribute("tabindex", "-1");
    modalDiv.setAttribute("role", "dialog");
    modalDiv.setAttribute("id", "modalFrame")

    modalDiv.innerHTML = `
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                  aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Modal title</h4>
              </div>
              <div class="modal-body">
                <nav class="navbar navbar-default" >
                  <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav" id="viewTab"></ul>
                  </div>
                </nav>
                <div class="tab-content" id="viewContent">
                </div>
              </div>
            </div> <!-- .modal-content -->
          </div> <!-- .modal-dialog -->`;
    container.appendChild(modalDiv);

    body.appendChild(container);
    await fillTable();

    // Populate cache
    $(".table tbody tr").each(function() {
        let rawText = getText(this);
        let formattedText = rawText ? rawText.trim().toLowerCase() : "";

        // Add an object to the cache array
        _cache.push({
            element: this,
            text: formattedText
        });
    });

    // If browser does not support the input event, then use the keyup event
    let search = $("#filter-search"); // Get the input element
    // search metadata backend
    search.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            let query = (this.value == undefined || this.value == "") ? "%20"
            : this.value.trim().toLowerCase(); // Get the query
            searchFullMetadata(query);//JSON.parse(await searchFullMetadata(query));


        }
    });

    // table head
    $("table.sortable thead th").css({
        "background-color": _representation.mainColor,
        "color": "white"
    });

    // numberModels div
    $("#numberModels, #filter-search").css({
        "color": _representation.mainColor,
        "opacity": 0.70
    });

    // Hidden sidenav
    $(".sidenav").css("background-color", _representation.mainColor);

    // Selects
    $("#soft, #env, #haz, #type").css("color", _representation.mainColor);

    // Buttons
    $(".topnav a.Nav").css("background-color", _representation.mainColor)
    $(".detailsButton, .downloadButton").css({
        "background-color": _representation.buttonColor,
        "color": "white",
        "width": "90px"
    });
    $("#clear").css({
        "color": _representation.mainColor,
        "opacity": "0.5"
    });
    $(".glyphicon-remove").css("color", _representation.hoverColor);

    // table head:hover
    $("th.actives.ascending, th.actives.descending, table.sortable th.actives").hover((mouse) => {
        $(this).css("background-color", mouse.type === "mouseenter" ?
            _representation.hoverColor : _representation.mainColor)
    });

    $(".sidenav a.Nav").hover((mouse) => {
        let properties = {
            "background-color": mouse.type === "mouseenter" ?
                _representation.hoverColor : _representation.mainColor,
            "color": "white"
        };
        $(this).css(properties);
    });

    $(".sidenav .closebtn").hover((mouse) => {
        $(this).css("color", mouse.type === "mouseenter" ?
            _representation.hoverColor : "white");
    });

    $(".topnav a.Nav").hover((mouse) => {
        let properties = {
            "background-color": mouse.type === "mouseenter" ?
                _representation.hoverColor : _representation.mainColor,
            "color": "white"
        };
        $(this).css(properties);
    });

    $("#MenuIcon").click(() => document.getElementById("mySidenav").style.width = "250px");
    $('.closebtn').click(() => document.getElementById("mySidenav").style.width = "0");
}


function createNavBar() {
    let navBar = document.createElement("div");
    navBar.id = "Navbar";
    navBar.appendChild(createTopnav());
    navBar.appendChild(createSidenav());

    // add search bar
    navBar.innerHTML += `<div id="searchBar">
          <div>
            <input id="filter-search" class="form-control"  type="search" placeholder="Search" aria-label="Search">
            <span id="clear" class="glyphicon glyphicon-remove-circle"></span>
            <div id="numberModels"></div>
          </div>
        </div>`;

    return navBar
}


function createTopnav() {
    let title1 = _representation.title1; // TODO: get title1 from input

    let topnav = document.createElement("div");
    topnav.className = "topnav";
    topnav.id = "myTopnav";
    topnav.style = `background-color: ${_representation.mainColor};`;
    topnav.innerHTML = `<h1>${title1}</h1>`;

    // Add links
    let menuLink = document.createElement("a");
    menuLink.href = "javascript:void(0)";
    menuLink.style = "font-size:36px;";
    menuLink.className = "icon";
    menuLink.id = "MenuIcon";
    menuLink.innerHTML = '<i style="font-size:26px;" class="material-icons">menu</i></a>';
    topnav.appendChild(menuLink);
    topnav.appendChild(createHardCodedLink(_representation.link1, _representation.linkName1));

    return topnav;
}

function createSidenav() {
    let sidenav = document.createElement("div");
    sidenav.id = "mySidenav";
    sidenav.className = "sidenav";

    // Close button
    sidenav.innerHTML = '<a href="javascript:void(0)" class="closebtn">&times;</a>'

    // Add links
    sidenav.appendChild(createHardCodedLink(_representation.link1, _representation.linkName1));


    return sidenav;
}

function createHardCodedLink(url, text) {
    let navlink = document.createElement("a");
    navlink.className = "Nav";
    navlink.href = url; // url column
    navlink.target = "_blank";
    navlink.innerText = text; // text column


    return navlink;
}



async function fillTable() {

    // These sets are used with the th-filters

    // Load model information table from _representation
    //window.modelInformation = new kt();
    //window.modelInformation.setDataTable(_representation.basicModelInformation);

    // Get full model metadata from _representation
    const metadata = await getMetadata();
    _representation.metadata = metadata;

    const uploadDates = await getUploadDate();
    const executionTimes = await getExecutionTime();
    //let metadata = JSON.parse(metaPromise);


    for (let i = 0; i < metadata.length; i++) {
        let modelMetadata = metadata[i];

        //let currentRow = window.modelInformation.getRows()[i];

        // TODO: ...
        let modelName = getData(modelMetadata, "generalInformation", "name");
        let modelId = getData(modelMetadata, "generalInformation", "identifier");
        let software = getData(modelMetadata, "generalInformation", "software");
        let environment = getScopeData(modelMetadata, "scope", "product", "productName");
        let hazard = getScopeData(modelMetadata, "scope", "hazard", "hazardName");
        let modelType = modelMetadata["modelType"];
        let durationTime = await executionTimes[i];
        let uploadTime = await uploadDates[i];
        let url = _globalVars.downloadEndpoint + i.toString();

        // Update sets
        if (software) _softwareSet.add(software);
        if (environment) environment.forEach(x => {
            _environmentSet.add(x)
        }); //_environmentSet.add(environment);
        if (hazard) hazard.forEach(x => {
            _hazardSet.add(x)
        }); //add(hazard);
        if (modelType) _modelTypeSet.add(modelType);
        //addUniformElements(environment.split(/[,|]/), _environmentSet);
        //addUniformElements(hazard.split("|"), _hazardSet);

        // Add row to table
        $("#rows").append(`<tr id="${i}">
            <!--
            <td><input type="checkbox" class="checkbox1" name="${i}"></td>
            -->
            <td>${modelName}</td>
            <td class="hideColumn">${modelId}</td>
            <td class="softCol columnS">${software}</td>
            <td class="envCol columnS">${Array.from(environment).join(' ')}</td>
            <td class="hazCol columnS">${Array.from(hazard).join(' ')}</td>
            <td class="typeCol columnS">${modelType}</td>
            <td>${durationTime}</td>
            <td>${uploadTime}</td>
            <td>
              <button type="button" class="btn btn-primary detailsButton"
                id="opener${i}">Details</button>
              <br>
              <br>
              ${url ? `<a class="btn btn-primary downloadButton" href="${url}" download>Download</a>` : ""}
              <br>
              <br>
              <button type="button" class="btn btn-primary executeButton" id="executor${i}"
               data-toggle="modal">Execute</button>
              <div id="wrapper${i}"></div>
            </td>

          </tr>`);

        $("#opener" + i).click((event) => buildDialogWindow(event));
        $("#executor" + i).click((event) => buildSimulatorWindow(event));
        //$("#downloader" + i).click((event) => downloadFile(event))
    }

    populateSelectById("soft", _softwareSet);
    populateSelectById("env", _environmentSet);
    populateSelectById("haz", _hazardSet);
    populateSelectById("type", _modelTypeSet);

    $(document).ready(function() {

        // Scrolling: detect a scroll event on the tbody
        $('tbody').scroll((event) => {
            $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
            $('thead th:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
            $('tbody td:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
        });

        // Filter by different software, environment & hazard values
        $('#soft, #env, #haz, #type').on('change', filterByCol);

        // Clear the search bar input
        $("#clear").click(() => {
            $('#rows tr').show();
            $("#filter-search").val("Search");
            $("#numberModels").fadeOut();


            // Clear selects
            let softwareSelect = document.getElementById("soft");

            let environmentSelect = document.getElementById("env");

            let hazardSelect = document.getElementById("haz");

            let modelTypeSelect = document.getElementById("type");

        softwareSelect.options.length = 1;
    environmentSelect.options.length = 1;
     hazardSelect.options.length = 1;
    modelTypeSelect.options.length = 1;

            populateSelect(softwareSelect, _softwareSet,"Select");
                populateSelect(environmentSelect, _environmentSet,"Select");
                populateSelect(hazardSelect, _hazardSet,"Select");
                populateSelect(modelTypeSelect, _modelTypeSet,"Select");
        });

        // Clear the selects of the different filters on button press
        $("#clearSoft").click(() => {
            let softwareSelect = document.getElementById("soft");
            //softwareSelect.options.length = 1;
            softwareSelect.value = "Select";

            filterByCol();
        });

        $("#clearEnv").click(() => {
            let environmentSelect = document.getElementById("env");
            //environmentSelect.options.length = 1;
            environmentSelect.value = "Select";

            filterByCol();
        });

        $("#clearHaz").click(() => {
            let hazardSelect = document.getElementById("haz");
            //hazardSelect.options.length = 1;
            hazardSelect.value = "Select";

            filterByCol();
        });
        $("#clearType").click(() => {
            let modelTypeSelect = document.getElementById("type");
            //modelTypeSelect.options.length = 1;
            modelTypeSelect.value = "Select";

            filterByCol();
        });
        // Sort columns
        $("#col1").click(() => sortColumn("#col1", 1));
        $("#col2").click(() => sortColumn("#col2", 2));
        $("#col3").click(() => sortColumn("#col3", 3));
        $("#col4").click(() => sortColumn("#col4", 4));
        $("#col5").click(() => sortSpan("#col5", 5));
        $("#col8").click(() => sortColumn("#col8", 8));
        $("#col6").click(() => sortColumn("#col6", 6));
        $("#col7").click(() => sortColumn("#col7", 7));


    });
}

/**
 * Populate the options of a select.
 *
 * @param {element} select DOM element
 * @param {array} options Array of possible values
 */
function populateSelect(select, options) {
   // select.innerHTML = "";
   // select.innerHTML = `<option value="Select">Select</option>`;

    options.forEach(entry =>
        select.innerHTML += `<option value="${entry}">${entry}</option>`);
}



function filterSelectOptions(select, options, pickedSelect){

    options.forEach(entry =>{
         if( entry.includes(pickedSelect)){
            select.innerHTML += `<option value="${entry}" selected>${entry}</option>`;
         } else{
            select.innerHTML += `<option value="${entry}">${entry}</option>`;

         }

    });
}



// Multiple filtering for every columns

async function filterColumns(query){
    if (query === "?") {
      query = "";
    }
    const rep = await fetch(_globalVars.filterEndpoint + query);
    return await rep.json();

}


async function filterByCol() {

    let query = "?";

    //let filt = "";

    let selectSoft = $("#soft").val();
    let selectEnv = $("#env").val();
    let selectHaz = $("#haz").val();
    let selectType = $("#type").val();

    if (selectSoft && selectSoft != "" && selectSoft != "Select") {
        query += "software=" + selectSoft;
    }
    if (selectEnv && selectEnv != "" && selectEnv != "Select") {
        query += (query === "?") ? "environment=" : "&environment=";
        query += selectEnv;
    }
    if (selectHaz && selectHaz != "" && selectHaz != "Select") {
        query += (query === "?") ? "hazard=" : "&hazard=";
        query += selectHaz;
    }
    if (selectType && selectType != "" && selectType != "Select") {
        query += (query === "?") ? "type=" : "&type=";
        query += selectType;
    }

    let filteredRowIDs = await filterColumns(query);
    //filteredRowIDs = [2,5];
    filter(filteredRowIDs);
//
//    //rows.hide();
//
    let numberModelsDiv = document.getElementById("numberModels");
//
//    if (select1 == "Select" && select2 == "Select" && select3 == "Select" && select4 == "Select") {
//        rows.show();
//        numberModelsDiv.innerHTML = `Your search return ${rows.length} models`;
//    } else if (select2 == "Select") {
//        if (select1 != "Select" && select3 == "Select") {
//            filt = $(`#MainTable td.softCol:contains("${select1}")`).parent();
//        } else if (select1 != "Select" && select3 != "Select") {
//            filt1 = rows.filter($(`#MainTable td.softCol:contains("${select1}")`).parent());
//            let selRows = rows.filter(filt1);
//            filt = selRows.filter($(`#MainTable td.hazCol:contains("${select3}")`).parent().show());
//            rows.hide();
//        } else if (select1 == "Select" && select3 != "Select") {
//            filt = $(`#MainTable td.hazCol:contains("${select3}")`).parent();
//        } else {
//            filt = ""
//        }
//    } else if (select1 == "Select") {
//        if (select2 != "Select" && select3 == "Select") {
//            filt = `:contains("${select2}")`;
//        } else if (select2 != "Select" && select3 != "Select") {
//            filt = `:contains("${select2}"):contains("${select3}")`;
//        } else if (select2 == "Select" && select3 != "Select") {
//            filt = $(`#MainTable td.hazCol:contains("${select3}")`).parent().show();
//        } else {
//            filt = "";
//        }
//    } else if (select3 == "Select") {
//        if (select1 != "Select" && select2 != "Select") {
//            filt1 = rows.filter($(`#MainTable td.softCol:contains("${select1}")`).parent());
//            var selRows = rows.filter(filt1);
//            filt = selRows.filter($(`#MainTable td.envCol:contains("${select2}")`).parent().show());
//            rows.hide();
//        } else {
//            filt = "";
//        }
//    } else {
//        filt = `:contains("${select1}"):contains("${select2}"):contains("${select3}"):contains("${select4}"`;
//    }


    numberModelsDiv.innerHTML = `Your search returned ${filteredRowIDs.length} models`;

    // Get new sets for the filtered rows
    let softwareSet = new Set();
    let environmentSet = new Set();
    let hazardSet = new Set();
    let modelTypeSet = new Set();
    let rows = $("#rows tr");



filteredRowIDs.forEach(id => {
    if (id >= 18){return}
     let software = rows[id].getElementsByTagName("td")[2].innerText;
            let environment = rows[id].getElementsByTagName("td")[3].innerText;
            let hazard = rows[id].getElementsByTagName("td")[4].innerText;
            let modelType = rows[id].getElementsByTagName("td")[5].innerText;

            // Split some entries joined with commas
//            softwareSet.add(software);
              environmentSet.add(environment);
//            hazardSet.add(hazard);
//            modelTypeSet.add(modelType);
            addUniformElements(software.split(/[,|]/), softwareSet);
            //addUniformElements(environment.split(/[,|]/), environmentSet);
            addUniformElements(hazard.split(/[,|]/), hazardSet);
            //addUniformElements(modelType.split(/[,|]/), modelTypeSet);
            modelTypeSet.add(modelType);
    });


    // Clear filters and populated them with the filtered results
    let softwareSelect = document.getElementById("soft");
    if(softwareSelect.selectedOptions[0].value != "Select"){
        softwareSet.add(softwareSelect.selectedOptions[0].value)
    }
    softwareSelect.options.length = 1;
    filterSelectOptions(softwareSelect, softwareSet, selectSoft);

    let environmentSelect = document.getElementById("env");

    if( environmentSelect.selectedOptions[0].value != "Select"){
        environmentSet.add(environmentSelect.selectedOptions[0].value)
    }
    environmentSelect.options.length = 1;
    filterSelectOptions(environmentSelect, environmentSet, selectEnv);

    let hazardSelect = document.getElementById("haz");
    if( hazardSelect.selectedOptions[0].value != "Select"){
      hazardSet.add(hazardSelect.selectedOptions[0].value)
    }
    hazardSelect.options.length = 1;
    filterSelectOptions(hazardSelect, hazardSet, selectHaz);
    //hazardSelect.value = selectHaz;

    let modelTypeSelect = document.getElementById("type");
    if( modelTypeSelect.selectedOptions[0].value != "Select"){
         modelTypeSet.add(modelTypeSelect.selectedOptions[0].value)
    }
    modelTypeSelect.options.length = 1;
    filterSelectOptions(modelTypeSelect, modelTypeSet, selectType);
    //modelTypeSelect.value = selectType;
    // If no filters, restore the selects and numberModelsDiv
    if (query == "?") {
    softwareSelect.options.length = 1;
    environmentSelect.options.length = 1;
    hazardSelect.options.length = 1;
      modelTypeSelect.options.length = 1;
        populateSelect(softwareSelect, _softwareSet);
        populateSelect(environmentSelect, _environmentSet);
        populateSelect(hazardSelect, _hazardSet);
        populateSelect(modelTypeSelect, _modelTypeSet);
        numberModelsDiv.innerHTML = " ";
    }
}

// Convert first letter to uppercase
function capitalize(element) {
    return element.charAt(0).toUpperCase() + element.slice(1);
}
// Add elements previously splitted to a set
function addUniformElements(uniformedElement, targetSet) {
    for (let en of uniformedElement) {
        let element = capitalize(en.trim());
        targetSet.add(element);
    }
}

/**
 * Populate the options of a select.
 * 
 * @param {string} selectId Id of a select
 * @param {array} options Array of possible values
 */
function populateSelectById(selectId, options) {
    let select = document.getElementById(selectId);
    //select.innerHTML = "";
    options.forEach(entry =>
        select.innerHTML += `<option value="${entry}">${entry}</option>`);
}


/**
 * Get a metadata property or return empty string if missing.
 * @param {object} modelMetadata Whole metadata of a model
 * @param {string} toplevel Name of the metadata component. It can be
 *  *generalInformation*, *scope*, *dataBackground* or *modelMath*.
 * @param {string} name Name of the metadata property 
 */
function getData(modelMetadata, toplevel, name) {
    try {
        return modelMetadata[toplevel][name];
    } catch (err) {
        return "no information for " + name;
    }
}
/**
 * Get a metadata property or return empty string if missing.
 * @param {object} modelMetadata Whole metadata of a model
 * @param {string} toplevel Name of the metadata component. It can be
 *  *generalInformation*, *scope*, *dataBackground* or *modelMath*.
 * @param {string} sublevel Name of metadata comonent like *product*, *hazard*
 * @param {string} name Name of the metadata property 
 */
function getScopeData(modelMetadata, toplevel, sublevel, name) {

    try {
        let subs = modelMetadata[toplevel][sublevel];
        names = new Set();
        subs.forEach(function(it) {
            let element = it[name];
            if (!element)
                element = it["name"];
            names.add(element);
        })
        return names;




    } catch (err) {
        return new Set().add("no information");
    }
}


/**
 * Convert a time string of format 1d 3h 4m 5s to ISO date string.
 */
function convertKnimeTimeToISO(knimeTime) {
    let numberTimeArray = [];
    for (let numberTime of knimeTime.match(/[a-zA-Z]+|[0-9]+/g)) {
        if (numberTime == "d") {
            numberTime = 216000;
        } else if (numberTime == "h") {
            numberTime = 3600;
        } else if (numberTime == "m") {
            numberTime = 60;
        } else if (numberTime == "s") {
            numberTime = 1;
        } else {
            numberTime = parseInt(numberTime);
        };

        numberTimeArray.push(numberTime);
    }
}


function sortColumn(idName, column) {

    let table = $(".sortable"); // This sortable table
    let tbody = table.find("tbody"); // Store table body
    let rows = tbody.find("tr").toArray(); // Store array containing rows
    let header = $(idName); // Get the header
    let order = header.data("sort"); // Get data-sort attribute

    // If selected item has ascending or descending class, reverse contents
    if (header.is('.ascending') || header.is('.descending')) {
        header.toggleClass('ascending descending'); // Toggle to other class
        tbody.append(rows.reverse()); // Reverse the array
    } else { // Otherwise perform a sort                            
        header.addClass('ascending'); // Add class to header
        // Remove asc or desc from all other headers
        header.siblings().removeClass('ascending descending');
        if (compare.hasOwnProperty(order)) { // If compare object has method
            rows.sort(function(a, b) { // Call sort() on rows array
                a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
                b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
                return compare[order](a, b); // Call compare method
            });
            tbody.append(rows);
        }
    }
}

function sortSpan(idName, column) {
    let table = $(".sortable"); // This sortable table
    let tbody = table.find('tbody'); // Store table body
    let rows = tbody.find('tr').toArray(); // Store array containing rows

    let header = $(idName).parents('th'); // Get the header

    let order = header.data('sort'); // Get value of data-sort attribute

    // If selected item has ascending or descending class, reverse contents
    if (header.is('.ascending') || header.is('.descending')) {
        header.toggleClass('ascending descending'); // Toggle to other class
        tbody.append(rows.reverse()); // Reverse the array
    } else { // Otherwise perform a sort                            
        header.addClass('ascending'); // Add class to header
        // Remove asc or desc from all other headers
        header.siblings().removeClass('ascending descending');
        if (compare.hasOwnProperty(order)) { // If compare object has method
            console.log(column);
            rows.sort(function(a, b) { // Call sort() on rows array
                a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
                b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
                return compare[order](a, b); // Call compare method
            });
            tbody.append(rows);
        }
    }
};

// Content elements for Searchfunction
function getText(element) {
    let text;

    if (element.outerText) {
        text = element.outerText.trim();
    } else if (element.innerText) {
        text = element.innerText.trim();
    } else {
        text = "";
    }

    if (element.childNodes) {
        element.childNodes.forEach(child => text += getText(child));
    }

    return text;
}
async function searchFullMetadata(query){
    const rep = await fetch(_globalVars.searchEndpoint + query);
    filter(await rep.json());


}
async function filter(filteredRows) {



//    // TODO: what is p???
    _cache.forEach(function(p) { // For each entry (<tr>) in cache pass image
        p.element.style.display = filteredRows.includes(parseInt(p.element.id)) ? "" : "none"; // Show/Hide
        let numberOfVisibleRows = $("tbody tr:visible").length;
        document.getElementById("numberModels").innerHTML = `Your search returned ${numberOfVisibleRows} models`;
    })
}

function effect(target) {
    $(target).button("loading");
}

function downloadFile(event) {
    // downloader id has format "downloader{i}" where i is the model number (10th char)
    let downloaderId = event.target.id;
    let modelNumber = downloaderId.substr(10);

    fetch(_globalVars.downloadEndpoint + modelNumber);
}
async function buildDialogWindow(event) {

    // button id has format "opener{i}" where i is the model number (6th char)
    let buttonId = event.target.id;
    let modelNumber = buttonId.substr(6);

    const metaPromise = _representation.metadata; //await getMetadata();
    let metadata = metaPromise[modelNumber];
    const imgBlob = await getImage(metadata.generalInformation.identifier);

    //let image = window.modelInformation.getRows()[modelNumber].data[0];
    let image = URL.createObjectURL(imgBlob); //new Image();
    // Update .modal-title
    if (metadata.generalInformation && metadata.generalInformation.name) {
        $(".modal-title").text(metadata.generalInformation.name);
    }

    // Get appropiate metadata handler for the model type.
    let handler;
    if (metadata.modelType === "genericModel") {
        handler = new GenericModel(metadata, image);
    } else if (metadata.modelType === "dataModel") {
        handler = new DataModel(metadata, image);
    } else if (metadata.modelType === "predictiveModel") {
        handler = new PredictiveModel(metadata, image);
    } else if (metadata.modelType === "otherModel") {
        handler = new OtherModel(metadata, image);
    } else if (metadata.modelType === "toxicologicalModel") {
        handler = new ToxicologicalModel(metadata, image);
    } else if (metadata.modelType === "doseResponseModel") {
        handler = new DoseResponseModel(metadata, image);
    } else if (metadata.modelType === "exposureModel") {
        handler = new ExposureModel(metadata, image);
    } else if (metadata.modelType === "processModel") {
        handler = new ProcessModel(metadata, image);
    } else if (metadata.modelType === "consumptionModel") {
        handler = new ConsumptionModel(metadata, image);
    } else if (metadata.modelType === "healthModel") {
        handler = new HealthModel(metadata, image);
    } else if (metadata.modelType === "riskModel") {
        handler = new RiskModel(metadata, image);
    } else if (metadata.modelType === "qraModel") {
        handler = new QraModel(metadata, image);
    } else {
        handler = new GenericModel(metadata, image);
    }

    document.getElementById("viewTab").innerHTML = handler.menus;

    // Add tab panels
    let viewContent = document.getElementById("viewContent");
    viewContent.innerHTML = ""; // First remove old tabs

    // Add new tabs from handler
    Object.entries(handler.panels).forEach(([key, value]) => {

        // Create a tab from the panel (value)
        let tabPanel = document.createElement("div");
        tabPanel.setAttribute("role", "tabpanel");
        tabPanel.className = "tab-pane";
        tabPanel.id = key;
        tabPanel.innerHTML = value;

        viewContent.appendChild(tabPanel); // Add new tabPanel
    });

    // Set the first tab (general information) as active
    document.getElementById("generalInformation").classList.add("active");

    $(".modal").modal("show");
}



async function getImage(identifier) {

    const rep = await fetch(_globalVars.imageEndpoint + identifier);
    const j = await rep.blob();
    // .then(function(data) {
    //  // console.log(JSON.stringify(data));
    //   mystuff = data;
    // });
    return j;
}
async function getMetadata() {


    const rep = await fetch(_globalVars.metadataEndpoint);
    const j = await rep.json();
    // .then(function(data) {
    //  // console.log(JSON.stringify(data));
    //   mystuff = data;
    // });
    return j;
}
async function getUploadDate() {
    let date = [];
    metadata = _representation.metadata;
    for (let i = 0; i < metadata.length; i++) {
        const resp = await fetch(_globalVars.uploadDateEndpoint + i);
        date.push(resp.text())
    }
    return date;
}

async function getExecutionTime() {
    let times = [];
    metadata = _representation.metadata;
    for (let i = 0; i < metadata.length; i++) {
        const resp = await fetch(_globalVars.executionTimeEndpoint + i);
        times.push(resp.text())
    }
    return times;
}