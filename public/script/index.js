// first condition checks if user already logged in (if localstorage is not empty)
// if yes, will redirect to the hello page
if (localStorage.length > 0) {
    window.location.href = "http://localhost:3001/hello";
} else {
    //two buttons with redirection to log in or register pages
    function redirectLogin(){
    window.location.href = "http://localhost:3001/user_login";
    };

    function redirectRegister(){
        window.location.href = "http://localhost:3001/user_register";
    };
}
