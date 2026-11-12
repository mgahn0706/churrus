import { useEffect } from "react";

export default function usePreventUnload(shouldPrevent: boolean) {
  useEffect(() => {
    if (!shouldPrevent) return;

    const backGuardKey = "__crimeSceneBackGuard";
    const currentUrl = window.location.href;

    // Keep the game on the current history entry until the player confirms.
    const addBackGuard = () => {
      window.history.pushState(
        { ...window.history.state, [backGuardKey]: true },
        "",
        currentUrl
      );
    };

    if (!window.history.state?.[backGuardKey]) {
      addBackGuard();
    }

    const preventClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const confirmBack = () => {
      if (window.location.href !== currentUrl) return;

      if (window.confirm("게임을 나가시겠습니까? 현재 조사 진행 상황이 사라질 수 있습니다.")) {
        window.removeEventListener("beforeunload", preventClose);
        window.removeEventListener("popstate", confirmBack);
        window.history.back();
      } else {
        addBackGuard();
      }
    };

    window.addEventListener("beforeunload", preventClose);
    window.addEventListener("popstate", confirmBack);

    return () => {
      window.removeEventListener("beforeunload", preventClose);
      window.removeEventListener("popstate", confirmBack);
    };
  }, [shouldPrevent]);
}
