<table>
   <tr>
      <th>Dimension</th>
      <th>Quantity</th>
      <th>Factory: rx</th>
   </tr>

   <% for (var i = 0; i < quotation.length; i++) { %>
    <tr>
      <td><%= quotation[i].dimension %></td>
      <td><%= quotation[i].quantity %></td>
      <td><%= quotation[i].factory %></td>
    </tr>    
   <% } %>
</table>
<table>
  <tr>
    <th>does this span?</th>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Doe</td>
  </tr>
</table>