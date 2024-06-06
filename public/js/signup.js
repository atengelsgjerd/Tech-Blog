
const signUpButtonEl = document.getElementById('submitBtn');
const logInButtonEl = document.getElementById('loginBtn');

async function loginFunction(){
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: emailEl.value.trim(),
            password: passwordEl.value.trim(),
        }),
        headers: { 'Content-Type' : 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/home');
    } else {
        alert('Failed to log in');
    }
}

async function signUpFunction(){
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const usernameEl = document.getElementById('username');
    
    const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value.trim(),
            email: emailEl.value.trim(),
            password: passwordEl.value.trim(),
        }),
        headers: { 'Content-Type' : 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/home');
    } else {
        alert('Failed to sign up');
    }
}

logInButtonEl.addEventListener('click', loginFunction);
signUpButtonEl.addEventListener('click', signUpFunction);