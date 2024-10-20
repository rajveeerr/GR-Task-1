function logout(){
    localStorage.setItem("token","")
    window.location.href="./login.html";
}

async function loggedin(){
    let token=localStorage.getItem("token");
    try{
        let response=await axios.get(`https://balanz-io-01.onrender.com/me`,{
            headers: {
                authorization: token
            }
        });
        userData=await response.data;
    return true;
}
catch(err){
    alert("Not logged in! Redirecting to login page");
    window.location.href = './login.html';
    return false;
}
}
loggedin()