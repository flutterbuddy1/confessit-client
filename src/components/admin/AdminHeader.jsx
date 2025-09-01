import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { LogOut, User, Menu, Settings, Bell, Search, Users, FileText, FolderOpen, BarChart3 } from "lucide-react"
import { Link } from "react-router"

export default function AdminHeader() {
    const navigationItems = [
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/blogs", label: "Blogs", icon: FileText },
        { href: "/admin/categories", label: "Categories", icon: FolderOpen },
        { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-900 border-b border-gray-700 shadow-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Left Section: Logo and Desktop Navigation */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <h1 className="text-xl font-semibold text-white hidden sm:block">Admin Panel</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Right Section: Actions and Profile */}
                    <div className="flex items-center gap-3">

                        {/* Search Button - Hidden on small screens */}
                        <Button variant="ghost" size="sm" className="hidden md:flex h-9 w-9 p-0 hover:bg-gray-800">
                            <Search className="h-4 w-4 text-gray-300" />
                        </Button>

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-gray-800">
                                    <Bell className="h-4 w-4 text-gray-300" />
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">3</span>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
                                <div className="p-3 border-b border-gray-700">
                                    <h3 className="font-medium text-sm text-white">Notifications</h3>
                                </div>
                                <DropdownMenuItem className="p-3 hover:bg-gray-700 focus:bg-gray-700">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-white">New user registered</p>
                                        <p className="text-xs text-gray-400">2 minutes ago</p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-3 hover:bg-gray-700 focus:bg-gray-700">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-white">Blog post pending review</p>
                                        <p className="text-xs text-gray-400">1 hour ago</p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-3 hover:bg-gray-700 focus:bg-gray-700">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-white">System backup completed</p>
                                        <p className="text-xs text-gray-400">3 hours ago</p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/admin-avatar.png" alt="Admin" />
                                        <AvatarFallback className="bg-blue-900 text-blue-100 text-sm font-medium">AD</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-white">Admin User</p>
                                        <p className="text-xs text-gray-400">admin@company.com</p>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                                <div className="p-3 border-b border-gray-700">
                                    <p className="text-sm font-medium text-white">Admin User</p>
                                    <p className="text-xs text-gray-400">admin@company.com</p>
                                </div>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <User className="mr-3 h-4 w-4 text-gray-300" />
                                    <span className="text-white">Profile Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Settings className="mr-3 h-4 w-4 text-gray-300" />
                                    <span className="text-white">Account Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-gray-700 focus:bg-gray-700 hover:text-red-300 focus:text-red-300">
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu Sheet */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0 hover:bg-gray-800">
                                    <Menu className="h-5 w-5 text-gray-300" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 bg-gray-900 border-gray-700">
                                <SheetHeader>
                                    <SheetTitle className="text-left text-white">Navigation</SheetTitle>
                                </SheetHeader>
                                <nav className="mt-8 space-y-2">
                                    {navigationItems.map((item) => {
                                        const IconComponent = item.icon
                                        return (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                <IconComponent className="h-5 w-5" />
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                </nav>

                                {/* Mobile Search */}
                                <div className="mt-8 pt-8 border-t border-gray-700">
                                    <Button variant="outline" className="w-full justify-start gap-3 border-gray-600 bg-gray-800 text-white hover:bg-gray-700">
                                        <Search className="h-4 w-4" />
                                        Search
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}