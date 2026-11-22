import { useState } from "react";

export default function Logo({ small = false }) {
  const [failed, setFailed] = useState(false);
  const cls = small ? "logo logo-small" : "logo";
  if (failed) return <div className={`${cls} logo-text`}>Samvaada</div>;
  return (
    <img
      className={cls}
      src={`${import.meta.env.BASE_URL}samvada-logo.png`}
      alt="Samvaada"
      onError={() => setFailed(true)}
    />
  );
}
