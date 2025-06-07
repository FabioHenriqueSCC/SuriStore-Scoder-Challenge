import { useEffect } from "react";

export function useDynamicTabTitle(activeTitle: string, inactiveTitle: string) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = inactiveTitle;
      } else {
        document.title = activeTitle;
      }
    };

    document.title = activeTitle;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTitle, inactiveTitle]);
}
