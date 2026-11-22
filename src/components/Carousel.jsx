import FlexCarousel from "./FlexCarousel.jsx";

// Props: items [{id,name,photo}], onSelect(item)
// Wraps React Bits FlexCarousel (WebGL, so no Framer layoutId morph —
// the invitation opens with a fade/scale instead).
export default function Carousel({ items, onSelect }) {
  const slides = items.map((p) => ({
    src: `${import.meta.env.BASE_URL}${p.photo}`,
    alt: p.name,
    title: p.name,
  }));

  return (
    <div className="carousel-stage">
      <FlexCarousel
        items={slides}
        preset="liquid"
        intro="rise"
        fit="portrait"
        cardHeight={0.55}
        gap={14}
        radius={10}
        squeeze={0.2}
        focusOnClick={false}
        captions
        onSelect={(i) => onSelect(items[i])}
      />
    </div>
  );
}
