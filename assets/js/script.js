var containerEl = $('container');
var submitBtn = $('#formSubmit');
var table = $('projTable');
var pName = $('projName');
var pType = $('projType');
var pDate = $('projDate');
var remove = $('<a>');
var projList = [];

var timerInterval = setInterval(function () {

var today = dayjs();
$('#currDateTime').text(today.format('MMM D, YYYY [at] h:mm:ss a '));

}, 1000);

submitBtn.on('click', function (event) {
    event.preventDefault()
    console.log("submit button on form clicked");

    var pName = $('input[name="projName"]');
    var pType = $('#projType');
    var pDate = $('input[name="projDate"]');

    console.log('name = ' + pName.val());
    console.log('type = ' + pType.find(":selected").text());
    console.log('date = ' + pDate.val());


    var tableBody = $("#projTable tbody");

    tableBody.append(
        // '<tr onclick=\'removeRow(this)\'>'
        '<tr data-state=\"visible\">'
        + '<td>' + pName.val() + '</td>'
        + '<td>' + pType.find(":selected").text() + '</td>'
        + '<td>' + pDate.val() + '</td>'
        + '<td><a href="#" id="removeProj" class="link-danger">X</a></td>'
        + '</tr>'
    );

    //userScore object to store scores in local storage
    var rowData = {
        name: pName.val().trim(),
        type: pType.find(":selected").text(),
        due: pDate.val()
    };

    //add the latest userScore to the ScoreList
    projList[projList.length] = rowData;

    //weite scoreList to local storage
    localStorage.setItem("projList", JSON.stringify(projList));

    // Empty out after add to prepare for next add
    pName.val('');
    pType.find(":selected").prop('selected', false);
    pDate.val('');

    //$('#projInfoModal').modal('toggle');;
});


$(function(){
    $('table').on('click','tr a',function(e){
       e.preventDefault();
   
       var index = $(this).closest('td').parent()[0].sectionRowIndex;

      $(this).parents('tr').remove();

      projList.splice(index,1);
      localStorage.setItem("projList", JSON.stringify(projList));
    });
});

function createRow(row){
    var tableBody = $("#projTable tbody");
 
    tableBody.append(
        '<tr>'
        + '<td>' + row.name + '</td>'
        + '<td>' + row.type + '</td>'
        + '<td>' + row.due + '</td>'
        + '<td><a href="#" id="removeProj" class="link-danger">X</a></td>'
        + '</tr>'
    );
}

function writeTableToLocalStorage(){

}

function initTable(){
     //get stored scores
     var storedList = JSON.parse(localStorage.getItem("projList"));
     if (storedList !== null) {
         projList = storedList;
     }

     for(var i = 0; i < projList.length; i++){
        createRow(projList[i]);
     }
}

initTable();