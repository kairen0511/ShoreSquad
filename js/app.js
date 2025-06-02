// ShoreSquad App JS
// Features to add: interactive map, weather API, crew management, accessibility enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Interactive Map Placeholder
    document.getElementById('map-container').textContent = 'Map integration coming soon!';
    document.getElementById('add-cleanup').addEventListener('click', () => {
        alert('Feature to add a new cleanup event coming soon!');
    });

    // Weather Tracker (Mocked)
    function updateWeather() {
        document.getElementById('weather-info').textContent = 'Sunny, 28°C (Sample Data)';
    }
    updateWeather();
    document.getElementById('refresh-weather').addEventListener('click', updateWeather);

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
});
