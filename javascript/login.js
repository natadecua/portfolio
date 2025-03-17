$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        
        $.getJSON('accounts.json', function(data) {
            var found = data.accounts.find(account => account.username === username && account.password === password);
            if (found) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'protected-page1.html';
            } else {
                alert('Invalid credentials');
            }
        });
    });
});