$(document).ready(function () {

    refresh_user_table();

    $("#addUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        add_new_user_submit();
        refresh_user_table();

    });


    $("#editUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        edit_user_submit();
        refresh_user_table();

    });

    $("#deleteUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        delete_user_submit();
        refresh_user_table();

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

function refresh_user_table() {
    $.ajax({
        url: '/admin/all',
        type: 'GET',
        // data: {
        //     json: jsonData
        // },
        dataType: "json",
        success: function (response) {
            var data = '';
            $.each(response, function (index, value) {
                data += '<tr>';
                data += '<td>' + value.id + '</td>';
                data += '<td>' + value.firstName + '</td>';
                data += '<td>' + value.lastName +  '</td>';
                data += '<td>' + value.login + '</td>';
                data += '<td>' + value.phoneNumber +'</td>';
                data += '<td>' + value.role.name +'</td>';
                data += '<td>' + '' +
                    '<form action="/admin" method="delete" id="deleteUserHid">\n' +
                    '<button class="btn btn-danger btn-xs hidden" type="submit" name="id" value=' + value.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                    '</form>' +
                    '<form action="/admin" method="delete" id="deleteUser">\n' +
                    '<button class="btn btn-danger btn-xs" type="submit" name="id" value=' + value.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                    '</form>' +
                    '' +'</td>';
                data += '<td>' + '' +
                    '<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-warning" attr="data-target=\'#modal-warning\'' + value.id + '">edit</button>\n' +
                    '                                                <div class="modal modal-warning fade in" id="modal-warning + ' + value.id + '" >\n' +
                    '                                                    <div class="modal-dialog">\n' +
                    '                                                        <div class="modal-content">\n' +
                    '                                                            <div class="modal-header">\n' +
                    '                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                    '                                                                    <span aria-hidden="true">×</span></button>\n' +
                    '                                                                <h4 class="modal-title">Edit user</h4>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="modal-body">\n' +
                    '                                                                <form action="/admin" method="put" id="editUser">\n' +
                    '                                                                    <div class="form-group text-center">\n' +
                    '                                                                        <b>Id:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="text" name="id" value="' + value.id + '" id="editId"><br>\n' +
                    '                                                                        <b>First name:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="text" name="firstName" value="' + value.firstName + '" id="editFirstName"><br>\n' +
                    '                                                                        <b>Last name:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="text" name="lastName" value="' + value.lastName + '" id="editLastName"><br>\n' +
                    '                                                                        <b>Phone number:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="text" name="phoneNumber" value="' + value.phoneNumber + '" id="editPhoneNumber"><br>\n' +
                    '                                                                    </div>\n' +
                    '                                                                    <div class="text-center"><b>Role</b>\n' +
                    '                                                                    </div>\n' +
                    '                                                                    <select class="selectpicker" data-live-search="true" data-live-search-style="startsWith" name = "role" id="editRole">\n' +
                    '                                                                        <option value="admin">admin</option>\n' +
                    '                                                                        <option value="user">user</option>\n' +
                    '                                                                    </select>\n' +
                    '                                                                    <br>\n' +
                    '                                                                    <div class="form-group text-center">\n' +
                    '\n' +
                    '                                                                        <b>Login:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="text" name="login" value="' + value.login + '" id="editLogin"><br>\n' +
                    '                                                                        <b>Password:</b><br>\n' +
                    '                                                                        <input class="input-lg" type="password" name="password" id="editPassword">\n' +
                    '                                                                        <br>\n' +
                    '\n' +
                    '                                                                        <div class="modal-footer">\n' +
                    '                                                                            <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>\n' +
                    '                                                                            <button type="submit" class="btn btn-outline">Change</button>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </form>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>' +
                    '' +'</td>';
                data += '</tr>';
            });
            $('#user_table').append(data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });

}

function add_new_user_submit() {

    var user = {}
    user["firstName"] = $("#addFirstName").val();
    user["lastName"] = $("#addLastName").val();
    user["phoneNumber"] = $("#addPhoneNumber").val();
    user["role"] = $("#addRole").val();
    user["login"] = $("#addLogin").val();
    user["password"] = $("#addPassword").val();

    // $("#btn-addUser").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/admin",
        data: JSON.stringify(user),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            // var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
            //     + JSON.stringify(data, null, 4) + "&lt;/pre&gt;";
            // $('#feedback').html(json);

            console.log("SUCCESS : ", data);
            // refreshTable();

            // $("#btn-addUser").prop("disabled", false);

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

            // var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
            //     + e.responseText + "&lt;/pre&gt;";
            // $('#feedback').html(json);
            //
            console.log("ERROR : ", e);
            // $("#btn-addUser").prop("disabled", false);

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

    // $("#btn-editUser").prop("disabled", true);

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/admin/" + id,
        data: JSON.stringify(editUser),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            //
            // var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
            //     + JSON.stringify(data, null, 4) + "&lt;/pre&gt;";
            // $('#feedback').html(json);

            console.log("SUCCESS : ", data);

            // refreshTable();

            // $("#btn-editUser").prop("disabled", false);

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

            // var json = "<h4>Ajax Response</h4>&lt;pre&gt;"
            //     + e.responseText + "&lt;/pre&gt;";
            // $('#feedback').html(json);

            console.log("ERROR : ", e);
            // $("#btn-editUser").prop("disabled", false);

        }
    });

}
//
// function refreshTable() {
//     var table = $('#allUser').DataTable( {
//         paging: false,
//         searching: false,
//         ajax: "data.json"
//     } );
//
//     table.ajax.reload();
// }

function delete_user_submit() {

    var id = $("#delId").val();

    $.ajax({
        type: "DELETE",
        url: "/admin/" + id,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("SUCCESS : ", result);
            // refreshTable();
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });

}

