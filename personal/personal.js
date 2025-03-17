$(document).ready(function() {
    // Function to load content
    function loadContent(tab) {
        $("#content").load(tab + ".html #content", function() {
            if (tab === "photo_album") {
                // Initialize Lightbox
                lightbox.option({
                    'resizeDuration': 200,
                    'wrapAround': true,
                    'albumLabel': "Image %1 of %2"
                });
            }
        });
    }

    // Initial load
    loadContent('about')
    function handleLogout() {
        localStorage.setItem("loggedIn", "false");
        $("#protectedContent").hide();
        $("#loginMessage").html("<div class='alert alert-warning'>Please <a href='login.html'>login</a> to view this page.</div>");
        window.location.href = "login.html";
      }
      
      // Change login button to logout button
      $("#loginButton").html("Logout");
      $("#loginButton").attr("id", "logoutButton");
      
      // Handle logout button click
      $("#logoutButton").on("click", handleLogout);


      // Function to update login/logout button
function updateLoginButton() {
    if (localStorage.getItem("loggedIn") === "true") {
      $("#loginButton").html("Logout");
      $("#loginButton").attr("id", "logoutButton");
      $("#logoutButton").on("click", handleLogout);
    } else {
      $("#logoutButton").html("Login");
      $("#logoutButton").attr("id", "loginButton");
      $("#loginButton").on("click", function() {
        window.location.href = "personal.html";
      });
    }
  }
  
  // Call updateLoginButton function on page load
  updateLoginButton();


    // Handle tab clicks
    $("#personalTabs .nav-link").on("click", function(event) {
        event.preventDefault();
        var tab = $(this).data("tab");
        if(tab == "protected_page1" || tab == "protected_page2" ) {
            if (localStorage.getItem("loggedIn") === "true"){
                loadContent(tab);
                $("#protectedContent").show();
                $("#personalTabs .nav-link").removeClass("active");
                $(this).addClass("active");
            } else {
                window.location.href = "login.html"
            }
        } else {
            loadContent(tab);
            $("#personalTabs .nav-link").removeClass("active");
            $(this).addClass("active");
        }
        
    });

    // Handle login form submission
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
    
        $.getJSON("accounts.json", function(accounts) {
            var validAccount = accounts.find(function(account) {
                return account.username === username && account.password === password;
            });
    
            if (validAccount) {
                localStorage.setItem("loggedIn", "true");
                $("#protectedContent").show();
                $("#loginMessage").hide();
                window.location.href = "personal.html"; // Redirect to personal tabs
                $("#personalTabs .nav-link[data-tab='" + tab + "']").trigger("click"); // Trigger click on the tab
            } else {
                $("#loginMessage").html("<div class='alert alert-danger'>Invalid username or password.</div>");
            }
        });
    });

    // Check if user is logged in
   
});
