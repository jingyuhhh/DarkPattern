import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalPopup from "./GlobalPopup";
import { PopupContext } from "./PopupContext";

export const PopupProvider = ({ children, interval }) => {
  const [open, setOpen] = useState(false);
  const [popupDisabled, setPopupDisabled] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [isTaskCompletionModalOpen, setIsTaskCompletionModalOpen] =
    useState(false);
  const location = useLocation();

  // 从路径中获取 taskId 和额外的路径部分
  const match = location.pathname.match(/\/task\/(\d+)\/(.+)/);
  const taskId = match ? parseInt(match[1], 10) : null;
  const extraPath = match ? match[2] : null;

  // 检查是否在task completion modal页面 - 通过URL路径检测
  const isInTaskCompletionModal =
    location.pathname.includes("/task/") &&
    (location.pathname.includes("/completion") ||
      location.pathname.includes("/survey") ||
      location.pathname.includes("/end"));

  useEffect(() => {
    if (taskId !== 10) {
      setPopupDisabled(false);
      setHasShownInitial(false);
    }
  }, [taskId]);

  useEffect(() => {
    // 第一次进入界面就显示popup
    if (!hasShownInitial && taskId === 10 && extraPath && !popupDisabled) {
      setOpen(true);
      setHasShownInitial(true);
    }
  }, [taskId, extraPath, hasShownInitial, popupDisabled]);

  useEffect(() => {
    let timer;
    // 如果用户进入了task completion modal，停止显示popup
    if (taskId === 10 && isInTaskCompletionModal) {
      setOpen(false);
      setPopupDisabled(true);
      return;
    }

    // 只有在没有禁用且已经显示过初始popup的情况下才启动定时器
    if (!popupDisabled && hasShownInitial && taskId === 10 && extraPath) {
      timer = setInterval(() => {
        setOpen(true);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [
    taskId,
    extraPath,
    interval,
    popupDisabled,
    hasShownInitial,
    isInTaskCompletionModal,
    isTaskCompletionModalOpen,
  ]);

  const handleClose = () => setOpen(false);

  const handleDisablePopup = () => {
    setPopupDisabled(true);
    setOpen(false);
  };

  const notifyTaskCompletionModalOpen = (isOpen) => {
    setIsTaskCompletionModalOpen(isOpen);
  };

  return (
    <PopupContext.Provider
      value={{
        open,
        setOpen,
        handleDisablePopup,
        notifyTaskCompletionModalOpen,
      }}
    >
      {children}
      <GlobalPopup
        open={open}
        onClose={handleClose}
        onDisable={handleDisablePopup}
      />
    </PopupContext.Provider>
  );
};
