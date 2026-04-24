import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Floating organic torus-knot — evokes the sculptural ceramic objects
 * in the ORA reception. Sage-on-shoji, slow drift, mouse parallax.
 */
export function ThreeScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true } as THREE.WebGLRendererParameters);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Sage-tinted soft material — matte ceramic feel
    const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.34, 220, 32, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#9bb39a"),
      roughness: 0.55,
      metalness: 0.05,
      clearcoat: 0.4,
      clearcoatRoughness: 0.6,
      sheen: 0.6,
      sheenColor: new THREE.Color("#d8e2cf"),
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Soft floating orb
    const orbGeo = new THREE.SphereGeometry(0.45, 64, 64);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2b2b26"),
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.8,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(2.1, -0.6, 0.4);
    scene.add(orb);

    // Lighting — warm key + cool sage rim
    const key = new THREE.DirectionalLight(0xfff4e0, 1.6);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb8cdb1, 0.9);
    rim.position.set(-4, -2, -3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    // Mouse parallax
    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      knot.rotation.x += (target.y - knot.rotation.x) * 0.04 + 0.0015;
      knot.rotation.y += (target.x - knot.rotation.y) * 0.04 + 0.0025;
      knot.position.y = Math.sin(t * 0.5) * 0.15;
      orb.position.y = -0.6 + Math.cos(t * 0.6) * 0.12;
      orb.rotation.y = t * 0.2;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
