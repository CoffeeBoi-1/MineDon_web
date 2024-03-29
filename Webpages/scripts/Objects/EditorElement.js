class EditorElement {

    /**
     * @param {String} id
     * @param {String} name
     * @param {Number} cost
     * @param {String} command
    */
    constructor(id, name, cost, command) {
        this.id = id
        this.name = name
        this.cost = cost
        this.command = command
    }

    GetEditorUIElement() {
        return `<div class="editorElement" id="${this.id}">
        <div style="width: 100%;margin-bottom: 10px;">
            <a style="margin-left: 5px; font-size: 2em; width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;" class="titleText" title="${this.name}">${this.name}</a>
            <button onclick="OddOption('${this.id}')" style="margin-top: 5px; float: right; width: 40px; padding: 0px;" class="btn roundedCorners" title="Удалить">x</button>
            <button onclick="EditOption('${this.id}')" style="margin-top: 5px; float: right;width: 85px;padding: 0px;" class="btn roundedCorners">Изменить</button>
            </div>
        <div style="width: 100%;margin-bottom: 10px;">
            <a class="normalText" style="margin-left: 5px;height: 100px;font-size: 1.6em;">Цена : </a>
            <a class="titleText" style="height: 100px;font-size: 1.6em;">${this.cost}</a>
        </div>
        <div style="width: 100%;">
            <a class="normalText" style="margin-left: 5px;font-size: 1.6em;width: 107px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">Команда : </a>
            <a class="titleText" style="font-size: 1.6em;width: 200px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;" title='${this.command}'>${this.command}</a>
        </div>
    </div>`
    }

    GetEditableUIElement() {
        return `
        <div id="divName" style="width: 100%;margin-bottom: 10px;">
            <input id="inputName" value="${this.name}" style="margin-left: 5px;font-size: 2em;width: 220px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;background: transparent;border: none;" class="titleText" title="Новая Опция">
            <button onclick="UpdateOption('${this.id}')" style="margin-top: 5px; float: right;width: 100px;padding: 0px;" class="btn roundedCorners">Сохранить</button>  
        </div>
        <div id="divCost" style="width: 100%;margin-bottom: 10px;">
            <a class="normalText" style="margin-left: 5px;height: 100px;font-size: 1.6em;">Цена : </a>
            <input id="inputCost" value="${this.cost}" type="number" class="titleText" style="font-size: 1.6em;width: 150px;background: transparent;border: none;">
        </div>
        <div id="divCommand" style="width: 100%;margin-bottom: 10px;">
            <a class="normalText" style="margin-left: 5px;height: 100px;font-size: 1.6em;">Команда : </a>
            <input id="inputCommand" value='${this.command}' title='${this.command}' class="titleText" style="font-size: 1.6em;width: 150px;background: transparent;border: none;">
        </div>`
    }

    GetEditedUIElement() {
        return `
        <div style="width: 100%;margin-bottom: 10px;">
            <a style="margin-left: 5px; font-size: 2em; width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;" class="titleText" title="${this.name}">${this.name}</a>
            <button onclick="OddOption('${this.id}')" style="margin-top: 5px; float: right; width: 40px; padding: 0px;" class="btn roundedCorners" title="Удалить">x</button>
            <button onclick="EditOption('${this.id}')" style="margin-top: 5px; float: right;width: 85px;padding: 0px;" class="btn roundedCorners">Изменить</button>
            </div>
        <div style="width: 100%;margin-bottom: 10px;">
            <a class="normalText" style="margin-left: 5px;height: 100px;font-size: 1.6em;">Цена : </a>
            <a class="titleText" style="height: 100px;font-size: 1.6em;">${this.cost}</a>
        </div>
        <div style="width: 100%;">
            <a class="normalText" style="margin-left: 5px;font-size: 1.6em;width: 107px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">Команда : </a>
            <a class="titleText" style="font-size: 1.6em;width: 200px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;" title='${this.command}'>${this.command}</a>
        </div>`
    }
}