<%--
  Created by IntelliJ IDEA.
  User: slava
  Date: 17.12.2019
  Time: 16:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=ISO-8859-1" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
<head>
    <title>User's page</title>
</head>
<body>
<h3>Welcome to user page, piece of meat!</h3>
    Bla-bla-bla...
<form:form action="/user" method="get">
    <table border = "1">
        <tr>
            <td>id</td>
            <td>First name</td>
            <td>Second name</td>
            <td>Login</td>
            <td>Password</td>
            <td>Phone number</td>
            <td>Role</td>
        </tr>
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.login}</td>
                <td>${user.password}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.role.name}</td>
            </tr>
    </table>
</form:form>

    <form action="/logout" method="get">
        <input type="submit" value="Log out">
    </form>
</body>
</html>
