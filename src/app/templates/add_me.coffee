class AddMe
  @template: '''

<button class="btn btn-primary btn-large" id="working_from_home"><%= name ? name + " is" : "I am" %> working from home</button><br>
<% if(name) { %><a href="#" id="not_me">(Not <%= name %>?)</a><% } %>

'''