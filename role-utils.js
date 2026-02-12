// Role-based utility functions for AgriTech
// THIS SCRIPT SHOULD ONLY RUN ON MAIN.HTML

// Role-based page mapping
const ROLE_PAGES = {
    'farmer': {
        dashboard: 'main.html',  // Changed from farmer.html to main.html
        name: 'Main Dashboard',
        icon: '🚜',
        description: 'Connect with buyers, access farming tools, and get agricultural insights'
    },
    'buyer': {
        dashboard: 'buyer-dashboard.html',
        name: 'Buyer Dashboard',
        icon: '🛒',
        description: 'Source fresh produce, connect with farmers, and manage purchases'
    },
    'equipment': {
        dashboard: 'shopkeeper.html',
        name: 'Equipment Directory',
        icon: '🔧',
        description: 'Manage equipment listings, connect with farmers, and expand business'
    },
    'grocery': {
        dashboard: 'organic.html',
        name: 'Organic Farming Hub',
        icon: '🏪',
        description: 'Access organic produce, sustainable practices, and supply chain'
    },
    'tractor-owner': {
        dashboard: 'tractor-owner-dashboard.html',
        name: 'Tractor Owner Dashboard',
        icon: '🚛',
        description: 'Manage your tractor fleet, handle booking requests, and track earnings'
    }
};

// SAFETY CHECK - Only run on main.html
const currentPage = window.location.pathname.split('/').pop();
if (currentPage !== 'main.html') {
    console.log('role-utils.js: Not on main.html, exiting...');
    // Exit immediately if not on main.html
    return;
}

// Get current user role
function getCurrentUserRole() {
    return localStorage.getItem('userRole') || null;
}

// Get role-specific dashboard URL
function getRoleDashboard(role = null) {
    const userRole = role || getCurrentUserRole();
    if (!userRole) return 'main.html';
    return ROLE_PAGES[userRole]?.dashboard || 'main.html';
}

// Get role information
function getRoleInfo(role = null) {
    const userRole = role || getCurrentUserRole();
    if (!userRole) return null;
    return ROLE_PAGES[userRole] || null;
}

// Redirect to role-specific dashboard
function redirectToRoleDashboard(role = null) {
    const targetPage = getRoleDashboard(role);
    console.log(`Redirecting to role-specific dashboard: ${targetPage}`);
    window.location.href = targetPage;
}

// Check if user should be redirected based on current page and role
function checkRoleBasedAccess() {
    // ONLY run on main.html
    if (currentPage !== 'main.html') {
        return;
    }
    
    const userRole = localStorage.getItem('userRole');
    
    // Don't show suggestions if no role is set
    if (!userRole) return;
    
    const expectedPage = getRoleDashboard(userRole);
    
    // Only show suggestions if user has a specific role dashboard
    if (expectedPage !== 'main.html') {
        showRoleSuggestion(userRole);
    }
}

// Show suggestion to go to role-specific page
function showRoleSuggestion(role) {
    // SAFETY CHECK - Only run on main.html
    if (currentPage !== 'main.html') {
        return;
    }
    
    // Remove any existing banners first
    const existingBanner = document.getElementById('role-suggestion-banner');
    if (existingBanner) {
        existingBanner.remove();
    }
    
    const roleInfo = getRoleInfo(role);
    if (!roleInfo) return;
    
    // Create suggestion banner
    const banner = document.createElement('div');
    banner.id = 'role-suggestion-banner';
    banner.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        ">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 1.5rem;">${roleInfo.icon}</span>
                    <div style="text-align: left;">
                        <strong>Welcome to your ${roleInfo.name}!</strong>
                        <div style="font-size: 0.9rem; opacity: 0.9;">${roleInfo.description}</div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <button onclick="redirectToRoleDashboard('${role}')" style="
                        background: white;
                        color: #4caf50;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: 500;
                    ">Go to ${roleInfo.name}</button>
                    <button onclick="document.getElementById('role-suggestion-banner').remove()" style="
                        background: transparent;
                        color: white;
                        border: 1px solid white;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Stay Here</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        const bannerElement = document.getElementById('role-suggestion-banner');
        if (bannerElement) {
            bannerElement.remove();
        }
    }, 10000);
}

// Initialize role-based functionality - ONLY ON MAIN.HTML
document.addEventListener('DOMContentLoaded', function() {
    // FINAL SAFETY CHECK
    if (currentPage !== 'main.html') {
        console.log('role-utils.js: Final safety check failed, not on main.html');
        return;
    }
    
    console.log('role-utils.js: Initializing on main.html');
    
    // Only show suggestions if user has been logged in for a while
    // This prevents showing suggestions immediately after login redirects
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = Date.now();
    
    // Only show suggestions if user has been logged in for more than 5 seconds
    // or if no login time is recorded (direct navigation)
    if (!loginTime || (currentTime - parseInt(loginTime)) > 5000) {
        setTimeout(checkRoleBasedAccess, 1000);
    }
});