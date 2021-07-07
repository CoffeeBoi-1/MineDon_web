let OPTIONS = {}

async function GetOptions(id) {
    let res = await $.get('api/get_options?id=' + id)
    if (res['error']) return alert(res['error'])

    for (e in res) {
        OPTIONS[e] = new DonaterElement(e, res[e].name, res[e].cost, res[e].command)
        $('.scroller').append(OPTIONS[e].GetDonaterUIElement())
    }
}

function SetClipboard(text) {
    var dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.setAttribute('id', 'dummy_id');
    document.getElementById('dummy_id').value=JSON.stringify(text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    alert('Copied!')
  }