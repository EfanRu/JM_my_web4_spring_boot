$(document).ready(function () {

    $("#addUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        add_new_user_submit();

    });

    var table = $('#allUser').DataTable();

    table.ajax.reload( function ( json ) {
        $('#refreshTable').val( json.lastInput );
    } );


});

function add_new_user_submit() {

    var user = {}
    user["firstName"] = $("#addFirstName").val();
    user["lastName"] = $("#addLastName").val();
    user["phoneNumber"] = $("#addPhoneNumber").val();
    user["role"] = $("#addRole").val();
    user["login"] = $("#addLogin").val();
    user["password"] = $("#addPassword").val();

    $("#btn-addUser").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/admin",
        data: JSON.stringify(user),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
                + JSON.stringify(data, null, 4) + "&lt;/pre&gt;";
            $('#feedback').html(json);

            console.log("SUCCESS : ", data);
            $("#btn-addUser").prop("disabled", false);

        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
                + e.responseText + "&lt;/pre&gt;";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-addUser").prop("disabled", false);

        }
    });

}