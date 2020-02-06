$(document).ready(function () {

    // update_table();
    clean_user_table();
    refresh_user_table();

    $("#addUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        add_new_user_submit();
        clean_user_table();
        // update_table();
        refresh_user_table();
        // clean_user_table();

    });


    // $("#editUser").submit(function (event) {
    $("#editUserBut").submit(function () {

        //stop submit the form, we will post it manually.
        // event.preventDefault();

        edit_user_submit();
        // update_table();
        clean_user_table();
        refresh_user_table();
        // clean_user_table();
    });

    // $("#deleteUser").submit(function (event) {
    $("#deleteUser").submit(function () {

        //stop submit the form, we will post it manually.
        // event.preventDefault();

        delete_user_submit();
        clean_user_table();

        // update_table();

        refresh_user_table();
        // clean_user_table();
    });

    function update_table() {
        // $("#allUsers").after(function () {
        //     var id = $("#idAllUsers").val();
            var id = 0;
        //     var id = $(this).val();
            $.ajax({
                url: '/admin/all',
                type: 'GET',
                dataType: "json",
                success: function (users) {
                    var data = '';
                    // var user = value[id];

                    // var userIndex = $('#userIndex').val();
                    // var userIndex = $(this).val();
                    $.each(users, function (index, user) {
                    //     if (userIndex === value.id) {
                    data += '<td>' + user.id + '</td>';
                    data += '<td>' + user.firstName + '</td>';
                    data += '<td>' + user.lastName + '</td>';
                    data += '<td>' + user.login + '</td>';
                    data += '<td>' + user.phoneNumber + '</td>';
                    data += '<td>' + user.role.name + '</td>';
                    // }
                    });
                    // $('#allUsers tr').remove();
                    $('#idAllUsers').append(data);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            })

        // });
    }


        function clean_user_table() {
            $('#user_table tr').remove();
        }


        function refresh_user_table() {
            $.ajax({
                url: '/admin/all',
                type: 'GET',
                dataType: "json",
                success: function (response) {
                    var data = '';
                    $.each(response, function (index, value) {
                        data += '<tr>';
                        data += '<td>' + value.id + '</td>';
                        data += '<td>' + value.firstName + '</td>';
                        data += '<td>' + value.lastName + '</td>';
                        data += '<td>' + value.login + '</td>';
                        data += '<td>' + value.phoneNumber + '</td>';
                        data += '<td>' + value.role.name + '</td>';
                        data += '<td>' + '' +
                            '<form action="/admin" method="delete" id="deleteUserHid">\n' +
                            '<button class="btn btn-danger btn-xs hidden" type="submit" name="id" value=' + value.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                            '</form>' +
                            '<form action="/admin" method="delete" id="deleteUser">\n' +
                            '<button class="btn btn-danger btn-xs" type="submit" name="id" value=' + value.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                            '</form>' +
                            '' +'</td>';
                        data += '<td>' + '' +
                            // '<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-warning" attr="data-target=\'#modal-warning\'' + value.id + '">edit</button>\n' +
                            '<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-warning" attr="data-target=\'#modal-warning\'">edit</button>\n' +
                            '' +'</td>';
                        data += '</tr>';
                    });
                    // $('#user_table tr').remove();
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

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/admin",
                data: JSON.stringify(user),
                dataType: 'json',
                cache: false,
                timeout: 600000,
                success: function (data) {
                    console.log("SUCCESS : ", data);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
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

            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "/admin/" + id,
                data: JSON.stringify(editUser),
                dataType: 'json',
                cache: false,
                timeout: 600000,
                success: function (data) {
                    console.log("SUCCESS : ", data);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });

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
});

