import MoltenMetal from "./MoltenMetal.jsx";

// Fixed, non-interactive layer behind everything. MoltenMetal listens to
// window pointer events itself, so the cursor still heats the filaments.
export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <MoltenMetal
        colors={["#1e1e1f", "#474547"]}
        coreColor="#FFFFFF"
        speed={0.35}
        scale={4}
        detail={3}
        glow={1.6}
        thickness={1}
        haze={0.75}
        mouseInteraction
        flareOnClick
      />
    </div>
  );
}
