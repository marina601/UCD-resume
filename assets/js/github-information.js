function userInformationHTML(user) {
    return `
    <h2>${user.name}
      <span class="small-name">
        (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
       </span>
    </h2>
    <div class="gh-content">
       <div class="gh-avatar">
          <a href="${user.html_url} target="_blank">
             <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
          </a>
       </div>
       <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}


function fetchGitHubInformation(event) {

//calling the function in the input field with event argument
    var username = $("#gh-username").val(); //username selected with id and its value
    if (!username) { //if the username is empty then a h2 statement in returned 
        $("#gh-user-data").html(`<h2>Please enter a Github username</h2>`);
        return;
    }
    
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
    // displaying a loader inside the function 

    $.when(//making a promise 
        $.getJSON(`https://api.github.com/users/${username}`)// when we get api from github
    ).then(
        function(response) { //then display the response 
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData)); //in user-data div we display the userData
        }, function(errorResponse) {
            if(errorResponse.status === 404) { //if error status 404 then we display a message 
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else { //otherwise we print the error and display a the message in h2
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                
            }
        });

    
}




