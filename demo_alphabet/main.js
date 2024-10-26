import * as THREE from "../build/three.module.js";
import { FontLoader } from '../jsm/loaders/FontLoader.js';
import { TextGeometry } from '../jsm/geometries/TextGeometry.js';

let scene, camera, renderer;

function init() {
  // シーン
  scene = new THREE.Scene();

  // カメラ
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 0, 5);

  // レンダラー
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncording = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  // 環境光
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(100, 10, 10);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // アルファベット作成
  const fontLoader = new FontLoader();
  fontLoader.load('../fonts/helvetiker_regular.typeface.json', (font) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

    for(let i = 0; i < 70; i++){
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const randamAlphabet =alphabet[Math.floor(Math.random() * 26)];
      createTextMesh(randamAlphabet, font, material);
    }
  });

  // アニメーション開始
  animate();

   // ウィンドウサイズが変更された場合の対応
   window.addEventListener('resize', onWindowResize, false);
}


// アルファベット作成
function createTextMesh(text, font, material) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 0.2 + Math.random() * 2,
    depth: 0.2,
  });

  const textMesh = new THREE.Mesh(textGeometry, material);

  textMesh.position.set(
    -20 + Math.random() * 40,
    -5 + Math.random() * 10,
    0
  );

  textMesh.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );

  scene.add(textMesh);
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  // 各アルファベットの回転を更新
  scene.children.forEach((child) => {
    if (child.type === 'Mesh') {
      child.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

// ウィンドウサイズが変更された時の対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// 初期化関数の呼び出し
init();