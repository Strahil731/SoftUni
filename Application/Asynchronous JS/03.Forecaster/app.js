function attachEvents() {
    const condition = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂'
    };

    const locationInputRef = document.getElementById("location");
    const forecastRef = document.getElementById("forecast");

    const submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", getWeather);

    async function getWeather() {
        try {
            const url = `http://localhost:3030/jsonstore/forecaster/locations`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }

            const town = data.find(x => x.name.toLowerCase() === locationInputRef.value.toLowerCase());

            if (!town) {
                throw new Error("Error (Invalid town name)!");
            }

            forecastRef.style.display = "block";

            if (town) {
                getWeatherToday(town.code);
                getWeatherUpcoming(town.code);

                locationInputRef.value = "";
            }
        }
        catch (error) {
            forecastRef.style.display = "block";
            forecastRef.innerHTML = `<p id="errorMessage">${error.message}</p>`;
        }
    }

    async function getWeatherToday(code) {
        const todayURL = "http://localhost:3030/jsonstore/forecaster/today/";
        const response = await fetch(todayURL + code);
        const data = await response.json();

        const currentForecast = document.getElementById("current");

        const divContainer = document.createElement("div");
        divContainer.className = "forecasts";
        divContainer.innerHTML = `
        <span class="condition symbol">${condition[data.forecast.condition]}</span>
        <span class="condition">
            <span class="forecast-data">${data.name}</span>
            <span class="forecast-data">${data.forecast.low}°/${data.forecast.high}°</span>
            <span class="forecast-data">${data.forecast.condition}</span>
        </span>`

        currentForecast.appendChild(divContainer);
    }

    async function getWeatherUpcoming(code) {
        const upcomingURL = "http://localhost:3030/jsonstore/forecaster/upcoming/";
        const response = await fetch(upcomingURL + code);
        const data = await response.json();

        const upcomingForecast = document.getElementById("upcoming");

        const divForecastContiner = document.createElement("div");
        divForecastContiner.className = "forecast-info";

        for (x of data.forecast) {
            divForecastContiner.innerHTML += `
            <span class="upcoming">
                <span class="symbol">${condition[x.condition]}</span>
                <span class="forecast-data">${x.low}°/${x.high}°</span>
                <span class="forecast-data">${x.condition}</span>
            </span>`
        }

        upcomingForecast.appendChild(divForecastContiner);
    }
}

attachEvents();