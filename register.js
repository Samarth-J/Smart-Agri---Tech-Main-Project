// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Register form handler
  const registerForm = document.querySelector('form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Password toggle handler
  const passwordToggle = document.querySelector('.password-toggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', togglePassword);
  }
  
  // Password strength checker
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
  }
  
  // Role icon updater
  const roleSelect = document.getElementById('role');
  if (roleSelect) {
    roleSelect.addEventListener('change', updateRoleIcon);
  }
  
  // Progress tracking
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', updateProgress);
    input.addEventListener('change', updateProgress);
  });
  
  // Initial progress update
  updateProgress();
});

// Password toggle functionality
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

// Role icon update
function updateRoleIcon() {
  const roleSelect = document.getElementById("role");
  const roleIcon = document.getElementById("role-icon");
  const value = roleSelect.value;

  roleIcon.className = "fas fa-user-tag";

  switch (value) {
    case "buyer":
      roleIcon.className = "fas fa-shopping-cart role-buyer";
      break;
    case "farmer":
      roleIcon.className = "fas fa-tractor role-farmer";
      break;
    case "equipment":
      roleIcon.className = "fas fa-tools role-equipment";
      break;
    case "grocery":
      roleIcon.className = "fas fa-store role-grocery";
      break;
    case "tractor-owner":
      roleIcon.className = "fas fa-truck role-tractor-owner";
      break;
    default:
      roleIcon.className = "fas fa-user-tag";
  }
}

// Password strength checker
function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");

  let strength = 0;
  let feedback = "";

  // Length check
  if (password.length >= 8) strength += 25;

  if (/[a-z]/.test(password)) strength += 25;

  if (/[A-Z]/.test(password)) strength += 25;
  
  if (/[\d\W]/.test(password)) strength += 25;

  // Update strength bar
  strengthBar.className = "strength-bar";

  if (strength <= 25) {
    strengthBar.classList.add("strength-weak");
    feedback = "Weak password";
  } else if (strength <= 50) {
    strengthBar.classList.add("strength-fair");
    feedback = "Fair password";
  } else if (strength <= 75) {
    strengthBar.classList.add("strength-good");
    feedback = "Good password";
  } else {
    strengthBar.classList.add("strength-strong");
    feedback = "Strong password";
  }

  strengthText.textContent = password.length > 0 ? feedback : "";
}

// Form progress tracking
function updateProgress() {
  const fields = ["role", "fullname", "email", "password"];
  let completedFields = 0;

  fields.forEach((fieldId, index) => {
    const field = document.getElementById(fieldId);
    const step = document.getElementById(`step-${index + 1}`);

    if (field.value.trim() !== "") {
      step.classList.add("completed");
      completedFields++;
    } else {
      step.classList.remove("completed");
    }
  });

  const password = document.getElementById("password").value;
  const finalStep = document.getElementById("step-5");

  if (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[\d\W]/.test(password)
  ) {
    finalStep.classList.add("completed");
  } else {
    finalStep.classList.remove("completed");
  }
}

// API Base URL
const API_URL = 'http://localhost:5001/api/auth';

// Enhanced register handler
async function handleRegister(event) {
  event.preventDefault();

  const registerBtn = document.getElementById("register-btn");
  const registerText = document.getElementById("register-text");
  const inputs = document.querySelectorAll("input, select");

  registerBtn.classList.add("loading");
  registerText.textContent = "Creating Account...";
  registerBtn.disabled = true;

  inputs.forEach((input) => {
    input.classList.remove("error", "success");
  });

  const formData = {
    role: document.getElementById("role").value,
    username: document.getElementById("fullname").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      inputs.forEach((input) => {
        input.classList.add("success");
      });
      
      registerText.textContent = "Account Created!";
      showAuthMessage(data.message || 'Registration successful!', 'success');
      
      // Store the role for potential future use
      localStorage.setItem('registeredRole', formData.role);
      
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      // Show error message
      showAuthMessage(data.message || 'Registration failed', 'error');
      
      // Mark relevant fields as error
      if (data.message.includes('email')) {
        document.getElementById("email").classList.add("error");
      }
      if (data.message.includes('password') || data.message.includes('Password')) {
        document.getElementById("password").classList.add("error");
      }
      
      registerBtn.classList.remove("loading");
      registerText.textContent = "Create Account";
      registerBtn.disabled = false;
    }
  } catch (error) {
    console.error('Registration error:', error);
    showAuthMessage('Connection error. Please check if the server is running.', 'error');
    
    registerBtn.classList.remove("loading");
    registerText.textContent = "Create Account";
    registerBtn.disabled = false;
  }
}

// Add input event listeners for progress tracking
document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", updateProgress);
  input.addEventListener("change", updateProgress);

  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const form = document.querySelector("form");
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "SELECT"
    ) {
      const inputs = Array.from(form.querySelectorAll("input, select"));
      const currentIndex = inputs.indexOf(document.activeElement);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        form.dispatchEvent(new Event("submit"));
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", updateProgress);

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
		max-width: 300px;
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