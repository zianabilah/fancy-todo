function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log(profile)
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        type: "post",
        url: 'http://localhost:3000/signIn',
        body: {
            token: id_token
        }
    })
    .done((response) => {
        $('#login').hide()
        console.log(response.data)
    })
    .fail((error) => {
        console.log(error)
    })
    
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

