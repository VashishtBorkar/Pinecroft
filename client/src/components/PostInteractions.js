import { ArrowUpIcon, ArrowDownIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

function PostInteractions({ post }) {
    const [userId, setUserId] = useState(null);
    const [voteState, setVoteState] = useState({
        upVoted: false,
        downVoted: false,
        voteCount: 0
    });

    const [votes, setVotes] = useState({upVoted: false, downVoted: false });
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/auth/user", { withCredentials: true });
                setUserId(res.data.id);
            } catch (err) {
                console.error("Failed to get user", err);
            }
        };
        
        getUserId();
    }, []);

    useEffect(() => {
        if (userId && post) {
            const upVoted = post.upvotes?.includes(userId) || false;
            const downVoted = post.downvotes?.includes(userId) || false;
            const count = (post.upvotes?.length || 0) - (post.downvotes?.length || 0);
            
            setVoteState({
                upVoted,
                downVoted,
                voteCount: count
            });
        }
    }, [userId, post]);


    async function updateVote(e, voteType) {
        e.stopPropagation(); // Prevents bubbling to the card click
        try {
            const res = await axios.put(`http://localhost:4000/api/interactions/vote/${post._id}`, 
                { targetType: 'post', voteType: voteType },
                { withCredentials: true }
            );
            setVoteState(res.data);
        } catch (err) { 
            console.error("Voting failed", err);
        }
    }

    return (
        <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center bg-zinc-700 rounded-full ">
                <button
                    onClick={(e) => updateVote(e, "upvote")}
                    className={`w-8 h-8 rounded-full hover:bg-zinc-600  hover:text-green-400`}
                    >
                    <ArrowUpIcon className={`p-2 rounded-full ${ voteState.upVoted ? "text-green-400" : "text-gray-300" }`} />
                </button>

                <span className="mx-2">{voteState.voteCount}</span>

                <button
                    onClick={(e) => updateVote(e, "downvote")}
                    className={`w-8 h-8 rounded-full hover:bg-zinc-600  hover:text-red-400`}
                >
                    <ArrowDownIcon className={`p-2 rounded-full ${ voteState.downVoted ? "text-red-400" : "text-gray-300" }`} />
                </button>
            </div>

            <div className="flex items-center gap-1 bg-zinc-700 rounded-full hover:bg-zinc-600">
                <ChatBubbleOvalLeftIcon className="p-2 w-8 h-8 "/>
                <span className="mr-2">{post.comments?.length ?? 0}</span>
            </div>
        </div>
    )
}

export default PostInteractions;