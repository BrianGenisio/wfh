class ShowRecord
  @template: '''

<div class="well">
  <h3>
    <%- data.name %>
    <small><%- data.note || "" %></small>
    <a class="close" href="#">&times;</a>
  </h3>
  
</div>

'''