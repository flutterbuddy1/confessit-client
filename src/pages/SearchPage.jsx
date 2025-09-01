import MainLayout from "@/components/main-layout";
import ConfessionCard from "@/components/confession-card";
import { useConfessions, useSearchConfessions } from "@/services/HomeConfession";
import { useRef, useEffect, useInsertionEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ConfessionSkeleton from "@/components/confession-skeleton";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("Search Params:", searchParams);
    const navigate = useNavigate();

    const query = searchParams.get("q") || "";
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = useSearchConfessions(query);


    const loadMoreRef = useRef();

    useEffect(() => {
        if (!searchParams.has("q")) {
            navigate("/");
        } else {
            refetch();
        }
    }, [searchParams]);

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
            <h2 className="mb-4 text-xl font-bold">Result for: {query}</h2>

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
        </MainLayout>
    );
};

export default SearchPage;
