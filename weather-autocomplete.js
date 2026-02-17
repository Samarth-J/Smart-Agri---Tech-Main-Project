// Simple and reliable autocomplete for weather search
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutocomplete);
    } else {
        initAutocomplete();
    }
    
    function initAutocomplete() {
        const cityInput = document.getElementById('cityInput');
        const suggestionsDiv = document.getElementById('suggestions');
        
        if (!cityInput || !suggestionsDiv) {
            console.error('Autocomplete elements not found');
            return;
        }
        
        console.log('Autocomplete initialized successfully');
        
        // Karnataka Cities
        const cities = [
            'Bangalore, Karnataka, India',
            'Mysore, Karnataka, India',
            'Mangalore, Karnataka, India',
            'Hubli, Karnataka, India',
            'Belgaum, Karnataka, India',
            'Davangere, Karnataka, India',
            'Bellary, Karnataka, India',
            'Gulbarga, Karnataka, India',
            'Shimoga, Karnataka, India',
            'Tumkur, Karnataka, India',
            'Bidar, Karnataka, India',
            'Raichur, Karnataka, India',
            'Hassan, Karnataka, India',
            'Udupi, Karnataka, India',
            'Mandya, Karnataka, India',
            'Chikmagalur, Karnataka, India',
            'Dharwad, Karnataka, India',
            'Bagalkot, Karnataka, India',
            'Gadag, Karnataka, India',
            'Chitradurga, Karnataka, India',
            // Other Indian Cities
            'Mumbai, Maharashtra, India',
            'Delhi, Delhi, India',
            'Hyderabad, Telangana, India',
            'Chennai, Tamil Nadu, India',
            'Kolkata, West Bengal, India',
            'Pune, Maharashtra, India',
            'Ahmedabad, Gujarat, India',
            'Jaipur, Rajasthan, India',
            'Lucknow, Uttar Pradesh, India',
            'Chandigarh, Chandigarh, India',
            'Indore, Madhya Pradesh, India',
            'Bhopal, Madhya Pradesh, India',
            'Nagpur, Maharashtra, India',
            'Patna, Bihar, India',
            'Surat, Gujarat, India',
            'Vadodara, Gujarat, India',
            'Coimbatore, Tamil Nadu, India',
            'Kochi, Kerala, India',
            'Visakhapatnam, Andhra Pradesh, India',
            'Thiruvananthapuram, Kerala, India'
        ];
        
        // Input event
        cityInput.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();
            console.log('Input value:', value);
            
            if (value.length === 0) {
                hideSuggestions();
                return;
            }
            
            // Filter cities
            const matches = cities.filter(city => 
                city.toLowerCase().includes(value)
            ).slice(0, 8);
            
            console.log('Matches found:', matches.length);
            
            if (matches.length > 0) {
                showSuggestions(matches);
            } else {
                hideSuggestions();
            }
        });
        
        // Focus event
        cityInput.addEventListener('focus', function() {
            const value = this.value.trim().toLowerCase();
            if (value.length > 0) {
                const matches = cities.filter(city => 
                    city.toLowerCase().includes(value)
                ).slice(0, 8);
                
                if (matches.length > 0) {
                    showSuggestions(matches);
                }
            }
        });
        
        // Click outside to close
        document.addEventListener('click', function(e) {
            if (e.target !== cityInput && e.target !== suggestionsDiv && !suggestionsDiv.contains(e.target)) {
                hideSuggestions();
            }
        });
        
        function showSuggestions(matches) {
            suggestionsDiv.innerHTML = '';
            
            matches.forEach(function(cityStr) {
                const parts = cityStr.split(',');
                const cityName = parts[0].trim();
                const region = parts[1] ? parts[1].trim() : '';
                const country = parts[2] ? parts[2].trim() : '';
                
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="suggestion-city">${cityName}</span>
                    <span class="suggestion-country">${region}, ${country}</span>
                `;
                
                div.addEventListener('click', function(e) {
                    e.stopPropagation();
                    cityInput.value = cityName;
                    hideSuggestions();
                    
                    // Trigger search
                    const searchBtn = document.getElementById('searchBtn');
                    if (searchBtn) {
                        searchBtn.click();
                    }
                });
                
                suggestionsDiv.appendChild(div);
            });
            
            suggestionsDiv.classList.add('active');
            console.log('Suggestions displayed');
        }
        
        function hideSuggestions() {
            suggestionsDiv.classList.remove('active');
            suggestionsDiv.innerHTML = '';
        }
    }
})();
