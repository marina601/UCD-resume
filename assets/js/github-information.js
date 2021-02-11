function userInformationHTML(user) { //functiion for user information we call this function on line 39
    //user is an object that returns from github api which contain many keys and values
    //we create a template 
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

function repoInformationHTML(repos) {
    //returns the array therefore length to check if the array is empty then message displayed
    if ( repos.length === 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    // if the data is returned create a variable, map method works like a forEach loop but returns an array with results
    //list item with an anchor tag 
    var listItemsHTML = repos.map(function(repo){
        return `<li>
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;

    });
   // return the div with a heading in <p> join method with a new line
    return `<div class="clearfix repo-list">
             <p>
               <strong>Repo List:</strong>
             </p>
             <ul>
               ${listItemsHTML.join("\n")}
             </ul>
    </div>`;
}


function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    //settin their HTML content to an empty string has the effect on emptying these divs

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
        $.getJSON(`https://api.github.com/users/${username}`),// when we get api from github
        $.getJSON(`https://api.github.com/users/${username}/repos`) // will list repos for the user 
    ).then(
        function(firstResponse, secondResponse) { //then display the response 
            var userData = firstResponse[0]; //when 2 calls are made when() method will display array
            var repoData = secondResponse[0]; //so we need to add index to the responses
            $("#gh-user-data").html(userInformationHTML(userData)); //in user-data div we display the userData
            $("#gh-repo-data").html(repoInformationHTML(repoData)); //set the return for repoData, function will be above
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

$(document).ready(fetchGitHubInformation);
//octocat profile loaded as soon as the page refreshed 




