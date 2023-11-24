function signUp() {
    const loginPage = document.getElementById('login');
    const signUpPage = document.getElementById('signUp');
    loginPage.style.display = 'flex';
    signUpPage.style.display = 'none';
}

function login() {
    const id = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    const userId = document.getElementById('signUpId').value;
    const userPassword = document.getElementById('signUpPassword').value;

    if (id === userId && password === userPassword) {
        alert('login success')
    } else {
        alert('ID or password is invalid')
    }

}