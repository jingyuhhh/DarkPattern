import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

let userActions = JSON.parse(localStorage.getItem("userActions") || "[]");
let lastInputValues = JSON.parse(
  localStorage.getItem("lastInputValues") || "{}"
);
let lastToggleStates = JSON.parse(
  localStorage.getItem("lastToggleStates") || "{}"
);
let visitedRoutes = JSON.parse(localStorage.getItem("visitedRoutes") || "[]"); // 记录完整 URL + 时间
let currentPopupElements = [];
let logFilename = "activity_log.json";

function saveToLocalStorage() {
  localStorage.setItem("userActions", JSON.stringify(userActions));
  localStorage.setItem("lastInputValues", JSON.stringify(lastInputValues));
  localStorage.setItem("lastToggleStates", JSON.stringify(lastToggleStates));
  localStorage.setItem("visitedRoutes", JSON.stringify(visitedRoutes));
}

function logAction(eventType, details) {
  const entry = {
    event: eventType,
    details: details,
    timestamp: new Date().toISOString(),
  };
  userActions.push(entry);
  saveToLocalStorage();
}

function logRouteChange(newUrl) {
  const entry = {
    url: newUrl,
    timestamp: new Date().toISOString(),
  };
  visitedRoutes.push(entry);
  logAction("route_change", entry);
}

function isClickInPopup(target) {
  return currentPopupElements.some((popup) => popup.contains(target));
}

function registerPopupElement(el) {
  if (el && !currentPopupElements.includes(el)) {
    currentPopupElements.push(el);
  }
}

function sanitizeForFirestore(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (
        value instanceof Element ||
        value instanceof SVGElement ||
        (typeof value === "object" && value?.baseVal !== undefined)
      ) {
        return value.baseVal || value.toString();
      }
      return value;
    })
  );
}

export async function uploadLogToFirebase() {
  try {
    const payload = {
      userActions,
      lastInputValues,
      lastToggleStates,
      visitedRoutes, // 上传完整 URL 访问记录
      uploadedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    console.log(payload);
    const sanitizedPayload = sanitizeForFirestore(payload);

    const docRef = await addDoc(collection(db, "userLogs"), sanitizedPayload);
    console.log("日志已上传，ID:", docRef.id);

    localStorage.removeItem("userActions");
    localStorage.removeItem("lastInputValues");
    localStorage.removeItem("lastToggleStates");
    localStorage.removeItem("visitedRoutes");
  } catch (error) {
    console.error("上传失败:", error);
  }
}

function getInputIdentifier(el) {
  return el.id || el.name || generateSelector(el);
}

function generateSelector(el) {
  if (!el) return "unknown";
  const path = [];
  while (
    el &&
    el.nodeType === Node.ELEMENT_NODE &&
    el.tagName.toLowerCase() !== "html"
  ) {
    let selector = el.tagName.toLowerCase();
    if (el.id) {
      selector += `#${el.id}`;
    } else if (el.className) {
      selector += `.${el.className.trim().replace(/\s+/g, ".")}`;
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(" > ");
}

export function initLogger(filename = "activity_log.json") {
  if (!sessionStorage.getItem("loggerInitialized")) {
    localStorage.removeItem("userActions");
    localStorage.removeItem("lastInputValues");
    localStorage.removeItem("lastToggleStates");
    localStorage.removeItem("visitedRoutes");

    userActions = [];
    lastInputValues = {};
    lastToggleStates = {};
    visitedRoutes = [];

    sessionStorage.setItem("loggerInitialized", "true");
  } else {
    userActions = JSON.parse(localStorage.getItem("userActions") || "[]");
    lastInputValues = JSON.parse(
      localStorage.getItem("lastInputValues") || "{}"
    );
    lastToggleStates = JSON.parse(
      localStorage.getItem("lastToggleStates") || "{}"
    );
    visitedRoutes = JSON.parse(localStorage.getItem("visitedRoutes") || "[]");
  }

  logFilename = filename;

  // 记录当前初始 URL
  logRouteChange(window.location.href);

  // 监听页面的 popstate（后退/前进）
  window.addEventListener("popstate", () => {
    logRouteChange(window.location.href);
  });

  // 劫持 pushState 和 replaceState 记录 SPA 路由变化
  const _pushState = history.pushState;
  history.pushState = function () {
    _pushState.apply(this, arguments);
    logRouteChange(window.location.href);
  };
  const _replaceState = history.replaceState;
  history.replaceState = function () {
    _replaceState.apply(this, arguments);
    logRouteChange(window.location.href);
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() !== "input") {
      const inPopup = isClickInPopup(target);
      logAction("click", {
        element: target.tagName.toLowerCase(),
        id: target.id || "none",
        classname: target.className || "none",
        elementText: target.textContent?.substring(0, 50) || "none",
        x: event.clientX,
        y: event.clientY,
        isInPopup: inPopup,
      });
    }
  });

  document.body.addEventListener("input", (event) => {
    const target = event.target;
    const tag = target.tagName.toLowerCase();
    const type = target.type;
    const allowedTypes = [
      "text",
      "number",
      "email",
      "password",
      "search",
      "url",
      "tel",
      "date",
      "time",
    ];
    if (
      (tag === "input" && allowedTypes.includes(type)) ||
      tag === "textarea"
    ) {
      const id = getInputIdentifier(target);
      const value = target.value;
      lastInputValues[id] = value;
    }
  });

  document.body.addEventListener("change", (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === "select") {
      const id = getInputIdentifier(target);
      const value = target.value;
      lastInputValues[id] = value;
      logAction("select", {
        fieldId: id,
        selectedValue: value,
      });
    }
  });

  document.body.addEventListener("change", (event) => {
    const target = event.target;
    if (
      target.tagName.toLowerCase() === "input" &&
      (target.type === "checkbox" || target.type === "radio")
    ) {
      const toggleId = getInputIdentifier(target);
      const checked = target.checked;
      logAction("toggle", {
        id: toggleId,
        type: target.type,
        name: target.name || "none",
        checked: checked,
      });
      lastToggleStates[toggleId] = checked;
    }
  });
}
