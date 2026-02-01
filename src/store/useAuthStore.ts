import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	email: string | null;
	token: string | null;
	isVerified: boolean;
	hydrated: boolean;
	skipSyncUntil: number | null;
	skipBackendSync: boolean;

	setEmail: (email: string) => void;
	setToken: (token: string) => void;
	logout: () => void;
	setHydrated: (val: boolean) => void;
	setSkipSyncUntil: (ts: number | null) => void;
	setSkipBackendSync: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			email: null,
			token: null,
			isVerified: false,
			hydrated: false,
			skipSyncUntil: null,
			skipBackendSync: false,

			setHydrated: (val) => set({ hydrated: val }),

			setSkipSyncUntil: (ts) => set({ skipSyncUntil: ts }),

			setEmail: (email) => set({ email }),

			setToken: (token) =>
				set({
					token,
					isVerified: true,
					skipBackendSync: false,
				}),

			logout: () =>
				set({
					email: null,
					token: null,
					isVerified: false,
					skipSyncUntil: Date.now() + 2000,
					skipBackendSync: true,
				}),
			setSkipBackendSync: (val) => set({ skipBackendSync: val }),
		}),
		{
			name: "auth-store",
			storage: createJSONStorage(() => localStorage),
			partialize: (s) => ({
				email: s.email,
				token: s.token,
				isVerified: s.isVerified,
				hydrated: s.hydrated,
				skipSyncUntil: s.skipSyncUntil,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHydrated(true);
			},
		},
	),
);
