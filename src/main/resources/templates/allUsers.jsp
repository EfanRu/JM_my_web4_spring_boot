<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" %>
<%@ page contentType="text/html;charset=ISO-8859-1" language="java" %>

<html>
  <head>
    <title>Project</title>
  </head>

  <body>
  <p>It's you project! Welcome!<br>

  <p>All users in database:<br>

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

  <p>Add user:<br>
      <form action="/admin/add" method="post">
          <p>First name:<br>
              <input type="text" name="firstName">
          </p>
          <p>Last name:<br>
              <input type="text" name="lastName">
          </p>
          <p>Phone number<br>
              <input type="text" name="phoneNumber">
          </p>
            <p>Role<br>
              <select name="role">
                  <option value="admin">admin</option>>
                  <option value="user">user</option>>
              </select>
          </p>
          </p>
          <p>Login<br>
              <input type="text" name="login">
          </p>
          </p>
          <p>Password<br>
              <input type="password" name="password">
          </p>
          <input type="submit" value="Submit">
      </form>

    <form action="/logout" method="get">
      <input type="submit" value="Log out">
    </form>
  </body>
</html>
