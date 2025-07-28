export const DarkPatternType = {
  AddingSteps: "Adding Steps",
  BaitAndSwitch: "Bait and Switch",
  HidingInformation: "Hiding Information",
  ManipulatingVisualChoiceArchitecture:
    "Manipulating Visual Choice Architecture",
  BadDefault: "Bad Default",
  EmotionalOrSensoryManipulation: "Emotional or Sensory Manipulation",
  TrickQuestions: "Trick Questions",
  HiddenInformation: "Hidden Information",
  Nagging: "Nagging",
  ForcedCommunicationOrDisclosure: "Forced Communication or Disclosure",
  ScarcityAndPopularityClaims: "Scarcity and Popularity Claims",
  SocialProof: "Social Proof",
  Urgency: "Urgency",
  Shaming: "Shaming",
};

export const TaskType = {
  BuyProduct: "Buy Product",
  CancelMembership: "Cancel Membership",
  SignSubscription: "Sign Subscription",
  CancelSubscription: "Cancel Subscription",
};

export const tasks = [
  {
    id: 1,
    title: "Cancel premium membership",
    taskType: TaskType.CancelMembership,
    type: DarkPatternType.AddingSteps,
  },
  {
    id: 2,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.BaitAndSwitch,
  },
  {
    id: 3,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.HidingInformation,
  },
  {
    id: 4,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ManipulatingVisualChoiceArchitecture,
  },
  {
    id: 5,
    title: "Sign up for subscription",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.BadDefault,
  },
  {
    id: 6,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.EmotionalOrSensoryManipulation,
  },
  {
    id: 7,
    title: "Sign up for subscription",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.TrickQuestions,
  },
  {
    id: 8,
    title: "Sign up for subscription",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.HiddenInformation,
  },
  {
    id: 9,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.Nagging,
  },
  {
    id: 10,
    title: "Sign up for subscription",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.ForcedCommunicationOrDisclosure,
  },
  {
    id: 11,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ScarcityAndPopularityClaims,
  },
  {
    id: 12,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.SocialProof,
  },
  {
    id: 13,
    title: "Buy a specific product",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.Urgency,
  },
  {
    id: 14,
    title: "Cancel subscription",
    taskType: TaskType.CancelSubscription,
    type: DarkPatternType.Shaming,
  },
];
