import React, { useState, useEffect } from "react";
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CommentIcon from "@mui/icons-material/Comment";
import { SettingsDialog } from "./components/SettingsDialog/SettingsDialog";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";

import video1 from "/src/assets/invideo1.mp4";
import { Register } from "./components/Register/Register";
import { Menu, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";
import { getTasks } from "../../data/tasks";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTask = tasks.find((task) => task.id === parseInt(id));

  // Use id in console.log to avoid linter warning
  console.log("Current video ID:", id);

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [taskCompletionModalOpen, setTaskCompletionModalOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);

  // 注册表单状态
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([
    {
      id: 1,
      user: "Kenna<3",
      text: "This is not detailing, this is restoration👏🏼🔥",
      likes: 348300,
      time: "6-23",
      replies: [
        {
          id: 11,
          user: "Pudliszek303",
          text: "That's a factory reset.",
          time: "6-25",
        },
      ],
    },
    {
      id: 2,
      user: "robertvillegas",
      text: "This is like SB Mowing for cars.",
      likes: 64800,
      time: "6-24",
      replies: [],
    },
    {
      id: 3,
      user: "Shotimer",
      text: "That was the most satisfying car detailing video I've ever seen 😮",
      likes: 3053,
      time: "7-15",
      replies: [],
    },
  ]);

  // Set initial login state based on ID
  useEffect(() => {
    if (id === "13") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setUsername("User");
    }
  }, [id]);

  // Handle video end for ID 10
  useEffect(() => {
    if (id === "10" && videoEnded) {
      setTaskCompletionModalOpen(true);
    }
  }, [videoEnded, id]);

  // Handle location sharing for ID 8
  const handleLocationSharingChange = (enabled) => {
    setLocationSharingEnabled(enabled);
    if (id === "8" && !enabled) {
      // Location sharing was disabled successfully
      setTaskCompletionModalOpen(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setLoginDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    setSettingsDialogOpen(true);
    handleMenuClose();
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleCommentClick = () => {
    if (id === "13" && !isLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }
    setShowComments(true);
  };

  return (
    <div className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden">
      {/* User avatar */}
      <div className="absolute top-4 right-4 z-20">
        <Avatar
          sx={{
            bgcolor: "#888",
            cursor: "pointer",
            width: 40,
            height: 40,
            fontSize: "1rem",
          }}
          onClick={handleAvatarClick}
        >
          {isLoggedIn ? username[0]?.toUpperCase() : "U"}
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1,
              minWidth: 160,
              borderRadius: 2,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
              "& .MuiMenuItem-root": {
                fontSize: "0.95rem",
                paddingY: "10px",
              },
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleSettingsClick}>
            <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* Main container */}
      <div
        className="w-full max-w-screen-xl flex"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        {/* Video */}
        <div
          className={`relative rounded-2xl w-[500px] h-full bg-neutral-900 overflow-hidden transition-transform duration-300 ease-in-out ${
            showComments ? "ml-0 mr-auto" : "mx-auto"
          }`}
        >
          <video
            src={video1}
            autoPlay
            loop={id !== "10"}
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-20 left-4 right-4 text-white text-sm z-10">
            <div className="font-bold">@freshdrive_cardetailing</div>
            <div>
              This guy's taking his new girlfriend out for the first time...
            </div>
          </div>
          <div className="absolute bottom-10 left-4 right-4 px-2 text-sm text-gray-300 z-10">
            <div className="font-semibold">
              Bro Did 1 Internship and Switched Up 😭
            </div>
            <div>#intern #csmajor #softwareengineer #sweintern</div>
          </div>

          {/* Buttons */}
          <div className="absolute right-4 top-1/3 flex flex-col space-y-5 items-center text-white z-20">
            <div className="flex flex-col items-center">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  liked
                    ? "bg-white hover:bg-gray-200"
                    : "bg-[#2e2e2e] hover:bg-[#3a3a3a]"
                }`}
              >
                <ThumbUpAltRoundedIcon
                  style={{
                    color: liked ? "black" : "white",
                    fontSize: 24,
                  }}
                />
              </button>
              <span className="text-xs mt-1 text-white">1.3M</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleCommentClick}
                className="w-12 h-12 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a] flex items-center justify-center transition-all duration-200"
              >
                <CommentIcon style={{ color: "white", fontSize: 24 }} />
              </button>
              <span className="text-xs mt-1 text-white">10K</span>
            </div>
          </div>
        </div>
        {/* Comments */}
        {showComments && (
          <div className="w-[480px] h-full bg-black text-white z-30 px-6 py-6 overflow-y-auto border-l border-neutral-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Comments</h2>
              <button
                className="w-10 h-10 text-2xl text-white rounded-full hover:bg-[#2a2a2a] flex items-center justify-center transition duration-200"
                onClick={() => setShowComments(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {allComments.map((c) => (
                <div key={c.id} className="flex space-x-3 items-start">
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#666" }}>
                    {c.user[0]}
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{c.user}</div>
                    <div className="text-sm text-gray-300 mb-1">{c.text}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{c.time}</span>
                      <span>{c.likes.toLocaleString()} likes</span>
                    </div>
                    {c.replies.length > 0 && (
                      <button className="text-xs text-blue-400 mt-1">
                        View {c.replies.length} reply
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-700 pt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoggedIn) {
                    setLoginDialogOpen(true);
                    return;
                  }
                  if (newComment.trim()) {
                    setAllComments([
                      ...allComments,
                      {
                        id: Date.now(),
                        user: username || "Guest",
                        text: newComment,
                        time: new Date().toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                        }),
                        likes: 0,
                        replies: [],
                      },
                    ]);
                    setNewComment("");
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onClick={() => {
                    if (!isLoggedIn && !loginDialogOpen)
                      setLoginDialogOpen(true);
                  }}
                  className="w-full bg-transparent border border-neutral-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Register Dialog */}
      <Register
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
        onLocationSharingChange={handleLocationSharingChange}
        initialLocationSharing={locationSharingEnabled}
      />

      {/* Task Completion Modal */}
      <TaskCompletionModal
        id={id}
        open={taskCompletionModalOpen}
        targetTaskType={currentTask?.taskType}
        onClose={() => setTaskCompletionModalOpen(false)}
      />
    </div>
  );
};

export default VideoPage;
