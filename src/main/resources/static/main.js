$(document).ready(function () {

    $("#addUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        add_new_user_submit();

    });


    $("#editUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        edit_user_submit();

    });

    $("#deleteUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        delete_user_submit();

    });

    // var table = $('#allUser').DataTable( {
    //     ajax: "data.json"
    // } );
    //
    // setInterval( function () {
    //     table.ajax.reload();
    // }, 3000 );

    //
    //
    // $('#allUser').bootstrap('refresh')

    //
    // var table = document.getElementById ("allUser");
    // table.refresh ();

    //
    // var table = $('#allUser').DataTable( {
    //     paging: false,
    //     searching: false
    // });
    //
    // table.ajax.reload();
    //
    // $.pjax.reload($('#allUser'), { type: "GET", timeout: 6000});

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

            refreshTable();

            //
            // $('#allUser').bootstrap('refresh')
            //
            //
            // var table = document.getElementById ("allUser");
            // table.refresh ();
            //
            //
            // var table = $('#allUser').DataTable();
            //
            // table.ajax.reload();
            //
            // $.pjax.reload($('#allUser'), { type: "GET", timeout: 6000});

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


function edit_user_submit() {

    var id = $("#editId").val();

    var editUser = {}
    editUser["id"] = $("#editId").val();
    editUser["firstName"] = $("#editFirstName").val();
    editUser["lastName"] = $("#editLastName").val();
    editUser["phoneNumber"] = $("#editPhoneNumber").val();
    editUser["role"] = $("#editRole").val();
    editUser["login"] = $("#editLogin").val();
    editUser["password"] = $("#editPassword").val();

    $("#btn-editUser").prop("disabled", true);

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/admin/" + id,
        data: JSON.stringify(editUser),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
                + JSON.stringify(data, null, 4) + "&lt;/pre&gt;";
            $('#feedback').html(json);

            console.log("SUCCESS : ", data);
            $("#btn-editUser").prop("disabled", false);

            // refreshTable();

            //
            // $('#allUser').bootstrap('refresh')
            //
            //
            // var table = document.getElementById ("allUser");
            // table.refresh ();
            //
            //
            // var table = $('#allUser').DataTable();
            //
            // table.ajax.reload();
            //
            // $.pjax.reload($('#allUser'), { type: "GET", timeout: 6000});

        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
                + e.responseText + "&lt;/pre&gt;";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-editUser").prop("disabled", false);

        }
    });

}



function refreshTable() {
    var table = $('#allUser').DataTable( {
        paging: false,
        searching: false,
        ajax: "data.json"
    } );

    table.ajax.reload();
}

function delete_user_submit() {

    var id = $("#delId").val();

    $.ajax({
        type: "DELETE",
        url: "/admin/" + id,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("SUCCESS : ", result);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });

}