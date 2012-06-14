class AddMe
  @template: '''

<div><input id="note" type="text" class="input-large" placeholder="Notes (optional)"></div>

<div><button class="btn btn-primary btn-large" id="working_from_home"><%- name ? name + " is" : "I am" %> working from home</button></div>

<p><% if(name) { %><a href="#" id="not_me">(Not <%- name %>?)</a><% } %></p>

'''