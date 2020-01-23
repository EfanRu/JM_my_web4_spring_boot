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
<h3>Error page, piece of meat!</h3>
    Bla-bla-bla...

    <form:form>
        <h1><th>${msg}</th></h1>
    </form:form>

    <form action="/login" method="get">
        <input type="submit" value="Log in">
    </form>

    <form action="/logout" method="get">
        <input type="submit" value="Log out">
    </form>

</body>
</html>
