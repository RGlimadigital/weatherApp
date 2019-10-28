window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');
    let locationTimezone = document.querySelector('.location-timezone');
    const teste = "teste-de-formula";
    const testeFormula = teste.split("-").join("_").toUpperCase();
    console.log(testeFormula);



    if (navigator.geolocation) {
        console.log("coordenada");
        navigator.geolocation.getCurrentPosition(position => {
            console.log('position')
            lat = position.coords.latitude;
            long = position.coords.longitude;
            const api = `https://api.darksky.net/forecast/79a8cbe69bd2dc30c508bec983390290/${lat},${long}`;
            console.log(lat)


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { timezone } = data;
                    const { summary, temperature, humidity, icon } = data.currently;
                    const celsius = (5 / 9) * (temperature - 32);
                    console.log(celsius.toFixed(2));

                    //Sets Dom elements from APi
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;
                    setIcon(icon, document.querySelector('.icon'));

                    //Mudando a Temperatura
                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === "F") {
                            degreeSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(celsius);

                        } else {
                            degreeSpan.textContent = "F"
                            temperatureDegree.textContent = temperature;

                        }
                    })

                })


        });


    } else {
        console.log('Nao carrega')
    }
    function setIcon(icon, iconId) {
        const skycons = new Skycons({ "color": "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);

    }
})