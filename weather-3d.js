// Three.js Weather Effects System
class WeatherScene {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clouds = [];
        this.raindrops = [];
        this.sun = null;
        this.moon = null;
        this.stars = [];
        this.currentWeather = 'clear';
        this.isDay = true;
        
        this.init();
        this.animate();
        this.setupResponsive();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create initial elements
        this.createSun();
        this.createMoon();
        this.createStars();
        this.createClouds();
        
        // Set initial weather
        this.setWeather('clear', true);
    }

    createSun() {
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffeb3b,
            transparent: true,
            opacity: 0
        });
        this.sun = new THREE.Mesh(geometry, material);
        this.sun.position.set(3, 3, -5);
        
        // Sun glow
        const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffa726,
            transparent: true,
            opacity: 0
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sun.add(glow);
        
        this.scene.add(this.sun);
    }

    createMoon() {
        const geometry = new THREE.SphereGeometry(0.6, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xe3f2fd,
            transparent: true,
            opacity: 0
        });
        this.moon = new THREE.Mesh(geometry, material);
        this.moon.position.set(3, 3, -5);
        this.scene.add(this.moon);
    }

    createStars() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        const starVertices = [];
        for (let i = 0; i < 200; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20 - 10;
            starVertices.push(x, y, z);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.stars.push(stars);
        this.scene.add(stars);
    }

    createClouds() {
        const cloudCount = window.innerWidth < 768 ? 5 : 8;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = this.createCloud();
            cloud.position.x = (Math.random() - 0.5) * 15;
            cloud.position.y = Math.random() * 4 - 1;
            cloud.position.z = -8 + Math.random() * 3;
            cloud.userData.speed = 0.001 + Math.random() * 0.002;
            this.clouds.push(cloud);
            this.scene.add(cloud);
        }
    }

    createCloud() {
        const cloud = new THREE.Group();
        const sphereCount = window.innerWidth < 768 ? 3 : 5;
        
        for (let i = 0; i < sphereCount; i++) {
            const geometry = new THREE.SphereGeometry(
                0.3 + Math.random() * 0.3,
                16,
                16
            );
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.x = (Math.random() - 0.5) * 1.5;
            sphere.position.y = (Math.random() - 0.5) * 0.5;
            sphere.position.z = (Math.random() - 0.5) * 0.5;
            cloud.add(sphere);
        }
        
        return cloud;
    }

    createRain() {
        const rainCount = window.innerWidth < 768 ? 500 : 1000;
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < rainCount; i++) {
            vertices.push(
                (Math.random() - 0.5) * 20,
                Math.random() * 20,
                (Math.random() - 0.5) * 20
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x4fc3f7,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        
        const rain = new THREE.Points(geometry, material);
        this.raindrops.push(rain);
        this.scene.add(rain);
    }

    clearRain() {
        this.raindrops.forEach(rain => {
            this.scene.remove(rain);
            rain.geometry.dispose();
            rain.material.dispose();
        });
        this.raindrops = [];
    }

    setWeather(condition, isDay = true) {
        this.currentWeather = condition.toLowerCase();
        this.isDay = isDay;
        
        // Clear existing rain
        this.clearRain();
        
        // Update elements based on weather
        switch (this.currentWeather) {
            case 'sunny':
            case 'clear':
                this.showSun(isDay);
                this.showClouds(0.3);
                break;
                
            case 'partly cloudy':
            case 'cloudy':
            case 'overcast':
                this.showSun(isDay, 0.3);
                this.showClouds(0.7);
                break;
                
            case 'rain':
            case 'light rain':
            case 'moderate rain':
            case 'heavy rain':
            case 'patchy rain possible':
                this.showSun(false);
                this.showClouds(0.8);
                this.createRain();
                break;
                
            case 'thunderstorm':
            case 'thunder':
                this.showSun(false);
                this.showClouds(0.9);
                this.createRain();
                break;
                
            case 'fog':
            case 'mist':
                this.showSun(isDay, 0.2);
                this.showClouds(0.9);
                break;
                
            default:
                this.showSun(isDay);
                this.showClouds(0.5);
        }
        
        // Show stars at night
        this.showStars(!isDay);
    }

    showSun(show, opacity = 1) {
        if (this.isDay && show) {
            this.animateOpacity(this.sun.material, opacity);
            this.animateOpacity(this.sun.children[0].material, opacity * 0.3);
            this.animateOpacity(this.moon.material, 0);
        } else if (!this.isDay) {
            this.animateOpacity(this.sun.material, 0);
            this.animateOpacity(this.sun.children[0].material, 0);
            this.animateOpacity(this.moon.material, 0.8);
        } else {
            this.animateOpacity(this.sun.material, 0);
            this.animateOpacity(this.sun.children[0].material, 0);
            this.animateOpacity(this.moon.material, 0);
        }
    }

    showClouds(opacity) {
        this.clouds.forEach(cloud => {
            cloud.children.forEach(sphere => {
                this.animateOpacity(sphere.material, opacity);
            });
        });
    }

    showStars(show) {
        this.stars.forEach(starField => {
            this.animateOpacity(starField.material, show ? 0.8 : 0);
        });
    }

    animateOpacity(material, targetOpacity) {
        const startOpacity = material.opacity;
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            material.opacity = startOpacity + (targetOpacity - startOpacity) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate clouds
        this.clouds.forEach(cloud => {
            cloud.position.x += cloud.userData.speed;
            if (cloud.position.x > 10) {
                cloud.position.x = -10;
            }
            
            // Gentle floating motion
            cloud.position.y += Math.sin(Date.now() * 0.001 + cloud.position.x) * 0.0005;
        });
        
        // Animate rain
        this.raindrops.forEach(rain => {
            const positions = rain.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.1;
                if (positions[i] < -10) {
                    positions[i] = 10;
                }
            }
            rain.geometry.attributes.position.needsUpdate = true;
        });
        
        // Animate sun/moon
        if (this.sun) {
            this.sun.rotation.y += 0.001;
        }
        if (this.moon) {
            this.moon.rotation.y += 0.001;
        }
        
        // Animate stars
        this.stars.forEach(starField => {
            starField.rotation.y += 0.0002;
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    updateWeatherCondition(condition, isDay = true) {
        this.setWeather(condition, isDay);
    }
}

// Initialize the weather scene
let weatherScene;
window.addEventListener('DOMContentLoaded', () => {
    weatherScene = new WeatherScene();
});

// Export for use in weather.js
window.weatherScene = weatherScene;
