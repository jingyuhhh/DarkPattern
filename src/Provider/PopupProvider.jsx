import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalPopup from "./GlobalPopup";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children, interval = 30000 }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // 从路径中获取 taskId 和额外的路径部分（假设路由格式是 /task/:id/:extra）
  const match = location.pathname.match(/\/task\/(\d+)\/(.+)/);
  const taskId = match ? parseInt(match[1], 10) : null;
  const extraPath = match ? match[2] : null;

  useEffect(() => {
    let timer;
    if (taskId === 9 && extraPath) {
      // 只有 taskId === 9 且存在额外路径部分时才启动定时器
      timer = setInterval(() => {
        setOpen(true);
      }, interval);
    }
    return () => clearInterval(timer);
  }, [taskId, extraPath, interval]);

  const handleClose = () => setOpen(false);

  return (
    <PopupContext.Provider value={{ open, setOpen }}>
      {children}
      <GlobalPopup open={open} onClose={handleClose} />
    </PopupContext.Provider>
  );
};
