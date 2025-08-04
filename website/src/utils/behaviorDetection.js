import { AvoidBehaviors } from "../data/tasks";
import { tasks } from "../data/tasks";
import { getProducts } from "../data/productInfo";

// 检测用户是否完成了avoid behavior
export const detectAvoidBehavior = (
  taskId,
  userActions,
  cartState,
  formData
) => {
  const taskIdStr = taskId.toString();

  // 根据不同的task ID和avoid behavior类型进行检测
  switch (taskIdStr) {
    case "1": {
      // SkipTask
      // 检查用户是否在QuestionMark中选择了skip
      return formData?.skipReason ? true : false;
    }

    case "2": {
      // DidNotClickAd
      // 检查用户是否点击了广告产品
      // 直接根据formData中的clickedAd字段来判断
      return !formData?.clickedAd; // 如果没有点击广告，则avoided为true
    }

    case "3": {
      // RemovedExtraProduct
      // 检查用户是否移除了额外商品
      const hasExtraProduct = cartState.items.some((item) => item.extra);
      const removedExtra =
        !hasExtraProduct ||
        cartState.items.filter((item) => item.extra).length === 0;
      return removedExtra;
    }

    case "4": {
      // SelectedStandardShipping
      // 检查用户是否选择了标准配送
      return formData?.shipping === "standard";
    }

    case "5": {
      // OptedOutManually
      // 检查用户是否手动取消了广告同意
      return formData?.adConsent === false;
    }

    case "6": {
      // ChoseOtherProducts - EmotionalOrSensoryManipulation
      // 检查用户是否选择了emotional为false的产品
      const products = getProducts(taskId);
      const emotionalProducts = products.filter(
        (product) => product.emotional === true
      );
      // 检查用户是否购买了emotional为true的产品
      const boughtEmotional = cartState.items.some((item) =>
        emotionalProducts.some((product) => item.id === product.id)
      );

      return !boughtEmotional;
    }

    case "7": {
      // LeftBoxUnchecked
      // 检查用户是否保持复选框未选中
      return formData?.trickQuestionConsent === false;
    }

    case "8": {
      // ChoseOtherProducts - SocialProof
      // 检查用户是否选择了socialProof为false的产品
      const products = getProducts(taskId);
      const socialProofProducts = products.filter(
        (product) => product.socialProof === true
      );

      // 检查用户是否购买了socialProof为true的产品
      const boughtSocialProof = cartState.items.some((item) =>
        socialProofProducts.some((product) => item.name.includes(product.name))
      );

      return !boughtSocialProof;
    }

    case "9": {
      // AlwaysSelectedYes
      // 检查用户是否总是选择Yes
      const yesSelections = userActions.filter(
        (action) =>
          action.event === "toggle" && action.details?.checked === true
      ).length;
      return yesSelections > 0;
    }

    case "10": {
      // SkipTask
      // 检查用户是否在QuestionMark中选择了skip
      return formData?.skipReason ? true : false;
    }

    case "11": {
      // ChoseOtherProducts - ScarcityAndPopularityClaims
      // 检查用户是否选择了scarcity为false的产品
      const products = getProducts(taskId);
      const scarcityProducts = products.filter(
        (product) => product.scarcity === true
      );

      // 检查用户是否购买了scarcity为true的产品
      const boughtScarcity = cartState.items.some((item) =>
        scarcityProducts.some((product) => item.name.includes(product.name))
      );

      return !boughtScarcity;
    }

    case "12": {
      // SkipTask
      // 检查用户是否在QuestionMark中选择了skip
      return formData?.skipReason ? true : false;
    }

    case "13": {
      // ChoseOtherProducts - Urgency
      // 检查用户是否选择了urgency为false的产品
      const products = getProducts(taskId);
      const urgencyProducts = products.filter(
        (product) => product.urgency === true
      );

      // 检查用户是否购买了urgency为true的产品
      const boughtUrgency = cartState.items.some((item) =>
        urgencyProducts.some((product) => item.name.includes(product.name))
      );

      return !boughtUrgency;
    }

    case "14": {
      // SelectedYes (取消订阅)
      // 检查用户是否完成了取消订阅
      return true; // 如果用户完成了取消订阅，说明avoided了
    }

    default:
      return true;
  }
};

// 获取当前task的avoid behavior类型
export const getAvoidBehaviorType = (taskId) => {
  const task = tasks.find((t) => t.id === parseInt(taskId));
  return task?.avoidBehavior || null;
};
