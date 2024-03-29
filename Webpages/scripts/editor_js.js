let OPTIONS = {}

async function SetDonattyLink() {
    let link = await prompt('Ссылка на твою донат страницу в Donatty')
    let res = await $.get('api/set_donatty_link?link=' + link)
    if (res['error']) return alert(res['error'])

    alert('OK')
}

async function GetOptions() {
    let res = await $.get('api/get_options')
    if (res['error']) return alert(res['error'])

    for (e in res) {
        OPTIONS[e] = new EditorElement(e, res[e].name, res[e].cost, res[e].command)
        $('.scroller').append(OPTIONS[e].GetEditorUIElement())
    }
}

function GotoMDDonatePage() {
    window.location = 'donater?id=' + GetAppCookies(document.cookie).id
}

function GetAppCookies(cookie) {
    if (!cookie) return {}
    const rawCookies = cookie.split('; ');

    const parsedCookies = {};
    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
}

/**
 * @param {String} id
*/
async function OddOption(id) {
    let res = await $.get('api/odd_option?id=' + id)
    if (res['error']) return alert(res['error'])

    $('#' + id).remove()
    delete OPTIONS[id]
}

async function AddOption() {
    let res = await $.get('api/add_option?name=Новая Опция&command=none')
    if (res['error']) return alert(res['error'])

    OPTIONS[res['id']] = new EditorElement(res['id'], 'Новая Опция', 0, 'none')
    $('.scroller').append(OPTIONS[res['id']].GetEditorUIElement())
}

async function EditOption(id) {
    $(`#${id}`).empty();
    $(`#${id}`).append(OPTIONS[id].GetEditableUIElement())
}

async function UpdateOption(id) {
    let name = $(`#${id} > #divName > #inputName`).val()
    let cost = $(`#${id} > #divCost > #inputCost`).val()
    let command = $(`#${id} > #divCommand > #inputCommand`).val()

    let res = await $.get(`api/update_option?id=${id}&name=${name}&cost=${cost}&command=${command}`)
    if (res['error']) return alert(res['error'])

    OPTIONS[id].name = name
    OPTIONS[id].cost = cost
    OPTIONS[id].command = command

    $(`#${id}`).empty();
    $(`#${id}`).append(OPTIONS[id].GetEditedUIElement())
}

function GetTestJson() {
    SetClipboard(JSON.stringify({"test": "1"}))
}

function SetClipboard(text) {
    var dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.setAttribute('id', 'dummy_id');
    document.getElementById('dummy_id').value=text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    alert('Copied!')
}