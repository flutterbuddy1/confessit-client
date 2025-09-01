import { makeAutoObservable } from "mobx";
import { ApiService } from "./ApiService";
import { CONFIG } from "@/config";
import authService from "./AuthService";

const ConfessionService = {
    createConfessions: async ({
        content
    }) => {
        const res = await ApiService.post(`${CONFIG.apiUrl}/confession`, {
            content,
            user_id: authService.user.id
        });
        console.log(res);
    },

    likeConfession: async (confessionId, userId) => {
        const res = await ApiService.post(`${CONFIG.apiUrl}/confession/${confessionId}/like/${userId}`);
        return res;
    },

    addComment: async (confessionId, userId, comment) => {
        const res = await ApiService.post(`${CONFIG.apiUrl}/confession/${confessionId}/comment/${userId}`, {
            content: comment
        });
        return res;
    },
    deleteComment: async (commentId) => {
        const res = await ApiService.delete(`${CONFIG.apiUrl}/confession/comment/${commentId}`);
        return res;
    }
}

export default ConfessionService