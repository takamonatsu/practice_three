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
  document.body.appendChild(renderer.domElement);

  // 環境光
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const fontLoader = new FontLoader();
  fontLoader.load('../fonts/helvetiker_regular.typeface.json', (font) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

    createTextMesh('A', 0, font, material);
    createTextMesh('B', 2, font, material);
    createTextMesh('C', 4, font, material);
    createTextMesh('D', 6, font, material);
    createTextMesh('E', 8, font, material);
    createTextMesh('F', 10, font, material);
    createTextMesh('G', 12, font, material);
    createTextMesh('H', 14, font, material);
    createTextMesh('I', 16, font, material);
  });

  // アニメーション開始
  animate();

   // ウィンドウサイズが変更された場合の対応
   window.addEventListener('resize', onWindowResize, false);
}


// アルファベット作成
function createTextMesh(text, positionX, font, material) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 1,
    depth: 0.2,
  });
  const textMesh = new THREE.Mesh(textGeometry, material);
  textMesh.position.set(positionX, 0, 0);
  scene.add(textMesh);
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
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