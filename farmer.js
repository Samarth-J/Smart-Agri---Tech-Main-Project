let products = [];
let requests = [];
let bookings = [];

// DOM elements
let tabButtons, sections, productForm, buyForm, tractorForm;
let productDisplay, buyRequestDisplay, bookingDisplay;
let productCount, requestCount, bookingCount;

// Initialize DOM elements when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    tabButtons = document.querySelectorAll(".tab-button");
    sections = document.querySelectorAll(".section");
    productForm = document.getElementById("product-form");
    buyForm = document.getElementById("buy-form");
    tractorForm = document.getElementById("tractor-form");
    productDisplay = document.getElementById("product-display");
    buyRequestDisplay = document.getElementById("buy-request-display");
    bookingDisplay = document.getElementById("booking-display");
    productCount = document.getElementById("product-count");
    requestCount = document.getElementById("request-count");
    bookingCount = document.getElementById("booking-count");
    
    // Update user info display
    updateUserInfo();
    
    // Initialize the page
    initializePage();
});

function updateUserInfo() {
    const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Farmer';
    const userRole = localStorage.getItem('userRole') || 'farmer';
    
    // Update header if there's a user info section
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.innerHTML = `<i class="fas fa-seedling"></i> Welcome, ${userName.split(' ')[0]}!`;
    }
    
    console.log(`Farmer dashboard loaded for: ${userName} (${userRole})`);
}

function initializePage() {
    // Load data from localStorage
    loadStoredData();
    
    // Render initial content
    renderProducts();
    renderRequests();
    renderBookings();
    
    // Update counters
    updateProductCount();
    updateRequestCount();
    updateBookingCount();
    
    // Handle hash navigation
    handleHashNavigation();
    
    // Set up event listeners
    setupEventListeners();
}

function loadStoredData() {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('farmerProducts');
    if (storedProducts) {
        try {
            products = JSON.parse(storedProducts);
        } catch (e) {
            console.error('Error loading products:', e);
            products = [];
        }
    }
    
    // Load requests from localStorage
    const storedRequests = localStorage.getItem('farmerRequests');
    if (storedRequests) {
        try {
            requests = JSON.parse(storedRequests);
        } catch (e) {
            console.error('Error loading requests:', e);
            requests = [];
        }
    }
    
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('farmerBookings');
    if (storedBookings) {
        try {
            bookings = JSON.parse(storedBookings);
        } catch (e) {
            console.error('Error loading bookings:', e);
            bookings = [];
        }
    }
}

function setupEventListeners() {
    // Tab switching
    if (tabButtons) {
        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const sectionId = button.dataset.section;
                switchToTab(sectionId);
            });
        });
    }
    
    // Form submissions
    if (productForm) {
        productForm.addEventListener("submit", handleProductSubmission);
    }
    
    if (buyForm) {
        buyForm.addEventListener("submit", handleBuyRequestSubmission);
    }
    
    if (tractorForm) {
        tractorForm.addEventListener("submit", handleTractorBooking);
    }
    
    // Hash navigation
    window.addEventListener('hashchange', handleHashNavigation);
}

// Tab switching functionality
function switchToTab(sectionId) {
  if (!tabButtons || !sections) return;
  
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  sections.forEach((section) => section.classList.remove("active"));
  
  const targetButton = document.querySelector(`[data-section="${sectionId}"]`);
  const targetSection = document.getElementById(`${sectionId}-section`);
  
  if (targetButton && targetSection) {
    targetButton.classList.add("active");
    targetSection.classList.add("active");
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;
    switchToTab(sectionId);
  });
});

// Check for hash on page load
document.addEventListener('DOMContentLoaded', handleHashNavigation);

// Listen for hash changes
window.addEventListener('hashchange', handleHashNavigation);

// Utility functions
function showSuccessMessage(container, message) {
  const existingMessage = container.querySelector(".success-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            `;

  container.insertBefore(successDiv, container.firstChild);

  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

function updateProductCount() {
  if (productCount) {
    productCount.textContent = `${products.length} Product${
      products.length !== 1 ? "s" : ""
    }`;
  }
}

function updateRequestCount() {
  if (requestCount) {
    requestCount.textContent = `${requests.length} Request${
      requests.length !== 1 ? "s" : ""
    }`;
  }
}

function createProductItem(product, index) {
  return `
                <div class="listing-item">
                    <div class="listing-header">
                        <div>
                            <div class="listing-title">${product.name}</div>
                            <div class="listing-price">${product.price}</div>
                        </div>
                        <button class="delete-btn" onclick="removeProduct(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="listing-details">
                        <div class="listing-detail">
                            <i class="fas fa-user"></i>
                            <span>Seller: ${product.sellerName}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-phone"></i>
                            <span>${product.contact}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-weight"></i>
                            <span>Quantity: ${product.quantity}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-clock"></i>
                            <span>Listed: ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
}

function createRequestItem(request, index) {
  return `
                <div class="listing-item">
                    <div class="listing-header">
                        <div>
                            <div class="listing-title">Looking for: ${
                              request.productName
                            }</div>
                        </div>
                        <button class="delete-btn" onclick="removeRequest(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="listing-details">
                        <div class="listing-detail">
                            <i class="fas fa-user"></i>
                            <span>Buyer: ${request.buyerName}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-phone"></i>
                            <span>${request.contact}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-weight"></i>
                            <span>Needed: ${request.quantity}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-clock"></i>
                            <span>Requested: ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
}

function renderProducts() {
  if (products.length === 0) {
    productDisplay.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-box-open"></i>
                        <p>No products listed yet. Add your first product!</p>
                    </div>
                `;
  } else {
    productDisplay.innerHTML = products
      .map((product, index) => createProductItem(product, index))
      .join("");
  }
  updateProductCount();
}

function renderRequests() {
  if (requests.length === 0) {
    buyRequestDisplay.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <p>No buy requests yet. Submit your first request!</p>
                    </div>
                `;
  } else {
    buyRequestDisplay.innerHTML = requests
      .map((request, index) => createRequestItem(request, index))
      .join("");
  }
  updateRequestCount();
}

// Global functions for delete buttons
window.removeProduct = function (index) {
  products.splice(index, 1);
  renderProducts();
  showSuccessMessage(productDisplay, "Product removed successfully!");
};

window.removeRequest = function (index) {
  requests.splice(index, 1);
  renderRequests();
  showSuccessMessage(buyRequestDisplay, "Request removed successfully!");
};

// Form submissions
productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(productForm);
  const product = {
    sellerName: document.getElementById("seller-name").value.trim(),
    contact: document.getElementById("seller-contact").value.trim(),
    name: document.getElementById("product-name").value.trim(),
    quantity: document.getElementById("product-quantity").value.trim(),
    price: document.getElementById("product-price").value.trim(),
  };

  if (Object.values(product).every((value) => value)) {
    products.push(product);
    renderProducts();
    productForm.reset();
    showSuccessMessage(productDisplay, "Product added successfully!");
  }
});

buyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const request = {
    buyerName: document.getElementById("buyer-name").value.trim(),
    contact: document.getElementById("buyer-contact").value.trim(),
    productName: document.getElementById("buy-product-name").value.trim(),
    quantity: document.getElementById("buy-product-quantity").value.trim(),
  };

  if (Object.values(request).every((value) => value)) {
    requests.push(request);
    renderRequests();
    buyForm.reset();
    showSuccessMessage(
      buyRequestDisplay,
      "Buy request submitted successfully!"
    );
  }
});

// Initialize
renderProducts();
renderRequests();

// Tractor booking functionality
const equipmentPrices = {
  'tractor': 350,
  'tractor-plowing': 400,
  'tractor-harvester': 500,
  'tractor-seeder': 300,
  'cultivator': 250,
  'thresher': 300,
  'sprayer': 200,
  'rotavator': 280
};

function updateBookingCount() {
  bookingCount.textContent = `${bookings.length} Booking${bookings.length !== 1 ? 's' : ''}`;
}

function calculateCost() {
  const equipmentType = document.getElementById('equipment-type').value;
  const duration = document.getElementById('booking-duration').value;
  
  if (equipmentType && duration) {
    const basePrice = equipmentPrices[equipmentType] || 350;
    const hours = parseInt(duration);
    const totalCost = basePrice * hours;
    
    // Update summary
    const summary = document.getElementById('booking-summary');
    const equipmentName = document.getElementById('equipment-type').selectedOptions[0].text;
    const durationText = document.getElementById('booking-duration').selectedOptions[0].text;
    const bookingDate = document.getElementById('booking-date').value;
    
    document.getElementById('summary-equipment').textContent = equipmentName;
    document.getElementById('summary-duration').textContent = durationText;
    document.getElementById('summary-cost').textContent = `₹${totalCost.toLocaleString()}`;
    document.getElementById('summary-date').textContent = bookingDate || '-';
    
    summary.style.display = 'block';
  }
}

function createBookingItem(booking, index) {
  const statusClass = booking.status === 'confirmed' ? 'status-confirmed' : 
                     booking.status === 'pending' ? 'status-pending' : 'status-cancelled';
  
  return `
    <div class="listing-item booking-item">
      <div class="listing-header">
        <div>
          <div class="listing-title">${booking.equipmentType}</div>
          <div class="booking-status ${statusClass}">${booking.status.toUpperCase()}</div>
        </div>
        <button class="delete-btn" onclick="cancelBooking(${index})">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
      <div class="listing-details">
        <div class="listing-detail">
          <i class="fas fa-user"></i>
          <span>Farmer: ${booking.farmerName}</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-phone"></i>
          <span>${booking.contact}</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>Location: ${booking.location}</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-calendar"></i>
          <span>Date: ${booking.date}</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-clock"></i>
          <span>Duration: ${booking.duration} hours</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-rupee-sign"></i>
          <span>Cost: ₹${booking.cost.toLocaleString()}</span>
        </div>
        <div class="listing-detail">
          <i class="fas fa-tools"></i>
          <span>Work: ${booking.workType}</span>
        </div>
      </div>
    </div>
  `;
}

function renderBookings() {
  if (bookings.length === 0) {
    bookingDisplay.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-tractor"></i>
        <p>No equipment bookings yet. Make your first booking!</p>
      </div>
    `;
  } else {
    bookingDisplay.innerHTML = bookings
      .map((booking, index) => createBookingItem(booking, index))
      .join('');
  }
  updateBookingCount();
}

// Global function for cancel booking
window.cancelBooking = function(index) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    bookings.splice(index, 1);
    renderBookings();
    showSuccessMessage(bookingDisplay, 'Booking cancelled successfully!');
  }
};

// Add event listeners for cost calculation
document.getElementById('equipment-type').addEventListener('change', calculateCost);
document.getElementById('booking-duration').addEventListener('change', calculateCost);
document.getElementById('booking-date').addEventListener('change', calculateCost);

// Tractor form submission
if (tractorForm) {
  tractorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const equipmentType = document.getElementById('equipment-type').value;
    const duration = parseInt(document.getElementById('booking-duration').value);
    const basePrice = equipmentPrices[equipmentType] || 350;
    const totalCost = basePrice * duration;
    
    const booking = {
      farmerName: document.getElementById('farmer-name').value.trim(),
      contact: document.getElementById('farmer-contact').value.trim(),
      location: document.getElementById('farm-location').value.trim(),
      farmArea: document.getElementById('farm-area').value.trim(),
      equipmentType: document.getElementById('equipment-type').selectedOptions[0].text,
      date: document.getElementById('booking-date').value,
      duration: duration,
      workType: document.getElementById('work-type').selectedOptions[0].text,
      specialRequirements: document.getElementById('special-requirements').value.trim(),
      cost: totalCost,
      status: 'pending',
      bookingId: 'TRB' + Date.now().toString().slice(-6)
    };
    
    if (booking.farmerName && booking.contact && booking.location && booking.equipmentType && booking.date && booking.workType) {
      bookings.push(booking);
      
      // Send booking request to tractor owners (simulate API call)
      sendBookingToTractorOwners(booking);
      
      renderBookings();
      tractorForm.reset();
      document.getElementById('booking-summary').style.display = 'none';
      
      // Show success message with booking details
      const successMessage = `
        Booking request sent to tractor owners! 
        Booking ID: ${booking.bookingId}
        Equipment: ${booking.equipmentType}
        Date: ${booking.date}
        Cost: ₹${booking.cost.toLocaleString()}
        Status: Pending Confirmation
      `;
      
      showSuccessMessage(bookingDisplay, successMessage);
      
      // Switch to bookings view
      setTimeout(() => {
        alert(`Booking Request Submitted Successfully!\n\nBooking ID: ${booking.bookingId}\nEquipment: ${booking.equipmentType}\nDate: ${booking.date}\nEstimated Cost: ₹${booking.cost.toLocaleString()}\n\nTractor owners have been notified. You will receive a confirmation call within 2 hours.`);
      }, 500);
    }
  });
}

// Initialize bookings
renderBookings();

// Function to send booking request to tractor owners
function sendBookingToTractorOwners(booking) {
  // In a real application, this would be an API call to the backend
  // The backend would then notify all tractor owners about the new booking request
  
  console.log('Sending booking request to tractor owners:', booking);
  
  // Store the booking request in localStorage for demo purposes
  // In production, this would be handled by the backend database
  const tractorBookingRequests = JSON.parse(localStorage.getItem('tractorBookingRequests') || '[]');
  
  const requestForTractorOwners = {
    id: booking.bookingId,
    farmerName: booking.farmerName,
    contact: booking.contact,
    location: booking.location,
    farmArea: booking.farmArea,
    equipmentType: booking.equipmentType,
    date: booking.date,
    duration: booking.duration,
    workType: booking.workType,
    specialRequirements: booking.specialRequirements,
    cost: booking.cost,
    status: 'pending',
    requestTime: new Date().toLocaleString(),
    timestamp: Date.now()
  };
  
  tractorBookingRequests.push(requestForTractorOwners);
  localStorage.setItem('tractorBookingRequests', JSON.stringify(tractorBookingRequests));
  
  // Simulate notification to tractor owners
  console.log('Booking request stored for tractor owners to view');
}