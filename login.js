// API Base URL
const API_URL = 'http://localhost:5001/api/auth';

// Demo accounts for presentation
const DEMO_ACCOUNTS = {
	'farmer@demo.com': { password: 'demo123', role: 'farmer', name: 'John Farmer' },
	'buyer@demo.com': { password: 'demo123', role: 'buyer', name: 'Sarah Buyer' },
	'equipment@demo.com': { password: 'demo123', role: 'equipment', name: 'Mike Equipment' },
	'organic@demo.com': { password: 'demo123', role: 'grocery', name: 'Lisa Organic' },
	'tractor@demo.com': { password: 'demo123', role: 'tractor-owner', name: 'David Tractor' },
	'demo@agritech.com': { password: 'demo123', role: 'farmer', name: 'Demo User' }
};

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	// Login form handler
	const loginForm = document.querySelector('form');
	if (loginForm) {
		loginForm.addEventListener('submit', handleLogin);
	}
	
	// Password toggle handler
	const passwordToggle = document.querySelector('.password-toggle');
	if (passwordToggle) {
		passwordToggle.addEventListener('click', togglePassword);
	}
	
	// Add demo account info to login page
	addDemoAccountInfo();
});

function addDemoAccountInfo() {
	const loginContainer = document.querySelector('.login-container') || document.querySelector('.container');
	if (loginContainer) {
		const demoInfo = document.createElement('div');
		demoInfo.innerHTML = `
			<div style="
				background: linear-gradient(135deg, #e3f2fd, #bbdefb);
				border: 1px solid #2196f3;
				border-radius: 10px;
				padding: 1rem;
				margin: 1rem 0;
				text-align: center;
			">
				<h4 style="color: #1976d2; margin: 0 0 0.5rem 0;">🎯 Demo Accounts for Presentation</h4>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; font-size: 0.9rem;">
					<div><strong>Farmer:</strong> farmer@demo.com</div>
					<div><strong>Buyer:</strong> buyer@demo.com</div>
					<div><strong>Equipment:</strong> equipment@demo.com</div>
					<div><strong>Organic:</strong> organic@demo.com</div>
					<div><strong>Tractor Owner:</strong> tractor@demo.com</div>
				</div>
				<div style="margin-top: 0.5rem; color: #1976d2;">
					<strong>Password for all:</strong> demo123
				</div>
			</div>
		`;
		loginContainer.insertBefore(demoInfo, loginContainer.firstChild);
	}
}

async function handleLogin(event) {
	event.preventDefault();
	
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value;
	const submitBtn = event.target.querySelector('button[type="submit"]');
	
	// Disable button and show loading
	submitBtn.disabled = true;
	submitBtn.textContent = 'Logging in...';
	
	// Check demo accounts first
	if (DEMO_ACCOUNTS[email] && DEMO_ACCOUNTS[email].password === password) {
		const account = DEMO_ACCOUNTS[email];
		
		// Store user data
		localStorage.setItem('userEmail', email);
		localStorage.setItem('userRole', account.role);
		localStorage.setItem('userName', account.name);
		localStorage.setItem('loginTime', Date.now().toString());
		localStorage.setItem('accessToken', 'demo-token-' + Date.now());
		
		showAuthMessage(`Welcome ${account.name}! Redirecting to ${account.role} dashboard...`, 'success');
		
		setTimeout(() => {
			redirectBasedOnRole(account.role);
		}, 1500);
		return;
	}
	
	// Try server authentication
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include'
		});
		
		const data = await response.json();
		
		if (response.ok) {
			// Store access token
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('userEmail', email);
			localStorage.setItem('loginTime', Date.now().toString());
			
			// Get user profile to determine role-based redirect
			try {
				const profileResponse = await fetch('http://localhost:5001/api/auth/profile', {
					headers: {
						'Authorization': `Bearer ${data.accessToken}`
					}
				});
				
				if (profileResponse.ok) {
					const userProfile = await profileResponse.json();
					localStorage.setItem('userRole', userProfile.role);
					localStorage.setItem('userName', userProfile.fullname || userProfile.username);
					
					console.log('User profile fetched:', userProfile);
					console.log('User role set to:', userProfile.role);
					
					showAuthMessage('Login successful! Redirecting...', 'success');
					
					setTimeout(() => {
						redirectBasedOnRole(userProfile.role);
					}, 1000);
				} else {
					console.error('Profile fetch failed:', profileResponse.status);
					// Fallback to main.html if profile fetch fails
					setTimeout(() => {
						window.location.href = "main.html";
					}, 1000);
				}
			} catch (error) {
				console.error('Profile fetch error:', error);
				setTimeout(() => {
					window.location.href = "main.html";
				}, 1000);
			}
		} else {
			showAuthMessage(data.message || 'Login failed', 'error');
			submitBtn.disabled = false;
			submitBtn.textContent = 'Login';
		}
	} catch (error) {
		console.error('Login error:', error);
		showAuthMessage('Server unavailable. Please use demo accounts above for presentation.', 'warning');
		submitBtn.disabled = false;
		submitBtn.textContent = 'Login';
	}
}

function togglePassword() {
	const passwordInput = document.getElementById("password");
	const eyeIcon = document.getElementById("password-eye");

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		eyeIcon.className = "fas fa-eye-slash";
	} else {
		passwordInput.type = "password";
		eyeIcon.className = "fas fa-eye";
	}
}

// Role-based redirection function
function redirectBasedOnRole(role) {
	const rolePages = {
		'farmer': 'main.html',  // Changed from farmer.html to main.html
		'buyer': 'buyer-dashboard.html',
		'equipment': 'shopkeeper.html',
		'grocery': 'organic.html',
		'tractor-owner': 'tractor-owner-dashboard.html'
	};
	
	const targetPage = rolePages[role] || 'main.html';
	console.log(`Redirecting user with role "${role}" to ${targetPage}`);
	
	// Debug: Show alert to confirm redirection
	if (role === 'farmer') {
		console.log('FARMER LOGIN DETECTED - Redirecting to main.html');
	}
	
	// Ensure the redirection happens
	if (targetPage) {
		window.location.href = targetPage;
	} else {
		console.error('No target page found for role:', role);
		window.location.href = 'main.html';
	}
}

// Utility function to show authentication messages
function showAuthMessage(message, type = 'info') {
	// Remove existing messages
	const existingMessage = document.querySelector('.auth-message');
	if (existingMessage) {
		existingMessage.remove();
	}

	// Create message element
	const messageDiv = document.createElement('div');
	messageDiv.className = `auth-message auth-message-${type}`;
	messageDiv.textContent = message;

	// Style the message
	messageDiv.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 15px 20px;
		border-radius: 5px;
		color: white;
		font-weight: 500;
		z-index: 10000;
		max-width: 350px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		animation: slideIn 0.3s ease-out;
	`;

	// Set background color based on type
	switch (type) {
		case 'success':
			messageDiv.style.background = '#4caf50';
			break;
		case 'error':
			messageDiv.style.background = '#f44336';
			break;
		case 'warning':
			messageDiv.style.background = '#ff9800';
			break;
		default:
			messageDiv.style.background = '#2196f3';
	}

	// Add animation keyframes if not already added
	if (!document.querySelector('#auth-message-styles')) {
		const style = document.createElement('style');
		style.id = 'auth-message-styles';
		style.textContent = `
			@keyframes slideIn {
				from { transform: translateX(100%); opacity: 0; }
				to { transform: translateX(0); opacity: 1; }
			}
		`;
		document.head.appendChild(style);
	}

	// Add to page
	document.body.appendChild(messageDiv);

	// Auto-remove after 5 seconds
	setTimeout(() => {
		if (messageDiv.parentNode) {
			messageDiv.style.animation = 'slideIn 0.3s ease-out reverse';
			setTimeout(() => messageDiv.remove(), 300);
		}
	}, 5000);
}