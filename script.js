async function signup(event){
    
    event.preventDefault();
    
    let passwordInput=document.getElementById("signupPass")
    let nameInput=document.getElementById(`signupName`)
    let emailInput=document.getElementById(`signupEmail`)

    let valid=true;
    
    if (!nameValidatiion(nameInput.value)){
        nameInput.classList.add('invalid');
        valid=false;
        showPopup("Please ensure your name only contains letters and spaces; numbers or special characters are not allowed.", type="error");
    }

    else{
        nameInput.classList.remove('invalid');
        
    }
    if (!emailInput.checkValidity()) {
        valid=false;
        emailInput.classList.add('invalid');
        showPopup("Please provide a valid email address to continue.", type="error");
    }

    else{
        emailInput.classList.remove('invalid');   
    }

    if (!passValidation(passwordInput.value)) {
        valid=false;
        passwordInput.classList.add('invalid');
        showPopup("Oops! Your password should have at least 6 characters, including at least one letter and one number.", type="error");
    }

    else{
        passwordInput.classList.remove('invalid');
    }
    
    if(valid){

        let url="https://balanz-io-01.onrender.com";
        
        username=emailInput.value;
        Name=nameInput.value;
        pass=passwordInput.value;
    
        try{
            let response=await axios.post(`${url}/signup`,{
                username: username,
                name: Name,
                password: pass
            })
            let signupStatus=response.data;
            localStorage.setItem("token",signupStatus.token);
            // alert(signupStatus.message+" Redirecting You");
            showPopup("Sign Up complete.", type="success");
            window.location.href="./index.html"
        }

        catch(e){
            // alert(e.response.data.message)
            showPopup(e.response.data.message==="Username already exist!!"?"That email is already taken. Why not try a different one?":e.response.data.message, type="error");
            console.log(e);
            
        }    
    }
    else{
        console.log('Form is invalid!');
        return
    }
    
}

async function login(event) {
    event.preventDefault();

    let passwordInput=document.getElementById("loginPass")
    let emailInput=document.getElementById(`loginEmail`)

    let valid=true;

    if (!emailInput.checkValidity()) {
        valid=false;
        emailInput.classList.add('invalid');
        showPopup("Please provide a valid email address to continue.", type="error");
    }

    else{
        emailInput.classList.remove('invalid');   
    }

    if (!passValidation(passwordInput.value)) {
        valid=false;
        passwordInput.classList.add('invalid');
        showPopup("Oops! Your password should have at least 6 characters, including at least one letter and one number.", type="error");
    }

    else{
        passwordInput.classList.remove('invalid');
    }

    if(valid){

        let url="https://balanz-io-01.onrender.com/login";

        let username=emailInput.value;
        let password=passwordInput.value;

        try{
            let response=await axios.post(url,{
                username,
                password
            })
    
            let responseData=response.data
            localStorage.setItem("token",responseData.token)
            showPopup("Log In complete.", type="success");
            window.location.href="./index.html"
        }
        catch(e){
            showPopup(e.response.data.message, type="error");

        }

    }
    else{
        console.log('Form is invalid!');
        return
    }
}

async function loginguest() {

    let url="https://balanz-io-01.onrender.com/login";

    let username="test@gmail.com";
    let password="test123";

    try{
        let response=await axios.post(url,{
            username,
            password
        })

        let responseData=response.data
        localStorage.setItem("token",responseData.token)
        showPopup("Log In complete.", type="success");
        window.location.href="./index.html"
    }
    catch(e){
        showPopup(e.response.data.message, type="error");
    }

}

function passwordToggle(signuporlogin){
    let passInput=document.getElementById(`${signuporlogin==="signup"?"signupPass":"loginPass"}`)
    passInput.type==="password"?passInput.type="text":passInput.type="password"
}

addEventListener("DOMContentLoaded", (event) => {

 
    let nameInput=document.getElementById(`signupName`)
    let emailInput=document.getElementById(`signupEmail`)
    let passwordInput=document.getElementById("signupPass")
    
    
    let loginEmailInput=document.getElementById(`loginEmail`)
    let loginPasswordInput=document.getElementById("loginPass")
    
    let arr=loginEmailInput===null?[nameInput,emailInput,passwordInput]:[loginPasswordInput,loginEmailInput]
    
    arr.forEach(element => {//two layers of validattion first one is doe by html and the second one by me
        // console.log(element);
        
        element.addEventListener("focus",(event)=>{//upon clicking submit the form req property focuses inp where this logic adds error border
            if(!event.target.checkValidity()){
                event.target.classList.add('invalid');
                event.target.reportValidity()
                console.log("focused");
            }
            else{
                event.target.classList.remove("invalid")
            }
        })
        element.addEventListener("keyup",(event)=>{//upon clicking submit the form req property focuses inp where this logic adds error border
            if(!event.target.checkValidity()){
                event.target.classList.add('invalid');
                event.target.reportValidity()
                console.log("focused");
            }
            else{
                event.target.classList.remove("invalid")
            }
        })

        element.addEventListener("blur",(event)=>{

            console.log("blur");
            
            if(!event.target.checkValidity()){
                event.target.classList.add('invalid');
                event.target.reportValidity()
                console.log("focused");
            }
            else{
                event.target.classList.remove("invalid")
            }
        })
    });




});


function nameValidatiion(name) {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
}

function passValidation(pass) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regex.test(pass);
}

// function emailValidatiion(email) {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d).{1,}$/;
//     return regex.test(email);
// }


function showPopup(message,type='success') {
    let popupModal = document.getElementById('popup-modal');
    let popupMessage = document.getElementById('popup-message');
    
    if (type==='error'){
        popupMessage.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #dc3545"></i>   ${message}`;
    } 
    else {
        popupMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #05a571"></i>   ${message}`;
    }

    popupModal.classList.add('show');
    setTimeout(() => {
        popupModal.classList.add('fade-out');
    }, 5000);

    setTimeout(() => {
        popupModal.classList.remove('show', 'fade-out');
    }, 6000); 
}


