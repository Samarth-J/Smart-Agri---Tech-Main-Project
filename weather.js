// Weather API Configuration
const API_KEY = "005186776a4c4589a6e90608250407";
const API_URL = "https://api.weatherapi.com/v1";
const DEFAULT_CITY = "New Delhi";

// Cache DOM elements for better performance
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    currentWeather: document.getElementById('currentWeather'),
    cityName: document.getElementById('cityName'),
    region: document.getElementById('region'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    weatherIcon: document.getElementById('weatherIcon'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    visibility: document.getElementById('visibility'),
    hourlyForecast: document.getElementById('hourlyForecast'),
    dailyForecast: document.getElementById('dailyForecast'),
    // AQI elements
    aqiContainer: document.getElementById('aqiContainer'),
    aqi: document.getElementById('aqi'),
    airQualityDetails: document.getElementById('airQualityDetails'),
    pm25: document.getElementById('pm25'),
    pm10: document.getElementById('pm10'),
    co: document.getElementById('co'),
    no2: document.getElementById('no2'),
    o3: document.getElementById('o3'),
    so2: document.getElementById('so2'),
    aqiDescription: document.getElementById('aqiDescription')
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchWeather(DEFAULT_CITY);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Handle search
function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Please enter a city name');
    }
}

// Show/hide UI states
function showLoading() {
    elements.loading.style.display = 'block';
    elements.error.style.display = 'none';
    elements.currentWeather.style.display = 'none';
}

function hideLoading() {
    elements.loading.style.display = 'none';
}

function showError(message) {
    elements.error.textContent = message;
    elements.error.style.display = 'block';
    elements.currentWeather.style.display = 'none';
    hideLoading();
}

function showWeather() {
    elements.error.style.display = 'none';
    elements.currentWeather.style.display = 'block';
    hideLoading();
}

// Fetch weather data
async function fetchWeather(location) {
    showLoading();

    try {
        // Fetch current weather and forecast in parallel for faster loading
        const [currentData, forecastData] = await Promise.all([
            fetch(`${API_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`).then(r => r.json()),
            fetch(`${API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=yes`).then(r => r.json())
        ]);

        // Check for errors
        if (currentData.error) {
            throw new Error(currentData.error.message);
        }

        // Display all data
        displayCurrentWeather(currentData);
        displayAirQuality(currentData);
        displayHourlyForecast(forecastData);
        displayDailyForecast(forecastData);
        updateBackground(currentData.current.condition.text);
        showWeather();

    } catch (error) {
        console.error('Weather fetch error:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const { location, current } = data;
    
    elements.cityName.textContent = location.name;
    elements.region.textContent = `${location.region}, ${location.country}`;
    elements.temperature.textContent = `${Math.round(current.temp_c)}°C`;
    elements.description.textContent = current.condition.text;
    elements.weatherIcon.src = `https:${current.condition.icon}`;
    elements.weatherIcon.alt = current.condition.text;
    elements.humidity.textContent = `${current.humidity}%`;
    elements.wind.textContent = `${current.wind_kph} km/h`;
    elements.visibility.textContent = `${current.vis_km} km`;
    
    // Update 3D weather scene
    const isDay = current.is_day === 1;
    if (window.weatherScene) {
        window.weatherScene.updateWeatherCondition(current.condition.text, isDay);
    }
}

// Display air quality data
function displayAirQuality(data) {
    const airQuality = data.current.air_quality;
    
    if (!airQuality) {
        elements.aqiContainer.style.display = 'none';
        elements.airQualityDetails.style.display = 'none';
        return;
    }
    
    // Get US EPA Index (most commonly used)
    const aqiValue = Math.round(airQuality['us-epa-index'] || 0);
    
    if (aqiValue > 0) {
        elements.aqiContainer.style.display = 'block';
        elements.airQualityDetails.style.display = 'block';
        
        // Display AQI value with color coding
        const aqiInfo = getAQIInfo(aqiValue);
        elements.aqi.textContent = aqiValue;
        elements.aqi.style.color = aqiInfo.color;
        
        // Update icon color
        const aqiIcon = elements.aqiContainer.querySelector('i');
        if (aqiIcon) {
            aqiIcon.style.color = aqiInfo.color;
        }
        
        // Display pollutant details
        elements.pm25.textContent = `${airQuality.pm2_5.toFixed(1)} μg/m³`;
        elements.pm10.textContent = `${airQuality.pm10.toFixed(1)} μg/m³`;
        elements.co.textContent = `${airQuality.co.toFixed(1)} μg/m³`;
        elements.no2.textContent = `${airQuality.no2.toFixed(1)} μg/m³`;
        elements.o3.textContent = `${airQuality.o3.toFixed(1)} μg/m³`;
        elements.so2.textContent = `${airQuality.so2.toFixed(1)} μg/m³`;
        
        // Display AQI description
        elements.aqiDescription.textContent = aqiInfo.description;
        elements.aqiDescription.style.color = aqiInfo.color;
    } else {
        elements.aqiContainer.style.display = 'none';
        elements.airQualityDetails.style.display = 'none';
    }
}

// Get AQI information based on value
function getAQIInfo(aqi) {
    if (aqi <= 1) {
        return {
            color: '#4CAF50',
            description: '✓ Good - Air quality is satisfactory, and air pollution poses little or no risk.'
        };
    } else if (aqi <= 2) {
        return {
            color: '#FFEB3B',
            description: '⚠ Moderate - Air quality is acceptable. However, there may be a risk for some people.'
        };
    } else if (aqi <= 3) {
        return {
            color: '#FF9800',
            description: '⚠ Unhealthy for Sensitive Groups - Members of sensitive groups may experience health effects.'
        };
    } else if (aqi <= 4) {
        return {
            color: '#F44336',
            description: '⚠ Unhealthy - Some members of the general public may experience health effects.'
        };
    } else if (aqi <= 5) {
        return {
            color: '#9C27B0',
            description: '⚠ Very Unhealthy - Health alert: The risk of health effects is increased for everyone.'
        };
    } else {
        return {
            color: '#880E4F',
            description: '⚠ Hazardous - Health warning of emergency conditions: everyone is more likely to be affected.'
        };
    }
}

// Display hourly forecast
function displayHourlyForecast(data) {
    const container = elements.hourlyForecast;
    container.innerHTML = '';
    
    const currentHour = new Date(data.location.localtime).getHours();
    const todayHours = data.forecast.forecastday[0].hour;
    const tomorrowHours = data.forecast.forecastday[1]?.hour || [];
    
    // Combine today's remaining hours with tomorrow's hours
    const allHours = [...todayHours, ...tomorrowHours];
    
    // Show next 24 hours
    let count = 0;
    for (const hourData of allHours) {
        const hour = new Date(hourData.time).getHours();
        
        if (count < 24 && (count > 0 || hour > currentHour)) {
            container.appendChild(createForecastCard({
                time: `${hour}:00`,
                icon: hourData.condition.icon,
                temp: `${Math.round(hourData.temp_c)}°C`,
                condition: hourData.condition.text
            }));
            count++;
        }
    }
}

// Display daily forecast
function displayDailyForecast(data) {
    const container = elements.dailyForecast;
    container.innerHTML = '';
    
    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        container.appendChild(createForecastCard({
            time: dayName,
            icon: day.day.condition.icon,
            temp: `${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°`,
            condition: day.day.condition.text
        }));
    });
}

// Create forecast card (reusable)
function createForecastCard({ time, icon, temp, condition }) {
    const card = document.createElement('div');
    card.className = 'forecast-item';
    card.innerHTML = `
        <p style="font-weight: 600; margin-bottom: 5px;">${time}</p>
        <img src="https:${icon}" alt="${condition}" loading="lazy">
        <p style="font-weight: 600; color: var(--primary-green, #2e7d32); margin-top: 5px;">${temp}</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary, #666); margin-top: 5px;">${condition}</p>
    `;
    return card;
}

// Update background based on weather condition
function updateBackground(condition) {
    const body = document.body;
    const lowerCondition = condition.toLowerCase();
    
    const backgrounds = {
        sunny: 'linear-gradient(135deg, #87CEEB 0%, #f6d365 50%, #fda085 100%)',
        clear: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cloudy: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
        rain: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
        snow: 'linear-gradient(135deg, #e6dada 0%, #274046 100%)',
        thunder: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        fog: 'linear-gradient(135deg, #ada996 0%, #f2f2f2 100%)',
        mist: 'linear-gradient(135deg, #ada996 0%, #f2f2f2 100%)'
    };
    
    let gradient = backgrounds.clear; // default
    
    for (const [key, value] of Object.entries(backgrounds)) {
        if (lowerCondition.includes(key)) {
            gradient = value;
            break;
        }
    }
    
    body.style.background = gradient;
    body.style.backgroundAttachment = 'fixed';
}

// Add smooth scroll for forecast sections
elements.hourlyForecast?.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        elements.hourlyForecast.scrollLeft += e.deltaY;
    }
});

elements.dailyForecast?.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        elements.dailyForecast.scrollLeft += e.deltaY;
    }
});