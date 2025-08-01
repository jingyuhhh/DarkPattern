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
    title:
      "You are currently a premium member of the shopping website, but you no longer wish to continue. Navigate through the account information and cancel your premium membership subscription.",
    taskType: TaskType.CancelMembership,
    type: DarkPatternType.AddingSteps,
  },
  {
    id: 2,
    title:
      "You need to buy a pack of trash bags for your kitchen from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.BaitAndSwitch,
  },
  {
    id: 3,
    title:
      "You need to buy a pack of paper towels for home use from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.HidingInformation,
  },
  {
    id: 4,
    title:
      "You need to buy packing tape for your home office from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ManipulatingVisualChoiceArchitecture,
  },
  {
    id: 5,
    title: "Subscribe to DoraemonDiaries on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.BadDefault,
  },
  {
    id: 6,
    title:
      "Purchase a bottle of Vitamin C supplements from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.EmotionalOrSensoryManipulation,
  },
  {
    id: 7,
    title: "Subscribe to CornerMuse on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.TrickQuestions,
  },
  {
    id: 8,
    title: "Buy a pack of disposable paper plates from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.SocialProof,
  },
  {
    id: 9,
    title:
      "Purchase soldering wire for your electrical repair project from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.Nagging,
  },
  {
    id: 10,
    title: "Subscribe to HiddenHandsStudio on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.ForcedCommunicationOrDisclosure,
  },
  {
    id: 11,
    title: "Purchase a pack of staples from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ScarcityAndPopularityClaims,
  },
  {
    id: 12,
    title: "Subscribe to ScreamEchoes on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.HiddenInformation,
  },

  {
    id: 13,
    title: "Purchase a set of paperclips from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.Urgency,
  },
  {
    id: 14,
    title: "Cancel your subscription of CornerMuse on social media.",
    taskType: TaskType.CancelSubscription,
    type: DarkPatternType.Shaming,
  },
];

export const getTasks = (userID) => {
  const n = tasks.length;
  const userIndex = parseInt(userID, 10);
  return tasks.map((_, i) => tasks[(i + userIndex) % n]);
};
