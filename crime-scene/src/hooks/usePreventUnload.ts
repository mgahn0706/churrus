import { useEffect } from "react";

export default function usePreventUnload(shouldPrevent: boolean) {
  useEffect(() => {
    if (!shouldPrevent) return;

    const preventClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", preventClose);

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [shouldPrevent]);
}
