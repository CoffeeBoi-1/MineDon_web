async function Login() {
    let res = await $.get('api/get_login_token?email=' + document.getElementById('emailInput').value + '&password=' + document.getElementById('passwordInput').value)
    if (res['error']) return alert(res['error'])

    let code = await prompt('Код', '')
    let resConfirm = await $.get('api/confirm_login?token=' + code)
    if (resConfirm['error']) return alert(res['error'])

    document.cookie = 'token=' + resConfirm['token']
    document.cookie = 'id=' + resConfirm['id']
    location.href = ''
}

async function RememberPassword () {
    let res = await $.get('api/remember_password?email=' + document.getElementById('emailInput').value)
    if (res['error']) return alert(res['error'])

    alert('Email was sent! Check your email')
}