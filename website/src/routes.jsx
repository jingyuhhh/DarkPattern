// routes.jsx
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // Import useLocation
} from "react-router-dom";
import Shopping from "./components/Shopping/Shopping";
import ProductDetail from "./components/Shopping/components/ProdcutDetail/ProductDetail";
import CartDetail from "./components/Shopping/components/CartDetail/CartDetail";
import Checkout from "./components/Shopping/components/Checkout/Checkout";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import TaskEntry from "./components/TaskEntry/TaskEntry";
import QuestionMark from "./components/QuestionMark/QuestionMark";

import { PopupProvider } from "./Provider/PopupProvider"; // 引入

const PageWrapper = ({ children }) => {
  const location = useLocation(); // Use useLocation hook
  const searchParams = new URLSearchParams(location.search);

  const isAgent = searchParams.get("agent") === "true"; // 判断是否为 agent 模式
  return (
    <>
      {!isAgent ? (
        <div style={{ position: "relative" }}>
          <QuestionMark />
          {children}
        </div>
      ) : (
        <div style={{ position: "relative" }}>{children}</div>
      )}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <PopupProvider interval={15000}>
        {/* 必须放到 Router 内 */}
        <Routes>
          <Route path="/task/:id" element={<TaskEntry />} />
          <Route
            path="/task/:id/shopping"
            element={
              <PageWrapper>
                <Shopping />
              </PageWrapper>
            }
          />
          <Route
            path="/task/:id/productDetail/:productId"
            element={
              <PageWrapper>
                <ProductDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/task/:id/cart"
            element={
              <PageWrapper>
                <CartDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/task/:id/checkout"
            element={
              <PageWrapper>
                <Checkout />
              </PageWrapper>
            }
          />
          <Route
            path="/task/:id/store/:storeId"
            element={
              <PageWrapper>
                <StoreDetail />
              </PageWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/task/1" replace />} />
        </Routes>
      </PopupProvider>
    </Router>
  );
};

export default AppRoutes;
