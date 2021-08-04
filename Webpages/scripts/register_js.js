async function Register() {
    let res = await $.get('api/reg_acc?email=' + document.getElementById('emailInput').value + '&password=' + document.getElementById('passwordInput').value)
    if (res['error']) return alert(res['error'])

    location.href = 'Register?code=true'
}

async function Verify() {
    let res = await $.get('api/auth_new_acc?token=' + document.getElementById('codeInput').value)
    if (res['error']) return alert(res['error'])

    location.href = '/'
}