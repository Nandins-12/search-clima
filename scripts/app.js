function addDOM(object) {
    function changeBackground(background) {
        const img = background_image.contentDocument.querySelector('img');

        if(window.innerWidth >= 660) {
            if(object.current.is_day == 1) {
                img.src = `assets/images/${background}/day-desktop.jpg`;
            } else {
                img.src = `assets/images/${background}/night-desktop.jpg`;
            }
        } else {
            if(object.current.is_day == 1) {
                img.src = `assets/images/${background}/day-mobile.jpg`;
            } else {
                img.src = `assets/images/${background}/night-mobile.jpg`;
            }
        }
    };
    
    document.querySelector('.city-name').innerText = object.location.name;
    document.querySelector('.region').innerText = object.location.region;
    let localtime = object.location.localtime.split(' ');
    document.querySelector('.localtime').innerText = localtime[1];
    document.querySelector('#temp').innerText = object.current.temp_c;
    document.querySelector('#condition').innerText = object.current.condition.text;
    document.querySelector('#climate-icon').src = object.current.condition.icon;
    document.querySelector('#climate-icon').alt = object.current.condition.text;

    document.querySelector('.wind span').innerText = object.current.wind_kph;
    document.querySelector('.humidity span').innerText = object.current.humidity;
    document.querySelector('.cloud span').innerText = object.current.cloud;
    document.querySelector('.feelslike span').innerText = object.current.feelslike_c;

    setInterval(() => {
        document.querySelector('#area-resume .container').style.opacity = '1';
    }, 1200);

    const code = object.current.condition.code;

    if(code == 1000) changeBackground('clear');
    if(code == 1003) changeBackground('partlycloudy');
    if(
        code == 1006 ||
        code == 1009
    ) changeBackground('cloudy');
    if(
        code == 1030 ||
        code == 1135 
    ) changeBackground('mist');
    if(
        code == 1063 ||
        code == 1066 ||
        code == 1069 ||
        code == 1072 ||
        code == 1087 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1198 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 ||
        code == 1261 ||
        code == 1273 ||
        code == 1276
    ) changeBackground('rain');
    if(
        code == 1117 ||
        code == 1171 ||
        code == 1222 ||
        code == 1225 ||
        code == 1279 ||
        code == 1282
    ) changeBackground('blizzard');
    if(
        code == 1114 ||
        code == 1147 ||
        code == 1168 ||
        code == 1201 ||
        code == 1210 ||
        code == 1213 ||
        code == 1216 ||
        code == 1219 ||
        code == 1237 ||
        code == 1255 ||
        code == 1258 ||
        code == 1264
    ) changeBackground('lightsnow');
}

async function getData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=b7a46b1a86bc44e793052452222003&q=${city}&aqi=no&lang=pt`;

    const request = await fetch(url)
    .then(response => response.json())
    .then(object => object);
    
    if(request.error) {
        if(request.error.code == 1006) {
            document.querySelector('#area-resume .container').style.display = 'none';
            document.querySelector('.warning').style.display = 'block';
        }
        throw new Error('Erro ao tentar fazer a requisição, código do erro da API: ' + request.error.code);
    } else {
        document.querySelector('#area-resume .container').style.display = 'flex';
        document.querySelector('.warning').style.display = 'none';
        addDOM(request);
    }
}

document.querySelectorAll('header nav.cities li').forEach((li) => {
    li.addEventListener('click', () => {
        background_image.contentDocument.getElementById('image').style.opacity = '0';
        background_image.contentDocument.getElementById('preloader').style.opacity = '1';
        getData(li.innerText);
    });
});

window.addEventListener('load', () => getData('Brasilia'));

get_search.addEventListener('click', () => {
    background_image.contentDocument.getElementById('image').style.opacity = '0';
    background_image.contentDocument.getElementById('preloader').style.opacity = '1';
    if(search.value) getData(search.value);
});

slide_down.addEventListener('click', () => {
    window.scroll({
        top: 321,
        behavior: 'smooth'
    });
});
