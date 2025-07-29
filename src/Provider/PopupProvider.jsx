import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalPopup from "./GlobalPopup";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children, interval = 30000 }) => {
  const [open, setOpen] = useState(false);
  const [popupDisabled, setPopupDisabled] = useState(false); // Track if popup is disabled
  const location = useLocation();

  // 从路径中获取 taskId 和额外的路径部分（假设路由格式是 /task/:id/:extra）
  const match = location.pathname.match(/\/task\/(\d+)\/(.+)/);
  const taskId = match ? parseInt(match[1], 10) : null;
  const extraPath = match ? match[2] : null;

  useEffect(() => {
    let timer;
    if (!popupDisabled && taskId === 9 && extraPath) {
      // Only start the timer if popup is not disabled
      timer = setInterval(() => {
        setOpen(true);
      }, interval);
    }
    return () => clearInterval(timer);
  }, [taskId, extraPath, interval, popupDisabled]);

  const handleClose = () => setOpen(false);

  const handleDisablePopup = () => {
    setPopupDisabled(true); // Disable popup
    setOpen(false); // Close popup
  };

  return (
    <PopupContext.Provider value={{ open, setOpen, handleDisablePopup }}>
      {children}
      <GlobalPopup
        open={open}
        onClose={handleClose}
        onDisable={handleDisablePopup}
      />
    </PopupContext.Provider>
  );
};
