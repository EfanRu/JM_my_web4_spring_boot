$(document).ready(function () {

    refresh_user_table();

    $(document).on('click', 'button[data-toggle=modal]', function() {
        var id = $(this).attr('id');

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/admin/" + id,
            // url: "/admin/all",
            dataType: 'json',
            success: function (user) {
                console.log("SUCCESS : ", user);
                var data = '';

                data += '\n' +
                    '                                            <form class="editFromClass" action="/admin" method="put" id="' + user.id + '">\n' +
                    '                                                <div class="form-group text-center">\n' +
                    '                                                    <b>Id:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="id" value="' + user.id + '" id="editUser"><br>\n' +
                    '                                                    <b>First name:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="firstName" value="' + user.firstName + '" id="editFirstName"><br>\n' +
                    '                                                    <b>Last name:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="lastName" value="' + user.lastName + '" id="editLastName"><br>\n' +
                    '                                                    <b>Phone number:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="phoneNumber" value="' + user.phoneNumber + '" id="editPhoneNumber"><br>\n' +
                    '                                                </div>\n' +
                    '                                                <div class="text-center"><b>Role</b>\n' +
                    '                                                </div>\n' +
                    '                                                <select class="form-control" name = "role" id="editRole">\n' +
                    '                                                    <option value="admin">admin</option>\n' +
                    '                                                    <option value="user">user</option>\n' +
                    '                                                </select>\n' +
                    '                                                <br>\n' +
                    '                                                <div class="form-group text-center">\n' +
                    '                                                    <b>Login:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="login" value="' + user.login + '" id="editLogin"><br>\n' +
                    '                                                    <b>Password:</b><br>\n' +
                    '                                                    <input class="input-lg" type="password" name="password" id="editPassword">\n' +
                    '                                                    <br>' +
                    '                                                 </div>' +
                    '                                              </form>';

                $('#modal-warning').show();
                $('#modalContent').html(data);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });

    });


    $("#addUser").submit(function (event) {
        event.preventDefault();
        add_new_user_submit();

        //Trying hide tabs after add user
        // $('#navTabs li:first').tab('show');
        // $('.nav-link a[href="#table"]').tab('show');
        // $('#navTable').show();
        // $('#navAddForm').removeClass('active');
        // $('#navTable').addClass('active').click();
        // $('#navTable').tab('show');
        // refresh_user_table();

        // $('#navTable').trigger('click');
        // $('#table').trigger('click');
        // $('#table').tab('show').trigger('click');
        // $('.nav-tabs a[href="#table"]').tab('show');
    });

    $(document).on('click', '.editFromClassBut', function (event) {
        event.preventDefault();
        edit_user_submit();
    });


    $(document).on('click', ".deleteFromClass", function (event) {
        event.preventDefault();
        var delUserId = $(this).attr('id');
        $('#' + delUserId).on(delete_user_submit(delUserId));
    });

        function refresh_user_table() {
            $.ajax({
                url: '/admin/all',
                type: 'GET',
                dataType: "json",
                success: function (response) {
                    var data = '';
                    $.each(response, function (index, user) {
                        data += '<tr>';
                        data += '<td>' + user.id + '</td>';
                        data += '<td>' + user.firstName + '</td>';
                        data += '<td>' + user.lastName + '</td>';
                        data += '<td>' + user.login + '</td>';
                        data += '<td>' + user.phoneNumber + '</td>';
                        data += '<td>' + user.role.name + '</td>';
                        data += '<td>' +
                            '                                                <form class="deleteFromClass" action="/admin" method="delete" id="' + user.id + '">\n' +
                            '                                                    <button class="btn btn-danger btn-xs" type="button" name="id" value="' + user.id + '" id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                            '                                                </form>\n' +
                            '                                            </td>\n' +
                            '                                            <td>\n' +
                            '                                                <form class="editFromClass" id="' + user.id + '">\n' +
                            '                                                    <button href="#modal-warning" type="button" class="btn btn-primary btn-xs" data-toggle="modal" id="' + user.id + '">edit</button>\n' +
                            '            <!--                            Modal window-->\n' +
                            '                                                    <div class="modal modal-warning fade in" data-backdrop="false" id="modal-warning">\n' +
                            '                                                        <div class="modal-dialog">\n' +
                            '                                                            <div class="modal-content">\n' +
                            '                                                                <div class="modal-header">\n' +
                            '                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                            '                                                                        <span aria-hidden="true">×</span></button>\n' +
                            '                                                                    <h4 class="modal-title">Edit user</h4>\n' +
                            '                                                                </div>\n' +
                            '                                                                <div class="modal-body">\n' +
                            '                                                                    <div id="modalContent"></div>\n' +
                            '                                                                </div>\n' +
                            '                                                                <div class="modal-footer">\n' +
                            '                                                                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>\n' +
                            '                                                                    <button type="button" class="btn btn-outline editFromClassBut">Change</button>\n' +
                            '                                                                </div>;\n' +
                            '                                                            </div>\n' +
                            '                                                        </div>\n' +
                            '                                                    </div>\n' +
                            '                                                </form>\n' +
                            '                                            </td>\n' +
                            '                                        </tr>\n';

                    });
                    $('#user_table').html(data);
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
                    refresh_user_table();
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });
        }

        function edit_user_submit() {

            var id = $('#editUser').val();

            var editUser = {}
            editUser["id"] = id;
            editUser["firstName"] = $('#editFirstName').val();
            editUser["lastName"] = $('#editLastName').val();
            editUser["phoneNumber"] = $('#editPhoneNumber').val();
            editUser["role"] = $('#editRole').val();
            editUser["login"] = $('#editLogin').val();
            editUser["password"] = $('#editPassword').val();

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
                    refresh_user_table();
                    $('#modal-warning').close();
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });

        }

        function delete_user_submit(id) {

            $.ajax({
                type: "DELETE",
                url: "/admin/" + id,
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    console.log("SUCCESS : ", result);
                    // clean_user_table();
                    refresh_user_table();
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                    refresh_user_table();
                }
            });
        }
});

