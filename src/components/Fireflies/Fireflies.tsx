import React, { useEffect, useState } from "react";
import styles from "./fireflies.module.css";

export default function Fireflies(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const fireflies = 15;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(setReady.bind(null, true), 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return !ready ? null : (
    <div {...props}>
      {[...new Array(fireflies).fill(0)].map((_, i) => (
        <span key={`firefly-${i}`} className={styles.firefly} />
      ))}
    </div>
  );
}
