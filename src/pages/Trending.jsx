import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Flame } from "lucide-react"
import MainLayout from "@/components/main-layout"
import ConfessionCard from "@/components/confession-card"
import { useTrendingConfessions } from "@/services/HomeConfession"
import { useEffect, useRef } from "react"
import ConfessionSkeleton from "@/components/confession-skeleton"

export default function Trending() {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useTrendingConfessions();

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
            <div className="mb-4 flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-bold">Trending Confessions</h2>
            </div>
            <div className="flex flex-col">
                {status === "pending" && [...Array(3)].map((_, i) => (
                    <ConfessionSkeleton key={i} />
                ))}
                {status === "error" && <p>Failed to load confessions</p>}

                {data?.pages.map((page, i) => (
                    <div key={i} className="m-0 p-0">
                        {page.confessions.map((c, idx) => (
                            <ConfessionCard key={c.id} confession={c} isTrending={((idx + 1) <= 10) && i < 1} />
                        ))}
                    </div>
                ))}
            </div>

            {/* Loader Trigger */}
            <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <p>Loading more...</p>}
                {!hasNextPage && <p>No more confessions</p>}
            </div>
        </MainLayout>
    )
}
