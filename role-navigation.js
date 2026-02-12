// Role-Based Navigation System for AgriTech Platform
// This script provides role-based navigation and user management

class RoleBasedNavigation {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.rolePages = {
            'farmer': {
                dashboard: 'main.html',  // Changed from farmer.html to main.html
                name: 'Main Dashboard',
                icon: '🌱',
                color: '#4caf50'
            },
            'buyer': {
                dashboard: 'buyer-dashboard.html',
                name: 'Buyer Dashboard',
                icon: '🛒',
                color: '#2196f3'
            },
            'equipment': {
                dashboard: 'shopkeeper.html',
                name: 'Equipment Directory',
                icon: '🔧',
                color: '#ff9800'
            },
            'grocery': {
                dashboard: 'organic.html',
                name: 'Organic Farming Hub',
                icon: '🍃',
                color: '#4caf50'
            },
            'tractor-owner': {
                dashboard: 'tractor-owner-dashboard.html',
                name: 'Tractor Owner Dashboard',
                icon: '🚛',
                color: '#ff6b35'
            }
        };
    }

    getCurrentUser() {
        return {
            email: localStorage.getItem('userEmail'),
            role: localStorage.getItem('userRole'),
            name: localStorage.getItem('userName'),
            loginTime: localStorage.getItem('loginTime')
        };
    }

    isLoggedIn() {
        return !!(this.currentUser.email && this.currentUser.role);
    }

    getRoleInfo(role = null) {
        const userRole = role || this.currentUser.role;
        return this.rolePages[userRole] || null;
    }

    redirectToRoleDashboard(role = null) {
        const targetRole = role || this.currentUser.role;
        const roleInfo = this.getRoleInfo(targetRole);
        
        if (roleInfo) {
            console.log(`Redirecting to ${roleInfo.name}: ${roleInfo.dashboard}`);
            window.location.href = roleInfo.dashboard;
        } else {
            console.log('No role found, redirecting to main dashboard');
            window.location.href = 'main.html';
        }
    }

    updateUserDisplay() {
        // Update user name displays
        const userNameElements = document.querySelectorAll('#user-name, .user-name');
        userNameElements.forEach(element => {
            if (this.currentUser.name) {
                element.textContent = this.currentUser.name.split(' ')[0];
            } else if (this.currentUser.email) {
                element.textContent = this.currentUser.email.split('@')[0];
            }
        });

        // Update role-specific elements
        const roleInfo = this.getRoleInfo();
        if (roleInfo) {
            // Update dashboard titles
            const dashboardTitles = document.querySelectorAll('.dashboard-title');
            dashboardTitles.forEach(title => {
                title.textContent = roleInfo.name;
            });

            // Update role badges
            const roleBadges = document.querySelectorAll('.role-badge');
            roleBadges.forEach(badge => {
                badge.innerHTML = `${roleInfo.icon} ${roleInfo.name}`;
                badge.style.backgroundColor = roleInfo.color;
            });
        }
    }

    logout() {
        // Clear all user data
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('accessToken');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }

    checkAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Pages that don't require authentication
        const publicPages = ['index.html', 'login.html', 'register.html', 'about.html'];
        
        if (publicPages.includes(currentPage)) {
            return true;
        }

        // Check if user is logged in
        if (!this.isLoggedIn()) {
            console.log('User not logged in, redirecting to login');
            window.location.href = 'login.html';
            return false;
        }

        return true;
    }

    init() {
        // Check access on page load
        if (!this.checkAccess()) {
            return;
        }

        // Update user displays
        this.updateUserDisplay();

        // Add logout handlers
        const logoutButtons = document.querySelectorAll('.logout-button, [onclick*="logout"]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    this.logout();
                }
            });
        });

        console.log('Role-based navigation initialized for:', this.currentUser);
    }
}

// Initialize role-based navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.roleNavigation = new RoleBasedNavigation();
    window.roleNavigation.init();
});

// Global logout function for compatibility
function logout() {
    if (window.roleNavigation) {
        window.roleNavigation.logout();
    } else {
        localStorage.clear();
        window.location.href = 'login.html';
    }
}