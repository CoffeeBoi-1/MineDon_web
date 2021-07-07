function QuitFromApp() {
    document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.reload()
}

async function ChangePassword() {
    let newPassword = await prompt('Новый пароль', '')
    let res = await $.get('api/request_change_password?newPassword=' + newPassword)
    if (res['error']) return alert(res['error'])

    alert('Email was sent! Check your email!')
}