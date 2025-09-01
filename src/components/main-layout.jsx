import { Home, PlusSquare, Heart, User, LogOut, Settings, Search, Bell, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn, formatDate } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router"
import authService from "@/services/AuthService"
import { CONFIG } from "@/config"
import { observer } from "mobx-react-lite"
import { useUserConfessionStats } from "@/services/HomeConfession"

const MainLayout = observer(({ children }) => {
    const [profileSidebarOpen, setProfileSidebarOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = useUserConfessionStats();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has("q")) {
            setSearchQuery(searchParams.get("q") || "");
        }
    }, [searchParams]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query !== "") {
                navigate(`/search?q=${encodeURIComponent(query)}`);
                e.target.value = '';
            } else {
                navigate(`/`);
            }
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                        <span className="text-sm font-bold">C</span>
                    </div> */}
                    <h1 className="text-2xl font-bold tracking-tight text-primary">
                        <span className="text-primary ubuntu-medium">Confess</span>
                        <span className="ubuntu-bold text-primary/95 ubuntu-bold-italic">It</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search confessions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border-gray-200 bg-gray-50/50 pl-11 pr-4 py-2.5 text-sm shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-gray-300 focus:ring-offset-0"
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </Button> */}

                    {/* Profile Sidebar */}
                    <Sheet open={profileSidebarOpen} onOpenChange={setProfileSidebarOpen}>
                        <SheetTrigger asChild>
                            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-gray-200 transition-all hover:ring-gray-300 hover:scale-105">
                                <AvatarImage src="/user.png" alt="User" />
                                <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">{authService.user.name[0]}</AvatarFallback>
                            </Avatar>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 p-0">
                            <SheetHeader className="px-6 py-6 border-b border-gray-100">
                                <SheetTitle className="text-xl font-semibold">Profile</SheetTitle>
                            </SheetHeader>
                            <div className="p-6 space-y-6">
                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16 ring-4 ring-gray-100">
                                        <AvatarImage src="/user.png" alt="User" />
                                        <AvatarFallback className="bg-gray-200 text-gray-700 text-lg font-semibold">{authService.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900">{authService.user.name}</h2>
                                        <p className="text-xs text-gray-400 mt-1">Member since {formatDate(authService.user.created_at)}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">{data?.confessionCount || 0}</p>
                                        <p className="text-xs text-gray-500">Confessions</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">{data?.likeCount || 0}</p>
                                        <p className="text-xs text-gray-500">Likes</p>
                                    </div>
                                    {/* <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">156</p>
                                        <p className="text-xs text-gray-500">Views</p>
                                    </div> */}
                                </div>

                                <div className="space-y-1">
                                    <ProfileItem icon={<User />} label="View Profile" onClick={() => navigate("/profile")} />
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <ProfileItem icon={<LogOut />} label="Logout" onClick={() => {
                                        authService.logout();
                                        navigate("/login");
                                    }} danger />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Desktop only) */}
                <aside className="hidden md:flex w-72 flex-col border-r border-gray-200 bg-white">
                    <nav className="flex flex-col gap-2 p-6">
                        <NavItem to="/" icon={<Home />} label="Home" location={location} />
                        <NavItem to="/trending" icon={<TrendingUp />} label="Trending" location={location} />
                        <NavItem to="/confess" icon={<PlusSquare />} label="New Confession" location={location} />
                        <NavItem to="/likes" icon={<Heart />} label="Liked Posts" location={location} />
                        <NavItem to="/profile" icon={<User />} label="My Profile" location={location} />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="mx-auto max-w-2xl px-6 py-8 pb-24 md:pb-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Bottom Navigation (Mobile only) */}
            <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 z-50 backdrop-blur-xl border-t border-gray-200 px-6 py-3 shadow-lg">
                <div className="flex justify-around items-center max-w-sm mx-auto">
                    <NavButton to="/" icon={<Home />} label="Home" location={location} />
                    <NavButton to="/trending" icon={<TrendingUp />} label="Trending" location={location} />
                    <NavButton to="/confess" icon={<PlusSquare />} label="Post" location={location} isCreate />
                    <NavButton to="/likes" icon={<Heart />} label="Liked" location={location} />
                    <NavButton to="/profile" icon={<User />} label="Profile" location={location} />
                </div>
            </footer>
        </div>
    )
});



/* --- Enhanced Reusable Components with Router --- */
function NavItem({ to, icon, label, location }) {
    const active = location.pathname === to
    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                active
                    ? "bg-primary/90 text-white shadow-md hover:bg-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
        >
            <span className={cn("transition-transform", active && "scale-110")}>
                {icon}
            </span>
            <span className="font-medium">{label}</span>
        </Link>
    )
}

function NavButton({ to, icon, label, location, isCreate }) {
    const active = location.pathname === to
    return (
        <Link
            to={to}
            className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0",
                active
                    ? "text-primary scale-105"
                    : "text-gray-500 hover:text-gray-700 hover:scale-105"
            )}
        >
            <div className={cn(
                "flex items-center justify-center rounded-lg p-2 transition-all",
                isCreate
                    ? "bg-primary text-white shadow-lg"
                    : active
                        ? "bg-primary/10"
                        : "hover:bg-gray-100"
            )}>
                {icon}
            </div>
            <span className="text-xs font-medium truncate">{label}</span>
        </Link>
    )
}

function ProfileItem({ icon, label, danger, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                danger
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
        >
            <span className="flex-shrink-0">{icon}</span>
            <span>{label}</span>
        </button>
    )
}


export default MainLayout