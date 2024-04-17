import create from "zustand";

export interface User {
  username: string | null; // `null` when logged out or no user data available.
}

interface UserState {
  user: User | null; // The user state can be `User` object or `null`.
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUserStore;
