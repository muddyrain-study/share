import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 10);

// 添加一个假的相机物体模型，用于辅助
const helperGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const helperMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const helperCamera = new THREE.Mesh(helperGeometry, helperMaterial);
helperCamera.position.copy(camera.position);
scene.add(helperCamera);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor('#b9a1b5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加 辅助线
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加 网格
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

camera.position.z = 5;

// 绘制一个柱状图
function draw({ data, colors }) {
  const group = new THREE.Group();
  const barMaxHeight = 5;
  const barWidth = 0.5;
  const barDepth = 0.5;
  const barMargin = 0.5;

  data.forEach((item, index) => {
    let barHeight = (item.value / 100) * barMaxHeight;
    const geometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);
    const currentColor = colors[index % colors.length];
    const material = new THREE.MeshBasicMaterial({ color: currentColor });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = index * (barWidth + barMargin);
    cube.position.y = barHeight / 2;
    group.add(cube);
  });
  const groupWidth = data.length * (barWidth + barMargin);
  group.position.setX(-(groupWidth / 2 - barMargin));
  scene.add(group);
}

draw({
  data: [
    {
      label: '周一',
      value: 85,
    },
    {
      label: '周二',
      value: 24,
    },
    {
      label: '周三',
      value: 54,
    },
    {
      label: '周四',
      value: 37,
    },
    {
      label: '周五',
      value: 85,
    },
    {
      label: '周六',
      value: 51,
    },
    {
      label: '周日',
      value: 19,
    },
  ],
  colors: [
    '#436ff6',
    '#f6c543',
    '#f68443',
    '#f64343',
    '#43f6c5',
    '#436ff6',
    '#f6c543',
  ],
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
