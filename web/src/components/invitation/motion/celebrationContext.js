import { createContext, useContext } from "react";

// Shared so any component under a template can fire confetti: useCelebrate()("open")
export const CelebrationContext = createContext(() => {});

export const useCelebrate = () => useContext(CelebrationContext);
