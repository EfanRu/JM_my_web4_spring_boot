<%--
  Created by IntelliJ IDEA.
  User: slava
  Date: 09.12.2019
  Time: 13:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=ISO-8859-1" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
<head>
    <title>Edit user menu</title>
</head>

<body>
<p>Edit User<br>
    <p>Write id of user for delete:<br>
    <form:form action="/admin/edit" method="post">
        <p>Id: ${user.id}
            <input type="hidden" name="id" value="${user.id}">
        </p>
        <p>First name: <input type="text" name="firstName" value="${user.firstName}"></p>
        <p>Last name: <input type="text" name="lastName" value="${user.lastName}"></p>
        <p>Phone number: <input type="text" name="phoneNumber" value="${user.phoneNumber}"></p>
        <p>Role: <select name = "role">
                    <option value="admin">admin</option>>
                    <option value="user">user</option>>
                 </select>
        </p>
        <p>Login: <input type="text" name="login" value="${user.login}"></p>
        <p>Password: <input type="password" name="password" value="${pass}"></p>
        <input type="submit" value="Submit">
    </form:form>

    <form action="/logout" method="get">
        <input type="submit" value="Log out">
    </form>
</body>
</html>
