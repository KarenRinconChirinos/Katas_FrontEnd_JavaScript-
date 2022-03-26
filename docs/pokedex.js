const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("images/7.jpg")
            pokeStats.innerHTML='';
            poketype.innerHTML='';
            pokeNombre('No encontrado')
            pokeOr('')
            poketype('')
        }
        else {
            return res.json();
        }
    })
    .then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            

            let pokeNom = data.species.name;
            pokeNombre(pokeNom);
            console.log(pokeNom);

            let pokeO = data.id;
            pokeOr(pokeO);
            console.log(pokeO);

            let poketip = data.types[0].type.name;
            poketype(poketip);
            if(data.types.length==2)
            {
                let poketip1 = data.types[1].type.name;
                poketype1(poketip1);
            }
            else
            {
                document.getElementById("poketype1").innerHTML='';
            }

            const {stats,type}=data;
            repokestats(stats);
            
        }
    }).catch(err=>renderNotFOund())
}

//La programacion sincrono  se lee lod e arriba luego lo de abajo etc
//La programacion asincrona se va de un lado a otro como hilos en paralelos
//stack de programacion
//promesa es como decirle al programa espera y te mando el resultado y teines que esperarme en el proceso

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
const pokeNombre = (name) => {
    document.getElementById("pokeNom").innerHTML= name;
}

const pokeOr = (or) => {
    document.getElementById("pokeOrden").innerHTML= 'No°'+ or;
}

const typecolors = {
    electric: '#ffea70',
    normal:'#B09398',
    fire:'#FF675C',
    water: '#0596c7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#D4627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F'
};

const poketype = (type) => {
    document.getElementById("poketype").innerHTML=type;
    document.getElementById("poketype").style.fontSize="15px";
    document.getElementById("poketype").style.alignItems="center";
}

const poketype1 = (type) => {
    document.getElementById("poketype1").innerHTML=type;
    document.getElementById("poketype1").style.color =typecolors.type;
    document.getElementById("poketype1").style.fontSize="15px";
    document.getElementById("poketype1").style.alignItems="center";
}



const pokeStats = document.querySelector('[data-poke-stats]');
const repokestats = stats => {
    pokeStats.innerHTML='';
    stats.forEach(stat =>{
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent=stat.stat.name;
        statElementAmount.textContent=stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    })
}

const renderNotFOund=()=>{
    pokeStats.innerHTML='';
}