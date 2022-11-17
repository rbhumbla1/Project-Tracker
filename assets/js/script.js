var containerEl = $('container');
var submitBtn = $('#formSubmit');
var table = $('projTable');
var pName = $('projName');
var pType = $('projType');
var pDate = $('projDate');
var remove = $('<a>')
var projCount = 0;

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
    console.log(tableBody);

    var nameX = "X" + projCount;
    projCount++;

    tableBody.append(
        '<tr onclick=\'removeRow(this)\'>'
        + '<td>' + pName.val() + '</td>'
        + '<td>' + pType.find(":selected").text() + '</td>'
        + '<td>' + pDate.val() + '</td>'
        + '<td><a href="#" id="removeProj" class="link-danger">X</a></td>'
        + '</tr>'
    );

    pName.val('');
    pType.find(":selected").prop('selected', false);
    pDate.val('');

    //$('#projInfoModal').modal('toggle');;
});

containerEl.on('click', function(){
    console.log("on click X");
});

function removeRow(x){
    console.log("remove row");
}

$(function(){
    $('table').on('click','tr a',function(e){
       e.preventDefault();
      $(this).parents('tr').remove();
    });
});