import { CONFIG } from "@/config";
import { ApiService } from "./ApiService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import authService from "./AuthService";

export const useConfessions = () => {
    return useInfiniteQuery({
        queryKey: ["confessions"],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession?page=${pageParam}&size=20`
            );
            return res.data; // should return { confessions: [], page, totalPages, etc. }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined; // no more pages
        },
    });
};


export const useLikedConfessions = () => {
    return useInfiniteQuery({
        queryKey: ["liked-confessions"],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession/user/liked/${authService.user.id}?page=${pageParam}&size=20`
            );
            return res.data; // should return { confessions: [], page, totalPages, etc. }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined; // no more pages
        },
    });
};

export const useMyConfession = () => {
    return useInfiniteQuery({
        queryKey: ["my-confessions"],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession/user/${authService.user.id}?page=${pageParam}&size=20`
            );
            return res.data; // should return { confessions: [], page, totalPages, etc. }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined; // no more pages
        },
    });
};

export const useUserConfessionStats = () => {
    return useQuery({
        queryKey: ["user-confession-stats"],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession/user/stats/${authService.user.id}`
            );
            return res.data; // should return { confessions: [], page, totalPages, etc. }
        }
    });
}


export const useTrendingConfessions = () => {
    return useInfiniteQuery({
        queryKey: ["trending-confessions"],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession/trending?page=${pageParam}&size=20`
            );
            return res.data; // should return { confessions: [], page, totalPages, etc. }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined; // no more pages
        },
    });
};

export const useSearchConfessions = (query) => {
    return useInfiniteQuery({
        queryKey: ["search-confessions", query], // ✅ include query in cache key
        queryFn: async ({ pageParam = 0 }) => {
            const res = await ApiService.get(
                `${CONFIG.apiUrl}/confession/search?query=${encodeURIComponent(query)}&page=${pageParam}&size=20`
            );
            console.log("Fetched:", res.data);
            return res.data; // should return { content: [], currentPage, totalPages, etc. }
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
    });
};
