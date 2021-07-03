let OPTIONS = {}

async function GetOptions() {
    let res = await $.get('api/get_options')
    if (res['error']) return alert(res['error'])

    for (e in res) {
        OPTIONS[e] = new EditorElement(e, res[e].name, res[e].cost, res[e].command)
        $('.scroller').append(OPTIONS[e].GetEditorUIElement())
    }
}

/**
 * @param {String} id
*/
async function OddOption(id) {
    let res = await $.get('api/odd_option?id=' + id)
    if (res['error']) return alert(res['error'])

    $('#' + id).remove()
    delete OPTIONS[id]
    alert('Success!')
}

async function AddOption() {
    let res = await $.get('api/add_option?name=Новая Опция&cost=10&command=none')
    if (res['error']) return alert(res['error'])

    OPTIONS[res['id']] = new EditorElement(res['id'], 'Новая Опция', 10, 'none')
    $('.scroller').append(OPTIONS[res['id']].GetEditorUIElement())
    alert('Success!')
}