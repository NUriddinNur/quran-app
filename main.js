let search = document.querySelector('#search')
let read = document.querySelector('#read')
let heder = document.querySelector('#heder')
let num = document.querySelector('#num')
let wrapper = document.querySelector('#wrapper')
let res = document.querySelector('#res')



search.onkeyup = (event) => {
    if(event.keyCode === 13) {
        if (isNaN(search.value.trim()) || !(search.value.trim()) || search.value > 114 || search.value < 1) {
            alert("Invalid input !!!");
            search.value = null;
        }else {
            (async () => {
                let respons = await fetch(`https://api.quran.sutanlab.id/surah/${+search.value}`)
                let dat = await respons.json()
                heder.textContent = "Sura: "+dat.data.name.transliteration.en
                num.textContent = dat.data.numberOfVerses + " - oyat"
                let urls = []

                read.onclick = () => {
                    for (let i = 0; i < dat.data.numberOfVerses; i++) {
                        urls[i] = ''+dat.data.verses[i].audio.secondary[0]
                    }
                    audioPlay(urls)
                }
                
                let tag = ''
                for (let i = 0; i < dat.data.numberOfVerses; i++) {
                let url = dat.data.verses[i].audio.secondary[0]
                tag += `
                <li onclick="audioPlay('${url}')">${dat.data.verses[i].text.arab}</li>
                `
                }
                res.innerHTML = tag
            })()
            search.value = null;
        }
    }
}

function audioPlay(url) {
    if(Array.isArray(url)) {
        let index = 0
        wrapper.innerHTML = `<audio id="audio" autoplay>
        <source src='${url[index++]}' type="audio/mpeg">
        </audio>`
        
        audio.onended = () => {
            if(index >= url.length) return
            audio.src = url[index++]
            audio.play()
            document.body.append(audio)
        }    

    }else {
        const audios = document.querySelectorAll('audio')
        for(let audio of audios) {
            audio.pause()
            audio.currentTime = 0
            audio.remove()
        }
        wrapper.innerHTML = `<audio id="aud" autoplay>
        <source src='${url}' type="audio/mpeg">
        </audio>`
    }
}

