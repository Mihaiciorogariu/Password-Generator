const inputSlider=document.getElementById("inputSlider"); //id
const sliderValue=document.getElementById("sliderValue");
const passBox=document.getElementById("passBox");

const lowercaseEl=document.getElementById("lowercase"); //id
const uppercaseEl=document.getElementById("uppercase");
const numbersEl=document.getElementById("numbers");
const symbolsEl=document.getElementById("symbols");

const generateBtn=document.getElementById("genBtn");
const copyBtn=document.getElementById("copyIcon");
const passIndicator=document.getElementById("passIndicator");


const toggleBtn=document.getElementById("toggleIcon");
//const toggleBtn = document.querySelector("#toggleIcon")


const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;':\",./<>?";


inputSlider.addEventListener("input", ()=>{
    sliderValue.textContent=inputSlider.value;
    generatePassword();

});

function generatePassword()
{
    const length=inputSlider.value;
    let characters ="";
    let password ="";

    characters+=lowercaseEl.checked ? lowercaseLetters : ""
    characters+=uppercaseEl.checked ? uppercaseLetters : ""
    characters+=numbersEl.checked ? numbers : ""
    characters+=symbolsEl.checked ? symbols : ""

    for(let i=0;i<length;i++){
        //Math.random() -> float value => Math.floor() -> int
        password+=characters.charAt(Math.floor(Math.random() * characters.length))
        //password+=characters.charAt(Math.random() * characters.length)
        //console.log(password) 
    }

    //Display the generated characters in the textbox
    passBox.value=password;
    passwordSecurity();

}

generateBtn.addEventListener("click", ()=>{
    generatePassword();
});


function passwordSecurity(){
    const passwordStrength=getPasswordSecurity(passBox.value);
    //console.log(passwordStrength);

    // pass-indicator from CSS
    passIndicator.className="pass-indicator "+passwordStrength;
    //console.log(passIndicator.className);
}

// Add event listeners to the checkboxes to update the password strength each time they are checked/unchecked
lowercaseEl.addEventListener('change', passwordSecurity);
uppercaseEl.addEventListener('change', passwordSecurity);
numbersEl.addEventListener('change', passwordSecurity);
symbolsEl.addEventListener('change', passwordSecurity);


function getPasswordSecurity(password) {
    let strength = 0;
    
    if (lowercaseEl.checked) strength++;
    if (uppercaseEl.checked) strength++;
    if (numbersEl.checked) strength++;
    if (symbolsEl.checked) strength++;
    
    
    if (password.length >= 25 && strength === 4 || (password.length >= 30 && strength === 3)) {
        return "vstrong";
    }
    else if ((password.length >= 20 && strength >= 3) || (password.length >= 25 && strength === 2) || (password.length >= 15 && strength === 4) || (password.length >= 25 && strength === 1)) {
        return "strong";
    }
    else if ((password.length > 10 && strength >= 2) || (password.length >= 20 && strength >= 1)) {
        return "medium";
    }
    else if (password.length <= 10 || strength <= 1) {
        return "weak";
    }
    else {
        return "weak";
    }
}




window.addEventListener('DOMContentLoaded', ()=>{
    passwordSecurity();
});


copyBtn.addEventListener("click", ()=>{
    if(passBox.value != "" || passBox.value.length >= 1){
        navigator.clipboard.writeText(passBox.value);

        // change the icon to the check icon after the copy button was pressed
        copyBtn.innerText="check";

        // Make the copy button available again after 3 seconds
        setTimeout(()=>
        {
            // Change the icon back to 'copy'
            copyBtn.innerText="content_copy";
        },3000);
    }
    else{
        alert("Nothing to copy!");

    }
});



toggleBtn.addEventListener("click", () =>  {
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    toggleBtn.innerText = container.classList.contains('dark-mode') ? 'toggle_on' : 'toggle_off';
    
});



