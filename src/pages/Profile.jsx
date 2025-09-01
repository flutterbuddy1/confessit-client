import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Heart } from "lucide-react"
import MainLayout from "@/components/main-layout"
import { observer } from "mobx-react-lite"
import authService from "@/services/AuthService"
import { useMyConfession, useUserConfessionStats } from "@/services/HomeConfession"
import ConfessionCard from "@/components/confession-card"
import ConfessionSkeleton from "@/components/confession-skeleton"

const ProfilePage = observer(() => {
    const [user, setUser] = useState({
        username: authService.user.name,
        joined_at: authService.user.created_at,
    });

    const { data: userStats, refetch } = useUserConfessionStats();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useMyConfession();

    const loadMoreRef = useRef();

    // IntersectionObserver → auto load next page
    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return (
        <MainLayout>
            <h2 className="text-xl font-bold mb-4">👤 My Profile</h2>

            <>
                {/* User Info Card */}
                <Card className="rounded-2xl shadow-md mb-6">
                    <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">{user.username}</h3>
                            <p className="text-sm text-gray-500">
                                Joined {new Date(user.joined_at).toLocaleDateString()}
                            </p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-700">
                                <span>Confessions: {userStats?.confessionCount || 0}</span>
                                <span>Likes: {userStats?.likeCount || 0}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User’s Confessions */}
                <h3 className="text-lg font-semibold mb-2">📝 My Confessions</h3>
                <div className="flex flex-col">
                    {status === "pending" && [...Array(3)].map((_, i) => (
                        <ConfessionSkeleton key={i} />
                    ))}
                    {status === "error" && <p>Failed to load confessions</p>}

                    {data?.pages.map((page, i) => (
                        <div key={i} className="m-0 p-0">
                            {page.confessions.map((c) => (
                                <ConfessionCard key={c.id} confession={c} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Loader Trigger */}
                <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                    {isFetchingNextPage && <p>Loading more...</p>}
                    {!hasNextPage && <p>No more confessions</p>}
                </div>
            </>
        </MainLayout>
    )
});

export default ProfilePage;