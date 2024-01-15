document.getElementById('hello').innerText = `Hello, ${localStorage.getItem('username')}`

function redirect(){
    window.location.href = "http://localhost:3001/user_page";
}