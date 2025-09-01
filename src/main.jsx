import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./lib/ProtectedRoute";
import { Toaster } from "sonner";
import AdminProtector from "./lib/AdminProtector";
import AdminHome from "./pages/admin/AdminHome";
import AdminCategories from "./pages/admin/AdminCategories";
import Trending from "./pages/Trending";
import CreateConfessionPage from "./pages/CreateConfession";
import LikedPage from "./pages/LikedConfession";
import ProfilePage from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./pages/SearchPage";

const root = document.getElementById("root");

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
        <Route path="/confess" element={<ProtectedRoute><CreateConfessionPage /></ProtectedRoute>} />
        <Route path="/likes" element={<ProtectedRoute><LikedPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />


        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="admin" element={<AdminProtector><AdminHome /></AdminProtector>} />
        <Route path="admin/categories" element={<AdminProtector><AdminCategories /></AdminProtector>} />

        {/* <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
