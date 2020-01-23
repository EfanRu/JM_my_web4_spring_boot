<%--
  Created by IntelliJ IDEA.
  User: slava
  Date: 22.01.2020
  Time: 9:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=ISO-8859-1" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
<head>
    <title>Welcome Admin</title>
</head>
<body>

All users in database:

<form:form action="/admin/all" method="get">
    <table border="1">
        <tr>
            <td>id</td>
            <td>First name</td>
            <td>Second name</td>
            <td>Login</td>
            <td>Password</td>
            <td>Phone number</td>
            <td>Role</td>
            <td>Edit</td>
            <td>Remove</td>
        </tr>
        <c:forEach var="user" items="${listUser}">
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.login}</td>
                <td>${user.password}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.role.name}</td>

                <td>
                    <%--If don use hidden button, first row in the table don't deleted--%>
                    <form:form action="/admin/delete" method="get">
                        <button hidden></button>
                    </form:form>

                    <form:form action="/admin/delete" method="get">
                        <button type="submit" name="delId" value="${user.id}">del</button>
                    </form:form>
                </td>

                <td valign="middle">
                    <form:form action="/admin/edit" method="get">
                        <button type="submit" name="id" value="${user.id}">edit</button>
                    </form:form>
                </td>

            </tr>
        </c:forEach>
    </table>
</form:form>

Add user:
    <form action="/admin/add" method="post">
First name:
    <input type="text" name="firstName">
Last name:
    <input type="text" name="lastName">
Phone number
    <input type="text" name="phoneNumber">
Role
    <select name="role">
        <option value="admin">admin</option>>
        <option value="user">user</option>>
    </select>
Login
    <input type="text" name="login">
Password
    <input type="password" name="password">
    <input type="submit" value="Submit">
</form>

<form action="/logout" method="get">
    <input type="submit" value="Log out">
</form>


</body>
</html>
