// ページの読み込みを待つ
// 

function init(canvas_id) {
    let rot = 0; // 角度

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById(canvas_id),
        alpha: true
    });

    // シーンを作成
    const scene = new THREE.Scene();

    // フォグを作成
    scene.fog = new THREE.Fog(0xaaaaaa, 50, 2000);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(70, 1000);

    // 形状データを作成
    const geometry = new THREE.Geometry();

    for (let i = 0; i < 10000; i++) {
        const star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);

        geometry.vertices.push(star)
    }

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
        color: 0xffffff
    });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // 毎フレーム時に実行されるループイベント
    function render() {
        rot += 0.1;
        // ラジアンに変換する
        const radian = (rot * Math.PI) / 180;
        // 角度に応じてカメラの位置を設定
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);
        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    render();

    // リサイズイベント発生時に実行
    window.addEventListener("resize", onResize);

    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;
        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    // 初期化のために実行
    onResize();
}