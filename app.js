const root = document.querySelector('#root')
const arch = document.querySelector('#arch')
const aler = document.querySelector('#alert')

class Reproductor {
    #audio
    #dutari
    constructor(){
    }
    cargar(link){
        const audi = new Audio(link.url)
        this.#audio = audi
        root.innerHTML= `
    <div class="conteen">
        <div class="header">
        <button class="btnrep" id="restten"> -10</button>
        <h3>${link.nombre}</h3>
        <button class="btnrep" id="plusten">+10</button>
        </div>
        <progress class="prog" id="progreso" max="" value=""></progress>
        <div>
        <button class="btnrep" id="paly"><i class="fa-solid fa-play"></i></button>
        <button class="btnrep" id="pause"><i class="fa-solid fa-pause"></i></button>
        <button class="btnrep" id="mute"><i class="fa-solid fa-volume-xmark"></i></button>
        <input type="range" value="1" id="vlom" min="0" max="1" step="0.1">
        </div>
    </div>
        `
        const p = document.querySelector('#paly')
        const pu = document.querySelector('#pause')
        const vol = document.querySelector('#vlom')
        const mute = document.querySelector('#mute')
        const menos = document.querySelector('#restten')
        const mas = document.querySelector('#plusten')
        const pro = document.querySelector('#progreso')
        this.Pause_Play(pu)
        this.Play_pause(p)
        this.Vol(vol)
        this.mutes(mute)
        this.rests(menos)
        this.plust(mas)
        this.Ctime(pro)
    }
    Play_pause(target){
        target.addEventListener('click', () => this.#audio.play())
        setTimeout(() => {
        this.Duration()
        }, 1000);
    }
    Scarga(){
        // if(!this.#audio.paused){
        // this.#audio.pause()
        // }else{
        // this.#audio.play()
        // }
        console.warn(this.#audio.paused)
    }
    Pause_Play(target){
        target.addEventListener('click', () => this.#audio.pause())
    }
    Vol(target){
        target.addEventListener('input', (e) => this.#audio.volume = e.target.value)
    }
    mutes(targe){
        targe.addEventListener('click', (e) => this.#audio.muted == true? this.#audio.muted = false : this.#audio.muted = true)
    }
    rests(target){
        target.addEventListener('click', e => this.#audio.currentTime -= 10)
    }
    plust(target){
        target.addEventListener('click', e => this.#audio.currentTime += 10)
    }
    Ctime(target){
        this.#audio.addEventListener('timeupdate', e => { 
        let timeAc = parseInt(this.#audio.currentTime)
        let finals = Math.floor(this.#dutari - 20) 
        target.value = timeAc
        target.max = this.#dutari
        if (timeAc == finals) {
        mensaje('Faltan 20s para que termine', 'alert')
        }
        })
    }
    Duration(){
        this.#dutari = this.#audio.duration
        console.log(parseInt(this.#dutari));
    }
}

let aus = new Reproductor()

arch.addEventListener('change', e => {
    let arh = e.target.files
    if (arh[0].type != "audio/mpeg") {
        mensaje('Error solo se soporta Audio', 'alert')
    } else {
       let url = URL.createObjectURL(arh[0]) 
       let datos = {
           url,
           nombre: arh[0].name
       }
       aus.cargar(datos)
    //    aus.Scarga()
       mensaje('Archivo cargado', 'success')
    }
})


function mensaje(men, clas) {
        aler.style.display = 'inline-block'
        aler.classList.add(clas)
       aler.innerHTML = men 
       setTimeout(() => {
           aler.classList.remove(clas)
          aler.style.display = 'none' 
       }, 2000);
}