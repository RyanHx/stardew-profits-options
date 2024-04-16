// ==UserScript==
// @name        Save Stardew-Profits options
// @namespace   Violentmonkey Scripts
// @match       https://thorinair.github.io/Stardew-Profits/index.html*
// @run-at      document-idle
// @grant       GM.setValue
// @grant       GM.getValue
// @version     1.0
// @author      RyanHx
// @description Save options without relying on url parameters
// ==/UserScript==
(async () => {
    const inputs = document.querySelectorAll('.options input,select')
    const saveInput = async (event) => {
        const input = event.target ? event.target : event
        switch (input.type) {
            case 'number':
                await GM.setValue(input.id, input.value)
                break;
            case 'checkbox':
                await GM.setValue(input.id, input.checked)
                break;
            case 'select-one':
                await GM.setValue(input.id, input.selectedIndex)
                break;
            default:
                break;
        }
    }

    for (const input of inputs) {
        const stored = await GM.getValue(input.id, null)
        if (stored === null) {
            await saveInput(input)
        } else {
            switch (input.type) {
                case 'number':
                    input.value = stored
                    break;
                case 'checkbox':
                    input.checked = stored
                    break;
                case 'select-one':
                    input.selectedIndex = stored
                    break;
                default:
                    break;
            }
            input.dispatchEvent(new Event('change'))
        }
        input.addEventListener('input', saveInput, false);
    }
})()