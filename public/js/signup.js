
const buttonEl = document.getElementById('submitBtn');

async function signUpFunction(){
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    
    const response = await fetch('/api/signup', {
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
        alert('Failed to sign up');
    }
}

buttonEl.addEventListener('click', signUpFunction);