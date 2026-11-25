import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  Color,
  MathUtils,
  MeshBasicMaterial,
  QuadraticBezierCurve3,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  TubeGeometry,
  Vector3,
} from "three";

const EARTH_TEXTURE = "/assets/earth/earth-color-2048.jpg";
const EARTH_RADIUS = 1.12;
const NETWORK_LOCATIONS = [
  { latitude: 40.7, longitude: -74 },
  { latitude: 51.5, longitude: -0.1 },
  { latitude: 1.35, longitude: 103.8 },
  { latitude: 19.1, longitude: 72.9 },
  { latitude: 25.2, longitude: 55.3 },
  { latitude: 37.8, longitude: -122.4 },
  { latitude: -23.5, longitude: -46.6 },
];
const NETWORK_ROUTES = [
  [0, 1],
  [1, 2],
  [1, 4],
  [4, 2],
  [5, 0],
  [6, 0],
];

function locationOnGlobe({ latitude, longitude }, radius = EARTH_RADIUS * 1.012) {
  const phi = ((90 - latitude) * Math.PI) / 180;
  const theta = ((longitude + 180) * Math.PI) / 180;
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createRouteCurve(from, to) {
  const start = locationOnGlobe(NETWORK_LOCATIONS[from], EARTH_RADIUS * 1.025);
  const end = locationOnGlobe(NETWORK_LOCATIONS[to], EARTH_RADIUS * 1.025);
  const midpoint = start.clone().add(end).normalize().multiplyScalar(EARTH_RADIUS * 1.42);
  return new QuadraticBezierCurve3(start, midpoint, end);
}

function Atmosphere({ color }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { glowColor: { value: new Color(color) } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewPosition = normalize(-viewPosition.xyz);
            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0), 2.8);
            gl_FragColor = vec4(glowColor, rim * 0.78);
          }
        `,
        side: BackSide,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [color],
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh scale={1.12} material={material} renderOrder={2}>
      <sphereGeometry args={[EARTH_RADIUS, 56, 56]} />
    </mesh>
  );
}

function Network({ reducedMotion }) {
  const networkRef = useRef(null);
  const routeCurves = useMemo(
    () => NETWORK_ROUTES.map(([from, to]) => createRouteCurve(from, to)),
    [],
  );
  const routeGeometries = useMemo(
    () => routeCurves.map((curve) => new TubeGeometry(curve, 44, 0.0055, 5, false)),
    [routeCurves],
  );
  const routeMaterials = useMemo(
    () =>
      routeCurves.map(
        (_, index) =>
          new MeshBasicMaterial({
            color: index % 2 === 0 ? "#b49aff" : "#805cff",
            transparent: true,
            opacity: 0.82,
            blending: AdditiveBlending,
            depthWrite: false,
          }),
      ),
    [routeCurves],
  );
  const locations = useMemo(
    () => NETWORK_LOCATIONS.map((location) => locationOnGlobe(location)),
    [],
  );
  const dataPoints = useMemo(
    () =>
      routeCurves.map((curve, index) => ({
        curve,
        phase: index / routeCurves.length,
      })),
    [routeCurves],
  );

  useFrame(({ clock }) => {
    if (!networkRef.current || reducedMotion) return;
    networkRef.current.children.forEach((child, index) => {
      if (index < locations.length) {
        const pulse = 1 + Math.sin(clock.elapsedTime * 2.4 + index) * 0.16;
        child.scale.setScalar(pulse);
      }
    });
  });

  useEffect(
    () => () => {
      routeGeometries.forEach((geometry) => geometry.dispose());
      routeMaterials.forEach((material) => material.dispose());
    },
    [routeGeometries, routeMaterials],
  );

  return (
    <group ref={networkRef}>
      {routeGeometries.map((geometry, index) => (
        <mesh
          geometry={geometry}
          material={routeMaterials[index]}
          key={`route-${index}`}
          renderOrder={1}
        />
      ))}
      {locations.map((position, index) => (
        <mesh key={`node-${index}`} position={position} renderOrder={3}>
          <sphereGeometry args={[0.027, 12, 12]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#e1d6ff" : "#9b7aff"}
            transparent
            opacity={0.96}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      {dataPoints.map(({ curve, phase }, index) => (
        <DataPulse
          curve={curve}
          index={index}
          key={`pulse-${index}`}
          phase={phase}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function DataPulse({ curve, index, phase, reducedMotion }) {
  const pointRef = useRef(null);

  useFrame(({ clock }) => {
    if (!pointRef.current || reducedMotion) return;
    const progress = (clock.elapsedTime * 0.065 + phase) % 1;
    pointRef.current.position.copy(curve.getPointAt(progress));
  });

  return (
    <mesh
      ref={pointRef}
      position={curve.getPointAt(phase)}
      scale={index % 2 === 0 ? 1 : 0.8}
      renderOrder={4}
    >
      <sphereGeometry args={[0.018, 10, 10]} />
      <meshBasicMaterial
        color="#e2d7ff"
        transparent
        opacity={0.9}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function OrbitRings({ reducedMotion }) {
  const ringsRef = useRef(null);

  useFrame((_, delta) => {
    if (!ringsRef.current || reducedMotion) return;
    ringsRef.current.rotation.z += delta * 0.035;
    ringsRef.current.rotation.y -= delta * 0.012;
  });

  return (
    <group ref={ringsRef} rotation={[0.72, 0.22, -0.36]}>
      <mesh>
        <torusGeometry args={[1.42, 0.006, 8, 144]} />
        <meshBasicMaterial
          color="#b29aff"
          transparent
          opacity={0.58}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.55, 0.15, 0.85]}>
        <torusGeometry args={[1.53, 0.004, 8, 144]} />
        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.35}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ParticleField({ reducedMotion }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(150 * 3);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 5.2;
      values[index + 1] = (Math.random() - 0.5) * 4.2;
      values[index + 2] = (Math.random() - 0.5) * 2.2;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c7b6ff"
        size={0.014}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Globe({ reducedMotion, theme }) {
  const colorMap = useLoader(TextureLoader, EARTH_TEXTURE);
  const pointerGroup = useRef(null);
  const rotationGroup = useRef(null);
  const floatGroup = useRef(null);

  useEffect(() => {
    colorMap.colorSpace = SRGBColorSpace;
    colorMap.anisotropy = 8;
    colorMap.needsUpdate = true;
  }, [colorMap]);

  useFrame(({ clock, pointer }, delta) => {
    if (!floatGroup.current || !rotationGroup.current || !pointerGroup.current) return;
    const time = clock.elapsedTime;
    if (!reducedMotion) {
      rotationGroup.current.rotation.y += delta * 0.085;
      floatGroup.current.position.y = Math.sin(time * 0.56) * 0.035;
      pointerGroup.current.rotation.y = MathUtils.damp(
        pointerGroup.current.rotation.y,
        pointer.x * 0.12,
        2.2,
        delta,
      );
      pointerGroup.current.rotation.x = MathUtils.damp(
        pointerGroup.current.rotation.x,
        -pointer.y * 0.075,
        2.2,
        delta,
      );
    }
  });

  const earthColor = theme === "dark" ? "#e5e7ff" : "#ffffff";

  return (
    <group ref={floatGroup}>
      <group ref={pointerGroup}>
        <group ref={rotationGroup} rotation={[0, -1.45, 0]}>
          <mesh>
            <sphereGeometry args={[EARTH_RADIUS, 72, 72]} />
            <meshStandardMaterial
              map={colorMap}
              bumpMap={colorMap}
              bumpScale={0.022}
              emissiveMap={colorMap}
              color={earthColor}
              roughness={0.76}
              metalness={0.04}
              emissive={theme === "dark" ? "#f0f2ff" : "#d8d1ff"}
              emissiveIntensity={theme === "dark" ? 0.82 : 0.58}
              toneMapped={false}
            />
          </mesh>
          <Atmosphere color={theme === "dark" ? "#9a78ff" : "#7250dc"} />
          <Network reducedMotion={reducedMotion} />
        </group>
        <OrbitRings reducedMotion={reducedMotion} />
      </group>
      <ParticleField reducedMotion={reducedMotion} />
      <pointLight
        color={theme === "dark" ? "#ab89ff" : "#7c5cff"}
        intensity={theme === "dark" ? 18 : 12}
        distance={6}
        position={[2.8, 1.6, 2.2]}
      />
      <pointLight
        color="#5638bf"
        intensity={8}
        distance={5}
        position={[-2.2, -1.4, -1.1]}
      />
      <ambientLight intensity={theme === "dark" ? 1.1 : 1.4} />
      <directionalLight
        color="#f0ebff"
        intensity={theme === "dark" ? 2.7 : 2}
        position={[3.5, 2, 4]}
      />
    </group>
  );
}

export default function HeroScene({ eventSource, theme }) {
  const reducedMotion = useReducedMotion();
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { margin: "100px 0px" });
  const [isCompact, setIsCompact] = useState(
    () => window.matchMedia("(max-width: 819px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 819px)");
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateCompactMode);

    return () => mediaQuery.removeEventListener("change", updateCompactMode);
  }, []);

  return (
    <div ref={sceneRef} className="hero-canvas" aria-hidden="true">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 5.35], fov: 42 }}
          dpr={[1, isCompact ? 1 : 1.4]}
          eventSource={eventSource}
          compute={(event, state) => {
            const bounds = eventSource.current?.getBoundingClientRect();
            if (!bounds) return;
            state.pointer.set(
              ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
              -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
            );
            state.raycaster.setFromCamera(state.pointer, state.camera);
          }}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: !isCompact, powerPreference: "low-power" }}
          fallback={<div className="hero-scene-fallback" aria-hidden="true" />}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <Globe
              reducedMotion={reducedMotion}
              theme={theme}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
