document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("crop-form");
  const resultContainer = document.getElementById("result-container");
  const resultText = document.getElementById("result-text");
  const guideContainer = document.getElementById("guide-container");
  const guideTitle = document.getElementById("guide-title");
  const guideTimeline = document.getElementById("guide-timeline");
  const guideHowToPlant = document.getElementById("guide-how-to-plant");
  const guideFertilizer = document.getElementById("guide-fertilizer");
  const guideIdealRainfall = document.getElementById("guide-ideal-rainfall");
  const guidePostHarvest = document.getElementById("guide-post-harvest");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      const el = document.getElementsByName(key)[0];
      data[key] = el.type === "number" ? parseFloat(value) : value;
    });

    // Show loading state
    displayLoading();

    try {
      // Call the backend API
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        displayResultAndGuide(result);
      } else {
        displayError(result.error || 'Failed to get crop recommendation. Please try again.');
      }
    } catch (error) {
      console.error("Error calling crop planner API:", error);
      displayError("Could not connect to the crop planner service. Please check your connection and try again.");
    }
  });

  /**
   * Displays a loading message in the result container.
   */
  function displayLoading() {
    resultContainer.classList.remove("hidden");
    resultText.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <span>🌱 Analyzing your farm conditions with AI...</span>
      </div>
    `;
    guideContainer.classList.add("hidden");
    
    submitBtn.innerHTML = '<span class="loading-dots"></span> Analyzing Your Farm...';
    submitBtn.disabled = true;
  }

  /**
   * Displays an error message in the result container.
   * @param {string} message The error message to display.
   */
  function displayError(message) {
    resultContainer.classList.remove("hidden");
    resultText.innerHTML = `
      <div class="error-container">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
      </div>
    `;
    guideContainer.classList.add("hidden");
    
    // Reset submit button
    submitBtn.innerHTML = 'Get Full Farming Plan';
    submitBtn.disabled = false;
  }

  /**
   * Simple function to convert basic markdown and newlines to HTML.
   * @param {string} text The text to format.
   * @returns {string} The formatted HTML string.
   */
  function formatAIResponse(text) {
    if (!text) return "";
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\n/g, "<br>");
    // Convert numbered lists
    formattedText = formattedText.replace(/(\d+\.\s)/g, "<br>$1");
    // Convert bullet points
    formattedText = formattedText.replace(/(-\s)/g, "<br>• ");
    return formattedText;
  }

  /**
   * Populates the result and guide sections with the API response.
   * @param {object} result The complete API response.
   */
  function displayResultAndGuide(result) {
    resultContainer.classList.remove("hidden");
    
    // Display crop recommendation with confidence
    const confidenceBadge = result.confidence ? 
      `<span class="confidence-badge confidence-${result.confidence.toLowerCase()}">${result.confidence} Confidence</span>` : '';
    
    const fallbackNotice = result.fallback ? 
      '<div class="fallback-notice">🤖 Using intelligent agricultural database (Gemini AI unavailable)</div>' : 
      '<div class="ai-notice">🧠 Powered by Gemini AI</div>';
    
    resultText.innerHTML = `
      <div class="crop-result">
        <span class="crop-name">${result.crop}</span>
        ${confidenceBadge}
        ${fallbackNotice}
      </div>
    `;

    // Display guide information
    const guide = result.guide || {};
    guideTitle.textContent = guide.title || `Complete Growing Guide for ${result.crop}`;

    // Populate guide sections with formatted content
    guideTimeline.innerHTML = formatAIResponse(guide.timeline || "Timeline information not available");
    guideHowToPlant.innerHTML = formatAIResponse(guide.how_to_plant || "Planting instructions not available");
    guideFertilizer.innerHTML = formatAIResponse(guide.fertilizer || "Fertilizer recommendations not available");
    guideIdealRainfall.innerHTML = formatAIResponse(guide.ideal_rainfall || "Water requirements not available");
    guidePostHarvest.innerHTML = formatAIResponse(guide.post_harvest || "Post-harvest information not available");

    // Clear any existing additional content
    const existingAdditional = guideContainer.querySelectorAll('.additional-content');
    existingAdditional.forEach(el => el.remove());

    // Add additional information if available
    if (result.additional_tips && result.additional_tips.length > 0) {
      const tipsDiv = document.createElement('div');
      tipsDiv.className = 'guide-item additional-tips additional-content';
      const tipsHtml = result.additional_tips.map(tip => `<li>${tip}</li>`).join('');
      tipsDiv.innerHTML = `
        <h4>💡 Additional Tips</h4>
        <ul>${tipsHtml}</ul>
      `;
      guideContainer.appendChild(tipsDiv);
    }

    if (result.expected_yield && result.expected_yield !== 'N/A') {
      const yieldDiv = document.createElement('div');
      yieldDiv.className = 'guide-item yield-info additional-content';
      yieldDiv.innerHTML = `
        <h4>📊 Expected Yield</h4>
        <p>${result.expected_yield}</p>
      `;
      guideContainer.appendChild(yieldDiv);
    }

    if (result.market_price && result.market_price !== 'N/A') {
      const marketDiv = document.createElement('div');
      marketDiv.className = 'guide-item market-info additional-content';
      marketDiv.innerHTML = `
        <h4>💰 Market Information</h4>
        <p>${result.market_price}</p>
      `;
      guideContainer.appendChild(marketDiv);
    }

    // Add note if using fallback
    if (result.note) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'guide-item api-note additional-content';
      noteDiv.innerHTML = `
        <h4>ℹ️ Note</h4>
        <p>${result.note}</p>
      `;
      guideContainer.appendChild(noteDiv);
    }

    guideContainer.classList.remove("hidden");
    
    // Reset submit button
    submitBtn.innerHTML = 'Get Full Farming Plan';
    submitBtn.disabled = false;
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: "smooth" });
  }
});

let scene, camera, renderer, particles;

function initThreeJS() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  createParticles();

  animate();

  window.addEventListener("resize", onWindowResize);
}

function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const greenColor = new THREE.Color(0x2e7d32);
  const lightGreenColor = new THREE.Color(0x4caf50);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 200;
    positions[i3 + 1] = (Math.random() - 0.5) * 200;
    positions[i3 + 2] = (Math.random() - 0.5) * 100;

    const color = Math.random() > 0.5 ? greenColor : lightGreenColor;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function animate() {
  requestAnimationFrame(animate);

  if (particles) {
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("load", initThreeJS);

const form = document.getElementById("crop-form");
const progressBar = document.getElementById("progress-bar");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");

function updateProgress() {
  const inputs = form.querySelectorAll("input[required], select[required]");
  const filled = Array.from(inputs).filter(
    (input) => input.value.trim() !== ""
  ).length;
  const progress = (filled / inputs.length) * 100;
  progressBar.style.width = progress + "%";
}

form.addEventListener("input", updateProgress);
form.addEventListener("change", updateProgress);

function validateField(field) {
  const formGroup = field.closest(".form-group");
  const isValid = field.value.trim() !== "" && field.checkValidity();

  formGroup.classList.remove("error", "success");
  if (field.value.trim() !== "") {
    formGroup.classList.add(isValid ? "success" : "error");
  }

  return isValid;
}

form.querySelectorAll("input, select").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.closest(".form-group").classList.contains("error")) {
      validateField(field);
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = form.querySelectorAll("input[required], select[required]");
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    const firstError = form.querySelector(".form-group.error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  submitBtn.innerHTML = '<span class="loading"></span> Analyzing Your Farm...';
  submitBtn.disabled = true;

  setTimeout(() => {
    const mockCrop = "Tomato";

    document.getElementById("result-text").textContent = mockCrop;
    document.getElementById(
      "guide-title"
    ).textContent = `Complete Growing Guide for ${mockCrop}`;

    document.getElementById("guide-timeline").textContent =
      "Plant: March-April | Harvest: June-July (90-120 days growth cycle)";
    document.getElementById("guide-how-to-plant").textContent =
      "Prepare seedbed, sow seeds 2-3cm deep with 30cm spacing between rows. Transplant seedlings after 4-6 weeks.";
    document.getElementById("guide-fertilizer").textContent =
      "Apply NPK (19:19:19) at planting, followed by weekly liquid fertilizer during growing season.";
    document.getElementById("guide-ideal-rainfall").textContent =
      "Requires 400-600mm water throughout season. Drip irrigation recommended for optimal results.";
    document.getElementById("guide-post-harvest").textContent =
      "Harvest when fruits are firm and fully colored. Store at 12-15°C. Market within 7-10 days for best prices.";

    resultContainer.classList.remove("hidden");
    resultContainer.scrollIntoView({ behavior: "smooth" });

    submitBtn.innerHTML = "Get Full Farming Plan";
    submitBtn.disabled = false;
  }, 2000);
});

updateProgress();

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});
