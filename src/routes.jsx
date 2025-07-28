import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Shopping from "./components/Shopping/Shopping";
import ProductDetail from "./components/ProdcutDetail/ProductDetail";
import CartDetail from "./components/CartDetail/CartDetail";
import Checkout from "./components/Checkout/Checkout";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import TaskEntry from "./components/TaskEntry/TaskEntry";
import QuestionMark from "./components/QuestionMark/QuestionMark";

// 包装组件，为除了task页面之外的所有页面添加问号标志
const PageWrapper = ({ children }) => (
  <div style={{ position: "relative" }}>
    <QuestionMark />
    {children}
  </div>
);

const AppRoutes = () => (
  <Router>
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
  </Router>
);

export default AppRoutes;
