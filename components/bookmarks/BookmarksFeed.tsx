import React from "react";
import Post from "../posts/Post";
import useBookmarks from "@/hooks/useBookmarks";
import { ClipLoader } from "react-spinners";

interface BookmarksFeedProps {
  userId?: string;
}

const BookmarksFeed: React.FC<BookmarksFeedProps> = ({ userId }) => {
  const { data: bookmarks = [], isLoading } = useBookmarks(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      {bookmarks.length === 0 && (
        <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
          <p>You currently have no bookmarks</p>
        </div>
      )}
      {Array.isArray(bookmarks) &&
        bookmarks.map((bookmark: Record<string, any>) => (
          <div key={bookmark.id} className="mb-4">
            <Post userId={userId} data={bookmark} />
          </div>
        ))}
    </>
  );
};

export default BookmarksFeed;
