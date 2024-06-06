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

logInButtonEl.addEventListener('click', loginFunction);