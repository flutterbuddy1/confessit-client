import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Trash, User } from "lucide-react"
import { timeAgo } from "@/lib/utils"
import authService from "@/services/AuthService"
import ConfessionService from "@/services/ConfessionService"
import { Avatar } from "./ui/avatar"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const EmberParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-70"
                style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                }}
            />
        ))}
        <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-10px) rotate(180deg); opacity: 0.3; }
      }
    `}</style>
    </div>
)

export default function ConfessionCard({ confession, isLiked = false, isTrending = false }) {
    const checkLiked = confession.likes.find(like => like.user_id === authService.user.id);
    const [liked, setLiked] = useState(isLiked || checkLiked || false)
    const [likes, setLikes] = useState(confession.likes.length ?? 0)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState(confession.comments || [])
    const [newComment, setNewComment] = useState("")
    const [deleteIndex, setDeleteIndex] = useState(null) // track which comment to delete

    const toggleLike = async () => {
        const likeData = await ConfessionService.likeConfession(confession.id, authService.user.id);
        console.log(likeData);
        if (liked) {
            setLikes(likes - 1)
        } else {
            setLikes(likes + 1)
        }
        setLiked(!liked)
    }

    const handleAddComment = async () => {
        if (!newComment.trim()) return
        const comment = await ConfessionService.addComment(confession.id, authService.user.id, newComment);
        console.log(comment)
        setComments([...comments, comment.data])
        setNewComment("")
    }

    const handleDeleteComment = async (index) => {
        const comment = comments[index]
        setComments(comments.filter((_, i) => i !== index))
        await ConfessionService.deleteComment(comment.id) // assuming backend supports delete
    }

    return (
        <div className="relative mb-4">
            <Card className={`rounded-2xl shadow-md relative overflow-hidden ${isTrending
                ? 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-2 border-orange-200 shadow-orange-200/50 shadow-lg'
                : ''
                }`}>
                {isTrending && <EmberParticles />}
                {isTrending && <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: "url('/assets/images/t-bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                        opacity: 0.1,
                        zIndex: 0
                    }}
                />}

                <CardContent className="p-4 relative z-10">
                    {/* Hot/Trending Badge */}
                    {isTrending && (
                        <div className="flex items-center mb-3">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                                Trending
                            </div>
                        </div>
                    )}

                    {/* Confession Text */}
                    <p className="text-base">{confession.masked_content}</p>

                    {/* Sentiment + Actions */}
                    <div className="mt-3 flex items-center justify-between">
                        <Badge
                            variant={
                                confession.sentiment === "positive"
                                    ? "default"
                                    : confession.sentiment === "negative"
                                        ? "destructive"
                                        : "secondary"
                            }
                        >
                            {confession.sentiment}
                        </Badge>

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            {/* Like Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
                                onClick={toggleLike}
                            >
                                <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} /> {likes}
                            </Button>

                            {/* Toggle Comments */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => setShowComments(!showComments)}
                            >
                                <MessageCircle className="h-4 w-4" /> {comments.length}
                            </Button>

                            {/* Timestamp */}
                            <span className="text-xs text-gray-500">
                                {timeAgo(confession.created_at)}
                            </span>
                        </div>
                    </div>

                    {/* Comments Section */}
                    {showComments && (
                        <div className="mt-4 border-t pt-3 space-y-3">
                            {/* Existing Comments */}
                            {comments.length > 0 ? (
                                comments.map((c, idx) => (
                                    <div key={idx} className="text-sm shadow p-2 rounded w-fit bg-gray-200 flex items-start px-2">
                                        <Avatar className="bg-accent flex justify-center items-center size-8 mr-2 text-xs font-medium">
                                            <User className="text-gray-400" />
                                        </Avatar>
                                        <span className="my-auto">{c.content}</span>
                                        {c.user_id === authService.user.id && (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="ml-2 p-0"
                                                        onClick={() => setDeleteIndex(idx)}
                                                    >
                                                        <Trash className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. Are you sure you want to delete your comment?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                if (deleteIndex !== null) handleDeleteComment(deleteIndex)
                                                            }}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">No comments yet. Be the first!</p>
                            )}

                            {/* Add Comment */}
                            <div className="flex gap-2">
                                <Input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="text-sm"
                                />
                                <Button size="sm" onClick={handleAddComment}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
