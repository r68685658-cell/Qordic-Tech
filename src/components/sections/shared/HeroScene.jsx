import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
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

function BrandMark({ reducedMotion }) {
  const markRef = useRef(null);
  const markTexture = useLoader(TextureLoader, "/assets/brand/qordic-mark.png");

  useEffect(() => {
    markTexture.colorSpace = SRGBColorSpace;
    markTexture.anisotropy = 4;
    markTexture.needsUpdate = true;
  }, [markTexture]);

  useFrame(({ clock }) => {
    if (!markRef.current || reducedMotion) return;
    markRef.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.025;
    markRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.045;
  });

  return (
    <group ref={markRef} position={[0, 0, EARTH_RADIUS + 0.12]}>
      <mesh renderOrder={5}>
        <planeGeometry args={[0.78, 0.78]} />
        <meshBasicMaterial
          map={markTexture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.015]} renderOrder={4}>
        <torusGeometry args={[0.48, 0.012, 8, 96]} />
        <meshBasicMaterial
          color="#a98aff"
          transparent
          opacity={0.72}
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
        <BrandMark reducedMotion={reducedMotion} />
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

const ORBITING_SERVICES = [
  { label: "Website Development", kind: "website", phase: 0.2, speed: 0.17 },
  { label: "Graphic Designing", kind: "design", phase: 1.25, speed: 0.15 },
  { label: "SEO", kind: "seo", phase: 2.3, speed: 0.18 },
  { label: "Real Estate", kind: "property", phase: 3.35, speed: 0.16 },
  { label: "Video Editing", kind: "video", phase: 4.4, speed: 0.145 },
  { label: "Software Development", kind: "software", phase: 5.45, speed: 0.175 },
];

function createServiceLabel(label) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the 3D service label canvas.");
  context.fillStyle = "rgba(12, 10, 25, 0.78)";
  context.strokeStyle = "rgba(164, 137, 255, 0.65)";
  context.lineWidth = 3;
  context.beginPath();
  context.roundRect(5, 5, 502, 86, 30);
  context.fill();
  context.stroke();
  context.font = "600 34px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#f4efff";
  context.fillText(label, 256, 49, 470);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function ServiceLabel({ label }) {
  const texture = useMemo(() => createServiceLabel(label), [label]);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={[0, -0.43, 0.1]} scale={[0.88, 0.17, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

function ServiceObject({ kind }) {
  if (kind === "website") {
    return (
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.4, 0.09]} />
          <meshPhysicalMaterial color="#7970aa" metalness={0.78} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.005, 0.052]}>
          <boxGeometry args={[0.5, 0.3, 0.015]} />
          <meshBasicMaterial color="#101125" />
        </mesh>
        <mesh position={[-0.11, 0.045, 0.064]}>
          <boxGeometry args={[0.18, 0.018, 0.01]} />
          <meshBasicMaterial color="#a98aff" />
        </mesh>
        <mesh position={[0.11, -0.055, 0.064]}>
          <boxGeometry args={[0.18, 0.014, 0.01]} />
          <meshBasicMaterial color="#60c9ef" />
        </mesh>
      </group>
    );
  }

  if (kind === "design") {
    return (
      <group>
        <mesh scale={[1, 0.72, 0.3]} castShadow>
          <sphereGeometry args={[0.26, 28, 20]} />
          <meshPhysicalMaterial color="#9d77ff" metalness={0.55} roughness={0.3} />
        </mesh>
        {["#ff83cc", "#60c9ef", "#f7d27a", "#9dffdc"].map((color, index) => (
          <mesh key={color} position={[-0.12 + index * 0.08, 0.12, 0.15]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
        <mesh position={[0.18, -0.18, 0.1]} rotation={[0, 0, -0.65]}>
          <cylinderGeometry args={[0.025, 0.05, 0.22, 8]} />
          <meshPhysicalMaterial color="#e5d8ff" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  if (kind === "seo") {
    return (
      <group>
        <mesh rotation={[0, 0, -0.55]}>
          <torusGeometry args={[0.14, 0.045, 12, 28]} />
          <meshPhysicalMaterial color="#80dfff" metalness={0.68} roughness={0.22} emissive="#1677a5" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.17, -0.17, 0]} rotation={[0, 0, -0.65]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <meshPhysicalMaterial color="#c6b7ff" metalness={0.8} roughness={0.2} />
        </mesh>
        {[0.12, 0.2, 0.29].map((height, index) => (
          <mesh key={height} position={[-0.24 + index * 0.1, -0.23 + height / 2, 0]}>
            <boxGeometry args={[0.055, height, 0.045]} />
            <meshBasicMaterial color={index === 2 ? "#65d9ff" : "#997bff"} />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "property") {
    return (
      <group>
        {[[-0.17, 0.01, 0.09, 0.34], [0.04, 0.08, 0.12, 0.48], [0.22, -0.04, 0.1, 0.27]].map(([x, y, width, height]) => (
          <group key={x} position={[x, y, 0]}>
            <mesh castShadow>
              <boxGeometry args={[width, height, 0.13]} />
              <meshPhysicalMaterial color="#67569b" metalness={0.72} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0, 0.071]}>
              <boxGeometry args={[0.045, 0.07, 0.01]} />
              <meshBasicMaterial color="#81dcff" />
            </mesh>
          </group>
        ))}
        <mesh position={[0.04, 0.34, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.19, 0.19, 0.13]} />
          <meshPhysicalMaterial color="#a98aff" metalness={0.65} roughness={0.28} />
        </mesh>
      </group>
    );
  }

  if (kind === "video") {
    return (
      <group>
        <mesh castShadow>
          <boxGeometry args={[0.53, 0.36, 0.09]} />
          <meshPhysicalMaterial color="#7762b4" metalness={0.78} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <boxGeometry args={[0.46, 0.28, 0.012]} />
          <meshBasicMaterial color="#171326" />
        </mesh>
        <mesh position={[0, 0, 0.08]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.09, 0.16, 3]} />
          <meshBasicMaterial color="#d5c7ff" />
        </mesh>
        {[-0.14, -0.04, 0.06, 0.16].map((x, index) => (
          <mesh key={x} position={[x, -0.25, 0.03]}>
            <boxGeometry args={[0.06, index % 2 ? 0.045 : 0.07, 0.025]} />
            <meshBasicMaterial color={index % 2 ? "#70d5f7" : "#a789ff"} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.46, 0.33, 0.08]} />
        <meshPhysicalMaterial color="#7460a9" metalness={0.82} roughness={0.23} />
      </mesh>
      {[-0.09, 0, 0.09].map((y, index) => (
        <group key={y} position={[-0.12, y, 0.055]}>
          <mesh>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={index === 1 ? "#6de3fa" : "#b69bff"} />
          </mesh>
          <mesh position={[0.19, 0, 0]}>
            <boxGeometry args={[0.2, 0.014, 0.01]} />
            <meshBasicMaterial color="#b4a1ed" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function OrbitingServices({ reducedMotion }) {
  const serviceRefs = useRef([]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const time = clock.elapsedTime;
    serviceRefs.current.forEach((service, index) => {
      if (!service) return;
      const { phase, speed } = ORBITING_SERVICES[index];
      const angle = time * speed + phase;
      service.position.set(
        Math.cos(angle) * 1.72,
        Math.sin(angle * 1.35 + index) * 0.68,
        Math.sin(angle) * 1.12,
      );
      service.rotation.set(
        Math.sin(time * 0.35 + index) * 0.08,
        time * 0.24 + index * 0.45,
        Math.sin(time * 0.3 + index) * 0.07,
      );
    });
  });

  return (
    <group>
      {ORBITING_SERVICES.map((service, index) => (
        <group key={service.kind} ref={(node) => { serviceRefs.current[index] = node; }} scale={0.82}>
          <ServiceObject kind={service.kind} />
          <ServiceLabel label={service.label} />
        </group>
      ))}
    </group>
  );
}

function QordicCore({ reducedMotion }) {
  const coreRef = useRef(null);

  useFrame(({ clock, pointer }, delta) => {
    if (!coreRef.current || reducedMotion) return;
    const time = clock.elapsedTime;
    coreRef.current.position.y = Math.sin(time * 0.62) * 0.055;
    coreRef.current.rotation.y = MathUtils.damp(coreRef.current.rotation.y, pointer.x * 0.2 + Math.sin(time * 0.24) * 0.035, 2.2, delta);
    coreRef.current.rotation.x = MathUtils.damp(coreRef.current.rotation.x, -pointer.y * 0.13, 2.2, delta);
    coreRef.current.rotation.z = Math.sin(time * 0.32) * 0.025;
  });

  return (
    <group ref={coreRef}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.7, 0.19, 24, 96]} />
        <meshPhysicalMaterial
          color="#8060cf"
          metalness={0.92}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.13}
          emissive="#31166f"
          emissiveIntensity={0.24}
        />
      </mesh>
      <mesh position={[0.74, -0.74, 0]} rotation={[0, 0, (-Math.PI * 3) / 4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.185, 0.185, 0.9, 24]} />
        <meshPhysicalMaterial
          color="#9a7be4"
          metalness={0.9}
          roughness={0.19}
          clearcoat={1}
          emissive="#30146d"
          emissiveIntensity={0.26}
        />
      </mesh>
      <mesh position={[1.06, -1.06, 0]}>
        <sphereGeometry args={[0.185, 20, 20]} />
        <meshPhysicalMaterial color="#ad92ee" metalness={0.92} roughness={0.18} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.47, 0.012, 8, 80]} />
        <meshBasicMaterial
          color="#d6c6ff"
          transparent
          opacity={0.52}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function QordicEcosystem({ reducedMotion }) {
  const pointerRef = useRef(null);
  const ringRef = useRef(null);
  const sceneRef = useRef(null);

  useFrame(({ clock, pointer }, delta) => {
    const time = clock.elapsedTime;
    if (pointerRef.current && !reducedMotion) {
      pointerRef.current.rotation.y = MathUtils.damp(pointerRef.current.rotation.y, pointer.x * 0.08, 1.8, delta);
      pointerRef.current.rotation.x = MathUtils.damp(pointerRef.current.rotation.x, -pointer.y * 0.05, 1.8, delta);
    }
    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z = time * 0.045;
      ringRef.current.rotation.x = 1.04 + Math.sin(time * 0.18) * 0.035;
    }
    if (sceneRef.current && !reducedMotion) sceneRef.current.rotation.y = Math.sin(time * 0.08) * 0.025;
  });

  return (
    <group ref={sceneRef}>
      <group ref={pointerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.76, 0.93, 1]}>
          <torusGeometry args={[1, 0.0045, 6, 160]} />
          <meshBasicMaterial color="#7860d9" transparent opacity={0.24} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <OrbitingServices reducedMotion={reducedMotion} />
        <QordicCore reducedMotion={reducedMotion} />
        <group ref={ringRef} rotation={[1.04, 0.18, 0]}>
          <mesh>
            <torusGeometry args={[1.27, 0.012, 8, 144]} />
            <meshBasicMaterial color="#b49aff" transparent opacity={0.74} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh rotation={[0.42, 0.2, 0.86]}>
            <torusGeometry args={[1.38, 0.007, 8, 144]} />
            <meshBasicMaterial color="#55c8fa" transparent opacity={0.52} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh rotation={[-0.55, 0.35, 0.2]}>
            <torusGeometry args={[1.49, 0.004, 6, 144]} />
            <meshBasicMaterial color="#9175ff" transparent opacity={0.34} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      </group>
      <ParticleField reducedMotion={reducedMotion} />
      <pointLight color="#9e70ff" intensity={28} distance={7} position={[2.1, 1.8, 2.4]} />
      <pointLight color="#35baff" intensity={16} distance={6} position={[-2.2, -1.2, 1.8]} />
      <pointLight color="#7845db" intensity={12} distance={5} position={[0, 2.8, -1.8]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        color="#eee6ff"
        intensity={3.5}
        position={[3.5, 4, 5]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </group>
  );
}

export default function HeroScene({ eventSource }) {
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
      {isCompact || reducedMotion ? (
        <div className="hero-static-visual">
          <span className="hero-static-orbit hero-static-orbit-one" />
          <span className="hero-static-orbit hero-static-orbit-two" />
          <img src="/assets/brand/qordic-mark.png" alt="" />
        </div>
      ) : isInView && (
        <Canvas
          camera={{ position: [0, 0, 6.1], fov: 42 }}
          dpr={[1, isCompact ? 1 : 1.4]}
          shadows
          eventSource={eventSource}
          onCreated={(state) => {
            state.setEvents({
              compute: (event, rootState) => {
                const bounds = eventSource.current?.getBoundingClientRect();
                if (!bounds) return;
                rootState.pointer.set(
                  ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
                  -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
                );
                rootState.raycaster.setFromCamera(rootState.pointer, rootState.camera);
              },
            });
          }}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: !isCompact, powerPreference: "low-power" }}
          fallback={<div className="hero-scene-fallback" aria-hidden="true" />}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <QordicEcosystem reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
