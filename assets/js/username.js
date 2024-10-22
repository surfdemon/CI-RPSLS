// code for inputting username.
const createNewUsername = () => {
    const newUsername = document.querySelector("#newUsername").value;
    const playerUsername = document.querySelector("#playerUsername");

    if (newUsername.length > 15) {
        alert("Please chose a shorter username...")
    } else {
        playerUsername.innerText = newUsername;
    }
}

document.getElementById("submitUsername").addEventListener("click", createNewUsername)

document.getElementById("newUsername").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        createNewUsername();
    }
})



