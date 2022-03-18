import { useEffect } from "react";

export default function usePressSpacebar(callback = () => {}) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressSpacbar);

    return () => {
      window.removeEventListener("keydown", handleKeyPressSpacbar);
    };
  }, [callback]);

  const handleKeyPressSpacbar = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.key === " " || event.key === "Spacebar") {
      callback();
      event.stopPropagation();
    }
  };
}
