// first condition checks if the user is logged in
// if not will redirect to the first page
if (localStorage.length === 0) {
    window.location.href = "http://localhost:3001/";
} else {
    // button logout clears local storage and redirects to the first page
    function logout(){
        localStorage.clear();
        window.location.href = "http://localhost:3001/";
    }

    // render message Hello + name of the user from lockal storage
    document.getElementById('hello').innerText = `Hello, ${localStorage.getItem('username')}`

    // two buttons: one redirects to the training page, the second to the community page
    function redirectTraining(){
        window.location.href = "http://localhost:3001/user_page";
    }
    function redirectCommunity(){
        window.location.href = "http://localhost:3001/community";
    }

}
