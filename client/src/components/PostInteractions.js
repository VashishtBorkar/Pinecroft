import { ArrowUpIcon, ArrowDownIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

function PostInteractions({ post }) {
    return (
        <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center bg-zinc-700 rounded-full ">
                <button className="w-8 h-8  rounded-full hover:bg-zinc-600">
                    <ArrowUpIcon className="p-2 rounded-full"/>
                </button>
                
                <span className="mx-2">{(post.upvotes?.length ?? 0) - (post.downvotes?.length ?? 0)}</span>

                <button className="w-8 h-8 rounded-full hover:bg-zinc-600">
                    <ArrowDownIcon className="p-2 rounded-full"/>
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