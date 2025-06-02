// ShoreSquad App JS
// Features to add: interactive map, weather API, crew management, accessibility enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Interactive Map Placeholder
    document.getElementById('map-container').textContent = 'Map integration coming soon!';
    document.getElementById('add-cleanup').addEventListener('click', () => {
        alert('Feature to add a new cleanup event coming soon!');
    });

    // Real-time Weather Forecast from NEA API
    async function loadWeather() {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.textContent = 'Loading weather forecast...';
        try {
            const response = await fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const forecast = data.items && data.items[0] && data.items[0].general;
            if (!forecast) throw new Error('Weather data unavailable');

            // Format forecast
            let html = `<div style="font-weight:600;color:#0077b6;">${forecast.forecast}</div>`;
            html += `<div>Temperature: <b>${forecast.temperature.low}°C - ${forecast.temperature.high}°C</b></div>`;
            html += `<div>Humidity: <b>${forecast.relative_humidity.low}% - ${forecast.relative_humidity.high}%</b></div>`;
            html += `<div>Rain Probability: <b>${forecast.probability_of_rain.low}% - ${forecast.probability_of_rain.high}%</b></div>`;
            if (forecast.wind) {
                html += `<div>Wind: <b>${forecast.wind.speed.low} - ${forecast.wind.speed.high} km/h</b> (${forecast.wind.direction})</div>`;
            }
            if (forecast.uv) {
                html += `<div>UV Index: <b>${forecast.uv}</b></div>`;
            }
            if (forecast.note) {
                html += `<div style="margin-top:0.5em;color:#ff6f3c;">${forecast.note}</div>`;
            }
            weatherInfo.innerHTML = html;
        } catch (err) {
            document.getElementById('weather-info').innerHTML = `<span style='color:#ff6f3c;'>Unable to load weather forecast. Please try again later.</span>`;
        }
    }
    loadWeather();

    // Crew Management
    const crewList = document.getElementById('crew-list');
    const crewInput = document.getElementById('crew-name');
    document.getElementById('add-crew').addEventListener('click', () => {
        const name = crewInput.value.trim();
        if (name) {
            const li = document.createElement('li');
            li.textContent = name;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'secondary-btn';
            removeBtn.onclick = () => li.remove();
            li.appendChild(removeBtn);
            crewList.appendChild(li);
            crewInput.value = '';
        }
    });
    crewInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('add-crew').click();
        }
    });

    // Impact Tracker (Mock Data)
    const impactData = [
        { location: 'East Coast', weight: 10 },
        { location: 'Pasir Ris', weight: 4 },
        { location: 'Sembawang', weight: 7 }
    ];
    const impactList = document.getElementById('impact-list');
    if (impactList) {
        impactData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span style='font-weight:600;color:#0077b6;'>${item.weight}kg</span> trash collected @ <span style='color:#43aa8b;'>${item.location}</span>`;
            impactList.appendChild(li);
        });
    }
});
