const inputElm = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")

const ulElm = document.getElementById("ul-el")
let urls

function render() {
    urls = JSON.parse(localStorage.getItem("myLeads")) || []
    inputElm.value = ""
    ulElm.innerHTML = ""
    updateElements(urls)
}

function updateElements(arr) {
    arr.map(note => {
        const aElm = document.createElement("a")
        const pElm = document.createElement("p")
        pElm.textContent = note.memo
        aElm.innerHTML = note.url
        aElm.href = note.url
        aElm.target = "_blank"  // to open in a new tab
        const liElm = document.createElement("li")
        liElm.append(aElm)
        liElm.append(pElm)
        ulElm.append(liElm)
    })
}

inputBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let url = tabs[0].url
        const note = {
            url: url,
            memo: inputElm.value
        }
    
        urls.push(note)
        localStorage.setItem("myLeads", JSON.stringify(urls))
    render()
    })
})



deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    render()
})

render()
