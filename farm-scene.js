// farm-scene.js
// Three.js scene for the chatbot background

let scene, camera, renderer, controls;
let particles;

function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    scene.fog = new THREE.Fog(0x87CEEB, 20, 150); // Add fog to blend the horizon

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        console.error("Canvas element 'bg-canvas' not found.");
        return;
    }
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadows

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Sun light
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    // Improve shadow quality
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 200;
    const d = 50;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    scene.add(directionalLight);

    // Add a warm sunset/sunrise light
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4);
    scene.add(hemisphereLight);

    // 5. Environment (The Farm)
    createFarmEnvironment();

    // 6. Controls (Optional, for slow panning if we decide to rotate camera manually)
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true; // Slowly rotate around the scene
        controls.autoRotateSpeed = 0.5;
        controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
    }

    // 7. Event Listeners
    window.addEventListener('resize', onWindowResize, false);

    // 8. Start Animation Loop
    animate();
}

function createFarmEnvironment() {
    // A. The Ground (Field)
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x556B2F, // Dark olive green
        roughness: 0.9,
        metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Lay flat
    ground.receiveShadow = true;
    scene.add(ground);

    // B. Rows of Crops
    const cropGeometry = new THREE.ConeGeometry(0.5, 2, 5); // Simple low-poly crop
    // Use multi-materials for variety
    const cropMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x3CB371 }), // Medium Sea Green
        new THREE.MeshStandardMaterial({ color: 0x2E8B57 }), // Sea Green
        new THREE.MeshStandardMaterial({ color: 0x9ACD32 })  // Yellow Green
    ];

    const group = new THREE.Group();

    // Plant rows
    for (let row = -20; row <= 20; row += 2) {
        for (let col = -30; col <= 30; col += 1.5) {
            // Add some randomness so it's not perfectly uniform
            if (Math.random() > 0.1) {
                const matIndex = Math.floor(Math.random() * cropMaterials.length);
                const crop = new THREE.Mesh(cropGeometry, cropMaterials[matIndex]);

                // Position
                crop.position.x = col + (Math.random() * 0.4 - 0.2);
                crop.position.z = row + (Math.random() * 0.2 - 0.1);
                crop.position.y = 1; // Half of height to sit on ground

                // Random scale and rotation for variety
                const scale = 0.7 + Math.random() * 0.6;
                crop.scale.set(scale, scale, scale);
                crop.rotation.y = Math.random() * Math.PI;

                crop.castShadow = true;
                group.add(crop);
            }
        }
    }

    // Create dirt mounds under rows
    const dirtGeometry = new THREE.CylinderGeometry(0.8, 1.2, 60, 4);
    const dirtMaterial = new THREE.MeshStandardMaterial({ color: 0x4A3728, roughness: 1 });
    for (let row = -20; row <= 20; row += 2) {
        const dirt = new THREE.Mesh(dirtGeometry, dirtMaterial);
        dirt.rotation.z = Math.PI / 2; // Lay horizontally across X
        dirt.position.set(0, 0.2, row); // Slightly above ground
        dirt.receiveShadow = true;
        group.add(dirt);
    }

    scene.add(group);

    // C. Add some simple trees in the background
    createTrees();

    // D. Particle System (Pollen / Dust)
    createParticles();
}

function createTrees() {
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 4);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // SaddleBrown

    const leavesGeometry = new THREE.SphereGeometry(3, 7, 7); // Low poly sphere
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // ForestGreen

    // Place trees around the perimeter
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 40 + Math.random() * 20; // Between 40 and 60 units away

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const tree = new THREE.Group();

        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 2; // Help sit on ground
        trunk.castShadow = true;

        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 5;
        leaves.castShadow = true;

        // Vary tree size
        const scale = 1 + Math.random() * 1.5;
        tree.scale.set(scale, scale, scale);

        tree.add(trunk);
        tree.add(leaves);

        tree.position.set(x, 0, z);
        scene.add(tree);
    }
}

function createParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        // Spread particles across the field
        positions[i * 3] = (Math.random() - 0.5) * 100; // x
        positions[i * 3 + 1] = Math.random() * 20;      // y (height)
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

        velocities.push({
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.05
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Simple white particles for pollen/dust
    const material = new THREE.PointsMaterial({
        color: 0xFFD700, // Gold/yellow tint
        size: 0.15,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(geometry, material);
    particles.velocities = velocities;
    scene.add(particles);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Update Controls
    if (controls) {
        controls.update();
    } else {
        // Fallback camera rotation if OrbitalControls aren't loaded
        const timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 40;
        camera.position.z = Math.sin(timer) * 40;
        camera.lookAt(0, 0, 0);
    }

    // Animate Particles
    if (particles) {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particles.velocities.length; i++) {
            // Apply velocity
            positions[i * 3] += particles.velocities[i].x;
            positions[i * 3 + 1] += particles.velocities[i].y;
            positions[i * 3 + 2] += particles.velocities[i].z;

            // Add some gentle wind affecting X and Z
            positions[i * 3] += 0.01;

            // Boundary checks: if particle goes too far, reset it
            if (positions[i * 3 + 1] < 0 || positions[i * 3 + 1] > 20 ||
                positions[i * 3] > 50 || positions[i * 3] < -50 ||
                positions[i * 3 + 2] > 50 || positions[i * 3 + 2] < -50) {

                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = Math.random() * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

// Ensure init is called after page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
