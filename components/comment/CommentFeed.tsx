import React from "react";
import Comment from "./Comment";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      <div className="pt-3 bg-neutral-900">
        {comments?.map((comment: Record<string, any>) => (
          <div key={comment.id} className="px-4 pb-3 ">
            <Comment data={comment} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentFeed;
