
if (localStorage.length > 0) {
    window.location.href = "http://localhost:3001/hello";
} else {
    function redirectLogin(){
    window.location.href = "http://localhost:3001/user_login";
    };

    function redirectRegister(){
        window.location.href = "http://localhost:3001/user_register";
    };
}
