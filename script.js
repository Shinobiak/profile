// Custom rounded box geometry function
function createRoundedBox(width, height, depth, radius, smoothness) {
    let shape = new THREE.Shape();
    shape.moveTo(-width/2, -height/2 + radius);
    shape.lineTo(-width/2, height/2 - radius);
    shape.quadraticCurveTo(-width/2, height/2, -width/2 + radius, height/2);
    shape.lineTo(width/2 - radius, height/2);
    shape.quadraticCurveTo(width/2, height/2, width/2, height/2 - radius);
    shape.lineTo(width/2, -height/2 + radius);
    shape.quadraticCurveTo(width/2, -height/2, width/2 - radius, -height/2);
    shape.lineTo(-width/2 + radius, -height/2);
    shape.quadraticCurveTo(-width/2, -height/2, -width/2, -height/2 + radius);

    let extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius
    };

    let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    geometry.center();

    return geometry;
}

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Adding a rounded cube to the scene
const geometry = createRoundedBox(1, 1, 1, 0.1, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x2196f3, metalness: 0.5, roughness: 0.1 });
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
const cube = new THREE.Mesh(geometry, material);
const line = new THREE.LineSegments(edges, lineMaterial);

scene.add(cube);
scene.add(line);

// Adding a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
