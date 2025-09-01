import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import MainLayout from "@/components/main-layout"
import ConfessionCard from "@/components/confession-card"
import { useLikedConfessions } from "@/services/HomeConfession";
import ConfessionSkeleton from "@/components/confession-skeleton";

export default function LikedPage() {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useLikedConfessions();

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
            <h2 className="text-xl font-bold mb-4">❤️ Liked Confessions</h2>

            <div className="flex flex-col">
                {status === "pending" && [...Array(3)].map((_, i) => (
                    <ConfessionSkeleton key={i} />
                ))}
                {status === "error" && <p>Failed to load confessions</p>}

                {data?.pages.map((page, i) => (
                    <div key={i} className="m-0 p-0">
                        {page.confessions.map((c) => (
                            <ConfessionCard key={c.id} confession={c} isLiked={true} />
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
