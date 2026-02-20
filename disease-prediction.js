// Disease Prediction using Llama 3.2 Vision
let selectedImage = null;
let selectedImageBase64 = null;

// Image input handler
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        selectedImage = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(event) {
            selectedImageBase64 = event.target.result;
            document.getElementById('imagePreview').src = event.target.result;
            document.getElementById('previewSection').style.display = 'block';
            document.getElementById('resultsSection').style.display = 'none';
            
            // Scroll to preview
            document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        };
        reader.readAsDataURL(file);
    }
});

// Analyze button handler
document.getElementById('analyzeBtn').addEventListener('click', () => analyzeImage(true));
document.getElementById('quickAnalyzeBtn').addEventListener('click', () => analyzeImage(false));

async function analyzeImage(useVision = true) {
    if (!selectedImageBase64) {
        alert('Please select an image first');
        return;
    }
    
    console.log('Starting disease analysis...');
    console.log('Mode:', useVision ? 'Vision Analysis' : 'Quick Guide');
    console.log('Image data length:', selectedImageBase64.length);
    
    // Show results section with loading
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('loadingDiv').style.display = 'block';
    document.getElementById('resultsContent').style.display = 'none';
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    
    // Show progress updates
    let progressMessages;
    let updateInterval;
    
    if (useVision) {
        progressMessages = [
            '⏳ Loading AI vision model (7.8 GB)...',
            '🔄 Processing your image...',
            '🔍 Analyzing plant health...',
            '🌿 Identifying symptoms...',
            '💊 Generating treatment recommendations...',
            '⏰ Almost done, please be patient...'
        ];
        updateInterval = 20000; // 20 seconds
    } else {
        progressMessages = [
            '⚡ Generating quick disease guide...',
            '📚 Compiling common diseases...',
            '💡 Preparing recommendations...'
        ];
        updateInterval = 10000; // 10 seconds
    }
    
    let currentMessage = 0;
    
    const progressInterval = setInterval(() => {
        if (currentMessage < progressMessages.length) {
            const loadingP = document.querySelector('#loadingDiv p');
            if (loadingP) {
                loadingP.textContent = progressMessages[currentMessage];
            }
            currentMessage++;
        } else if (useVision) {
            // Loop back to keep user informed for vision mode
            currentMessage = 3; // Start from "Analyzing plant health"
        }
    }, updateInterval);
    
    try {
        console.log('Sending request to /api/analyze-disease...');
        const startTime = Date.now();
        
        // Call Flask API with image
        const response = await fetch('/api/analyze-disease', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: selectedImageBase64,
                use_vision: useVision
            })
        });
        
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`Response received in ${elapsed} seconds`);
        console.log('Response status:', response.status);
        
        clearInterval(progressInterval);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (response.ok) {
            console.log('Analysis successful, displaying results');
            displayResults(data.analysis);
        } else {
            console.error('Analysis failed:', data.message);
            throw new Error(data.message || 'Analysis failed');
        }
    } catch (error) {
        clearInterval(progressInterval);
        console.error('Analysis error:', error);
        document.getElementById('loadingDiv').style.display = 'none';
        document.getElementById('resultsContent').style.display = 'block';
        
        let errorMessage = error.message;
        let solutions = [
            'Wait a few minutes and try again (model might be loading)',
            'Use a smaller image (< 1MB)',
            'Ensure the image is clear and well-lit',
            'Check that Ollama is running: <code>ollama list</code>'
        ];
        
        if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
            errorMessage = 'Analysis took too long. The vision model might be processing. Please be patient and try again.';
            solutions = [
                'The vision model (7.8 GB) takes time to load on first use',
                'Wait 2-3 minutes and try again',
                'Ensure your system has enough RAM (8GB+ recommended)',
                'Try with a smaller image (< 500KB)'
            ];
        } else if (errorMessage.includes('Vision model not installed')) {
            errorMessage = 'Vision model is not installed on your system.';
            solutions = [
                'Run this command: <code>ollama pull llama3.2-vision:latest</code>',
                'Wait for the 7.8 GB download to complete',
                'Then refresh this page and try again'
            ];
        } else if (errorMessage.includes('Cannot connect to Ollama')) {
            errorMessage = 'Cannot connect to Ollama service.';
            solutions = [
                'Start Ollama: <code>ollama serve</code>',
                'Or restart the Ollama application',
                'Check if Ollama is running: <code>ollama list</code>'
            ];
        }
        
        document.getElementById('diagnosisDiv').innerHTML = `
            <div style="color: #e74c3c; padding: 2rem; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Analysis Failed</h3>
                <p style="font-size: 1.1rem; margin: 1rem 0;">${errorMessage}</p>
                <p style="margin-top: 1.5rem; font-weight: bold;">💡 Possible solutions:</p>
                <ul style="text-align: left; margin: 1rem auto; max-width: 500px; line-height: 1.8;">
                    ${solutions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function displayResults(analysis) {
    document.getElementById('loadingDiv').style.display = 'none';
    document.getElementById('resultsContent').style.display = 'block';
    
    // Format the analysis text with proper HTML
    const formattedAnalysis = formatAnalysis(analysis);
    document.getElementById('diagnosisDiv').innerHTML = formattedAnalysis;
}

function formatAnalysis(text) {
    // Convert markdown-style formatting to HTML
    let html = text;
    
    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    
    // Wrap lists in ul tags
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    return html;
}

function resetAnalysis() {
    selectedImage = null;
    selectedImageBase64 = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadReport() {
    const diagnosis = document.getElementById('diagnosisDiv').innerText;
    const reportContent = `
AgriTech - Plant Disease Analysis Report
========================================

Date: ${new Date().toLocaleString()}

ANALYSIS RESULTS:
${diagnosis}

---
Generated by AgriTech AI Disease Detection System
Powered by Llama 3.2 Vision
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `disease-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
