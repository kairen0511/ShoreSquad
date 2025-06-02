// ShoreSquad App JS
// Features to add: interactive map, weather API, crew management, accessibility enhancements

document.addEventListener('DOMContentLoaded', () => {
    // --- Beach Cleanup Map: Add Cleanup Event ---
    const mapContainer = document.getElementById('map-container');
    const addCleanupBtn = document.getElementById('add-cleanup');
    let cleanupEvents = [
        {
            name: 'Next Cleanup',
            location: 'Pasir Ris',
            lat: 1.381497,
            lng: 103.955574
        }
    ];
    function renderCleanupEvents() {
        let pinsHtml = cleanupEvents.map(event =>
            `<div style='margin:0.3em 0;font-size:1em;color:#0077b6;font-weight:600;'>📍 ${event.name} @ ${event.location}</div>`
        ).join('');
        document.getElementById('cleanup-pins').innerHTML = pinsHtml;
    }
    // Add a div for pins if not present
    if (!document.getElementById('cleanup-pins')) {
        const pinsDiv = document.createElement('div');
        pinsDiv.id = 'cleanup-pins';
        pinsDiv.style.marginTop = '0.5em';
        mapContainer.appendChild(pinsDiv);
    }
    renderCleanupEvents();
    addCleanupBtn.addEventListener('click', () => {
        const name = prompt('Enter event name (e.g., Beach Cleanup):', 'Beach Cleanup');
        const location = prompt('Enter location (e.g., Changi Beach):', 'Changi Beach');
        const lat = prompt('Enter latitude:', '1.3900');
        const lng = prompt('Enter longitude:', '103.9876');
        if (name && location && lat && lng) {
            cleanupEvents.push({ name, location, lat: parseFloat(lat), lng: parseFloat(lng) });
            renderCleanupEvents();
            alert('Cleanup event added! (Note: Map marker is not updated in the iframe, but event is listed below the map.)');
        }
    });

    // --- Weather Tracker: 24-hour NEA API, 3-4 cards, fallback, icons, retry ---
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcons = {
        'Fair': '☀️', 'Cloudy': '☁️', 'Partly Cloudy': '⛅', 'Showers': '🌦', 'Rain': '🌧', 'Thunderstorms': '⛈', 'Windy': '💨', 'Hazy': '🌫', 'Sunny': '☀️', 'Fair (Day)': '☀️', 'Fair (Night)': '🌙', 'Partly Cloudy (Day)': '⛅', 'Partly Cloudy (Night)': '☁️', 'Light Rain': '🌦', 'Moderate Rain': '🌧', 'Heavy Rain': '🌧', 'Passing Showers': '🌦', 'Showers with Thunder': '⛈', 'Thundery Showers': '⛈', 'Heavy Thundery Showers': '⛈', 'Heavy Thundery Showers with Gusty Winds': '⛈💨'
    };
    function getIcon(desc) {
        for (const key in weatherIcons) {
            if (desc && desc.toLowerCase().includes(key.toLowerCase())) return weatherIcons[key];
        }
        return '🌤';
    }
    function showSpinner() {
        weatherInfo.innerHTML = '<div class="spinner" style="display:flex;justify-content:center;align-items:center;height:80px;"><div style="border:4px solid #f3f3f3;border-top:4px solid #0077b6;border-radius:50%;width:32px;height:32px;animation:spin 1s linear infinite;"></div></div>';
    }
    if (!document.getElementById('weather-spinner-style')) {
        const style = document.createElement('style');
        style.id = 'weather-spinner-style';
        style.innerHTML = '@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
        document.head.appendChild(style);
    }
    async function loadWeather() {
        showSpinner();
        try {
            const response = await fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const items = data.items && data.items[0];
            const periods = items && items.periods ? items.periods : [];
            const general = items && items.general ? items.general : null;
            let html = '<div class="weather-cards">';
            let found = false;
            // Try to find Pasir Ris, else East Coast, else general
            let beachPeriods = periods.filter(p => {
                return p.regions && (p.regions['pasir_ris'] || p.regions['east_coast']);
            });
            if (beachPeriods.length === 0 && periods.length > 0) beachPeriods = periods;
            // Show up to 4 periods
            beachPeriods.slice(0, 4).forEach(period => {
                let region = period.regions['pasir_ris'] || period.regions['east_coast'] || period.regions['central'] || period.regions['north'] || period.regions['south'] || period.regions['west'];
                let desc = region || (general && general.forecast) || 'N/A';
                let temp = general && general.temperature ? `${general.temperature.low}°C - ${general.temperature.high}°C` : 'N/A';
                let rain = general && general.relative_humidity ? `${general.relative_humidity.low}% - ${general.relative_humidity.high}%` : 'N/A';
                let date = period.time ? new Date(period.time.start).toLocaleString('en-SG', { weekday: 'short', hour: '2-digit', minute: '2-digit' }) : '';
                html += `<div class="weather-card">
                    <div style='font-size:2em;margin-bottom:0.2em;'>${getIcon(desc)}</div>
                    <div style='font-weight:600;color:#0077b6;font-size:1.1em;margin-bottom:0.2em;'>${desc}</div>
                    <div style='color:#43aa8b;font-size:0.98em;'>${temp}</div>
                    <div style='color:#ff6f3c;font-size:0.95em;'>Rain: ${rain}</div>
                    <div style='color:#888;font-size:0.85em;margin-top:0.2em;'>${date}</div>
                </div>`;
                found = true;
            });
            if (!found && general) {
                html += `<div class="weather-card">
                    <div style='font-size:2em;margin-bottom:0.2em;'>${getIcon(general.forecast)}</div>
                    <div style='font-weight:600;color:#0077b6;font-size:1.1em;margin-bottom:0.2em;'>${general.forecast}</div>
                    <div style='color:#43aa8b;font-size:0.98em;'>${general.temperature.low}°C - ${general.temperature.high}°C</div>
                    <div style='color:#ff6f3c;font-size:0.95em;'>Rain: ${general.relative_humidity.low}% - ${general.relative_humidity.high}%</div>
                </div>`;
            }
            html += '</div>';
            weatherInfo.innerHTML = html;
        } catch (err) {
            weatherInfo.innerHTML = `<div class='weather-error-card'>Unable to load weather forecast.<br><button class='primary-btn' style='margin-top:1em;' id='retry-weather'>Retry</button></div>`;
            document.getElementById('retry-weather').onclick = loadWeather;
        }
    }
    const refreshBtn = document.getElementById('refresh-weather');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadWeather);
    }
    loadWeather();

    // --- Crew Management: Add/Remove Crew Members ---
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

    // --- Impact Tracker: Render Mock Data ---
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
