import { useNavigate, useLocation } from "react-router-dom";

export function usePreserveQueryNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, options = {}) => {
    const search = location.search; // 当前的 ?xxx
    if (typeof to === "string") {
      // 如果传的是字符串，拼接 query
      console.log("object");
      navigate(to.includes("?") ? to : `${to}${search}`, options);
    } else if (typeof to === "object") {
      // 如果传的是对象，补 search
      navigate({ ...to, search: to.search || search }, options);
    }
  };
}
