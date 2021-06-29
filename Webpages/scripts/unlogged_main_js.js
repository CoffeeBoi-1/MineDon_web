async function Register() {
    let res = await $.get('api/reg_acc?email=' + document.getElementById('emailInput').value + '&password=' + document.getElementById('passwordInput').value)
    if (res['error']) return alert(res['error'])

    alert('Verification email was sent! Check your email')
}

async function Login() {
    let res = await $.get('api/get_login_token?email=' + document.getElementById('emailInput').value + '&password=' + document.getElementById('passwordInput').value)
    if (res['error']) return alert(res['error'])

    alert('Verification email was sent! Check your email')
}