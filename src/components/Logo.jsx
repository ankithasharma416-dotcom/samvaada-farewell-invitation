import { useState } from "react";

export default function Logo({ small = false }) {
  const [failed, setFailed] = useState(false);
  const cls = small ? "logo logo-small" : "logo";
  if (failed) return <div className={`${cls} logo-text`}>Samvada</div>;
  return (
    <img
      className={cls}
      src={`${import.meta.env.BASE_URL}samvada-logo.png`}
      alt="Samvada"
      onError={() => setFailed(true)}
    />
  );
}
