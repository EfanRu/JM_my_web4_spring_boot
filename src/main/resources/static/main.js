$(document).ready(function () {

    // clean_user_table();
    // refresh_user_table();

    // $("button[data-toggle=modal]").click(function() {
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
                    // '                                            <form class="editFromClass" action="/admin" method="put" id="' + user.id + '">\n' +
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
                    '\n' +
                    '                                                    <b>Login:</b><br>\n' +
                    '                                                    <input class="input-lg" type="text" name="login" value="' + user.login + '" id="editLogin"><br>\n' +
                    '                                                    <b>Password:</b><br>\n' +
                    '                                                    <input class="input-lg" type="password" name="password" id="editPassword">\n' +
                    '                                                    <br>' +
                    '                                                 </div>';
                    // '                                              </form>';

                $('#modal-warning').show();
                $('#modalContent').html(data);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });

    });

    $("#addUser").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        add_new_user_submit();
        // clean_user_table();
        // refresh_user_table();
    });

    $('.editFromClass').on('submit', function (event) {

        event.preventDefault();

        // var editUserId = $(this).attr('id');
        // var editUserId2 = $(this).val();
        // $('#' + editUserId).on(edit_user_submit(editUserId));
        edit_user_submit();

        // clean_user_table();
        // refresh_user_table();
    });


    $(".deleteFromClass").on('submit', function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        var delUserId = $(this).attr('id');
        $('#' + delUserId).on(delete_user_submit(delUserId));

        // clean_user_table();
        // refresh_user_table();
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
                    $.each(response, function (index, user) {
                        data += '<tr>';
                        data += '<td>' + user.id + '</td>';
                        data += '<td>' + user.firstName + '</td>';
                        data += '<td>' + user.lastName + '</td>';
                        data += '<td>' + user.login + '</td>';
                        data += '<td>' + user.phoneNumber + '</td>';
                        data += '<td>' + user.role.name + '</td>';
                        data += '<td>' +
                            '                                                <form action="/admin" method="delete" id="deleteUserHid">\n' +
                            '                                                    <button class="btn btn-danger btn-xs hidden" type="submit" name="id" value="' + user.id + '"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                            '                                                </form>\n' +
                            '\n' +
                            '                                                <form class="deleteFromClass" action="/admin" method="delete" id="' + user.id + '">\n' +
                            '                                                    <button class="btn btn-danger btn-xs" type="submit" name="id" value="' + user.id + '" id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                            '                                                </form>\n' +
                            '                                            </td>\n' +
                            '\n' +
                            '                                            <td>\n' +
                            '                                                <form class="editFromClass" id="' + user.id + '">\n' +
                            '                                                    <button href="#modal-warning" type="button" class="btn btn-primary btn-xs" data-toggle="modal" id="' + user.id + '">edit</button>\n' +
                            '            <!--                            Modal window-->\n' +
                            '                                                    <div class="modal modal-warning fade in" id="modal-warning">\n' +
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
                            '                                                                    <button type="submit" class="btn btn-outline">Change</button>\n' +
                            '                                                                </div>;\n' +
                            '                                                            </div>\n' +
                            '                                                        </div>\n' +
                            '                                                    </div>\n' +
                            '                                                </form>\n' +
                            '                                            </td>\n' +
                            '                                        </tr>\n';







                        //     '<form action="/admin" method="delete" id="deleteUserHid">\n' +
                        //     '<button class="btn btn-danger btn-xs hidden" type="submit" name="id" value=' + user.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                        //     '</form>' +
                        //     '<form action="/admin" method="delete" id="deleteUser">\n' +
                        //     '<button class="btn btn-danger btn-xs" type="submit" name="id" value=' + user.id + ' id="delId"><span class="glyphicon glyphicon-trash"></span></button>\n' +
                        //     '</form>' +
                        //     '' +'</td>';
                        // data += '<td>' + '' +
                        //     '<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-warning" attr="data-target=#modal-warning' + user.id + '">edit</button>\n' +
                        //     '                            <div class="modal modal-warning fade in" id="modal-warning' + user.id + '">\n' +
                        //     '                                <div class="modal-dialog">\n' +
                        //     '                                    <div class="modal-content">\n' +
                        //     '                                        <div class="modal-header">\n' +
                        //     '                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                        //     '                                                <span aria-hidden="true">×</span></button>\n' +
                        //     '                                            <h4 class="modal-title">Edit user</h4>\n' +
                        //     '                                        </div>\n' +
                        //     '                                        <div class="modal-body">\n' +
                        //     '                                            <form action="/admin" method="put" id="editUser">\n' +
                        //     '                                                <div class="form-group text-center">\n' +
                        //     '                                                    <b>Id:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="text" name="id" value="' + user.id + '" id="editId' + user.id + '"><br>\n' +
                        //     '                                                    <b>First name:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="text" name="firstName" value="' + user.firstName + '" id="editFirstName' + user.id + '"><br>\n' +
                        //     '                                                    <b>Last name:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="text" name="lastName" value="' + user.lastName + '" id="editLastName' + user.id + '"><br>\n' +
                        //     '                                                    <b>Phone number:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="text" name="phoneNumber" value="' + user.phoneNumber + '" id="editPhoneNumber' + user.id + '"><br>\n' +
                        //     '                                                </div>\n' +
                        //     '                                                <div class="text-center"><b>Role</b>\n' +
                        //     '                                                </div>\n' +
                        //     '                                                <select class="selectpicker" data-live-search="true" data-live-search-style="startsWith" name = "role" id="editRole' + user.id + '">\n' +
                        //     '                                                    <option value="admin">admin</option>\n' +
                        //     '                                                    <option value="user">user</option>\n' +
                        //     '                                                </select>\n' +
                        //     '                                                <br>\n' +
                        //     '                                                <div class="form-group text-center">\n' +
                        //     '\n' +
                        //     '                                                    <b>Login:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="text" name="login" value="' + user.login +'" id="editLogin' + user.id + '"><br>\n' +
                        //     '                                                    <b>Password:</b><br>\n' +
                        //     '                                                    <input class="input-lg" type="password" name="password" id="editPassword' + user.id + '">\n' +
                        //     '                                                    <br>\n' +
                        //     '\n' +
                        //     '                                                    <div class="modal-footer">\n' +
                        //     '                                                        <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>\n' +
                        //     '                                                        <button type="submit" class="btn btn-outline">Change</button>\n' +
                        //     '                                                    </div>\n' +
                        //     '                                                </div>\n' +
                        //     '                                            </form>\n' +
                        //     '                                        </div>\n' +
                        //     '                                    </div>\n' +
                        //     '                                </div>\n' +
                        //     '                            </div>';
                        //     '' +'</td>';
                        // data += '</tr>';

                        // data += '</table>\n';

                    });
                    // $('#user_table tr').remove();
                    // $('#user_table').append(data);
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
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });
        }
});

