import { CONFIG } from "@/config";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class AuthService {
    user = {}
    isLoggedIn = false
    token = "";
    constructor() {
        makeAutoObservable(this);
        this.checkUser();
    }

    async checkUser() {
        if (localStorage.getItem("token") && localStorage.getItem("user")) {
            this.token = localStorage.getItem("token");
            this.user = JSON.parse(localStorage.getItem("user"));
            this.isLoggedIn = true;
        }
    }

    logout() {
        localStorage.clear();
        this.isLoggedIn = false;
        this.user = undefined;
        this.token = "";
    }

    async register(
        name,
        email,
        password
    ) {
        try {
            let res = await axios.post(CONFIG.apiUrl + "/auth/register", { name, email, password });
            return res.data.success ? true : false;
        } catch (e) {
            console.error("Registration error:", e.response?.data || e.message);
            throw e;
        }
    }

    async login(email, password) {
        try {
            console.log("Login request:", email, password); // Check what you're sending

            let res = await axios.post(CONFIG.apiUrl + "/auth/login", {
                email,
                password,
            });

            console.log("Login response:", res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.checkUser();

            return res.data;
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;