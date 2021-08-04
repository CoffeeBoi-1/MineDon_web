let OPTIONS = {}

async function GetOptions(id) {
    let res = await $.get('api/get_options?id=' + id)
    if (res['error']) return alert(res['error'])

    for (e in res) {
        OPTIONS[e] = new DonaterElement(e, res[e].name, res[e].cost, res[e].command)
        $('.scroller').append(OPTIONS[e].GetDonaterUIElement())
    }
}

async function GetDonattyLink(id) {
    let res = await $.get('api/get_donatty_link?id=' + id)
    if (res['error']) return alert(res['error'])

    $('#mainText > #innerText').attr('href', res.link)
}