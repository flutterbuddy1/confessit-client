const ConfessionSkeleton = () => {
    return (
        <div className="animate-pulse p-4 border rounded-2xl mb-3 shadow-sm">
            {/* Avatar + Name */}
            <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-3 flex-1">
                    <div className="h-3 w-28 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Content Lines */}
            <div className="space-y-2">
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
                <div className="h-3 w-9/12 bg-gray-200 rounded"></div>
            </div>

            {/* Footer (likes/comments) */}
            <div className="flex mt-4 space-x-4">
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default ConfessionSkeleton;
