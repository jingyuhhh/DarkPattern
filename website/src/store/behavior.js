import { createSlice } from "@reduxjs/toolkit";

const behaviorSlice = createSlice({
  name: "behavior",
  initialState: {
    avoidedBehaviors: {}, // 存储每个task的avoid behavior状态
  },
  reducers: {
    setAvoidedBehavior: (state, action) => {
      const { taskId, avoided } = action.payload;
      state.avoidedBehaviors[taskId] = avoided;
    },
    resetBehavior: (state) => {
      state.avoidedBehaviors = {};
    },
  },
});

export const { setAvoidedBehavior, resetBehavior } = behaviorSlice.actions;
export default behaviorSlice.reducer;
