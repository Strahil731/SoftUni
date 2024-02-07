const login = () => {
    const inputUser = document.getElementById('user');
    const inputPass = document.getElementById('pass');

    if (inputUser.value && inputPass.value) {
        alert(`Welcome user: ${inputUser.value}`);
    }
    else {
        alert("Please check your information!");
    }
}