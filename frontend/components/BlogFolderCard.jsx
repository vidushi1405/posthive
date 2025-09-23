import React, { useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function BlogFolderCard({ blog }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [openDirection, setOpenDirection] = useState("down");
  const buttonRef = useRef(null);

  const handleNativeShare = (e) => {
    e.stopPropagation();
    const shareData = {
      title: blog.title,
      text: blog.excerpt,
      url: `${window.location.origin}/blog/${blog.id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch(() => toast.error("Sharing failed."));
    } else {
      toast("Web Share not supported on this device.");
    }
    setShowOptions(false);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${blog.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
    setShowOptions(false);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;

    // Open upward if less than 120px space below
    setOpenDirection(spaceBelow < 120 ? "up" : "down");
    setShowOptions((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="flex flex-col items-stretch cursor-pointer transition-shadow rounded-lg"
    >
      {/* Folder Container */}
      <div className="folder-bg rounded-lg p-12 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-700">
            {blog.category}
          </div>
          <h3 className="text-2xl font-bold text-black font-serif leading-snug hover:text-[#e67300] transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">{blog.excerpt}</p>
        </div>

        <div className="flex items-center gap-5 text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {blog.readTime}
          </span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {blog.views.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer: likes, comments, share */}
      <div className="flex justify-between px-10 items-center text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center hover:text-red-500">
            <Heart className="w-4 h-4 mr-1" />
            {blog.likes}
          </span>
          <span className="flex items-center hover:text-blue-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            {blog.comments}
          </span>
        </div>

        {/* Share Options */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleShareClick}
            className="hover:text-gray-900 bg-black text-white p-2 rounded-md"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {showOptions && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute right-0 ${
                openDirection === "up"
                  ? "bottom-full mb-2"
                  : "top-full mt-2"
              } flex bg-black/60 rounded-md z-40 text-white text-sm gap-2 px-2 py-1`}
            >
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 min-w-[100px] px-3 py-1.5 text-sm hover:bg-white hover:text-black rounded-md whitespace-nowrap"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 min-w-[100px] px-3 py-1.5 text-sm hover:bg-white hover:text-black rounded-md whitespace-nowrap"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
