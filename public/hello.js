if (localStorage.length === 0) {
    window.location.href = "http://localhost:3001/";
} else {

    function logout(){
        localStorage.clear();
        window.location.href = "http://localhost:3001/";
    }

    document.getElementById('hello').innerText = `Hello, ${localStorage.getItem('username')}`

    function redirect(){
        window.location.href = "http://localhost:3001/user_page";
    }

}
