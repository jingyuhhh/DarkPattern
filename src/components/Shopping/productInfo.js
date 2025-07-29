const paperClips = [
  {
    image: "https://m.media-amazon.com/images/I/71LnlrzZZJL._AC_UL320_.jpg",
    name: "Paper Clips, 240pcs Medium Size Colored, PaperClips Assorted Colors, Paper Clips for Paperwork Office School and Personal Use",
    price: 3.99,
    store: "OfficeSuppliesPlus",
    storeSubscribed: true,
    id: 1,
    socialProof: true,
    scarcity: false,
    urgency: false,
  },
  {
    image: "https://m.media-amazon.com/images/I/71GaZ4v6BCL._AC_UL320_.jpg",
    name: 'PAPERPAL Paperclips for Office School & Personal Use, #1 Nonskid Paper Clip (1-1/2"), 600 Medium Paper Clips (6 Boxes of 100 Each)',
    price: 9.99,
    store: "PaperPal",
    storeSubscribed: false,
    id: 2,
    socialProof: false,
    scarcity: true,
    urgency: false,
  },
  {
    image: "https://m.media-amazon.com/images/I/81LylQWC4fL._AC_UL320_.jpg",
    name: "Colorful Paper Clips Binder Clips Set, 250pcs Assorted Size Colored Paperclips Large, Medium & Small Size, Paper Clips for Paperwork",
    price: 8.99,
    store: "ClipZone",
    storeSubscribed: false,
    id: 3,
    socialProof: false,
    scarcity: false,
    urgency: true,
  },
  {
    image: "https://m.media-amazon.com/images/I/7152XuAeUNL._AC_UL320_.jpg",
    name: "280 Pcs Large Paper Clips, 2 Inch Jumbo Silver Paperclips, Stainless Steel, for Office, School and Teacher Supplies",
    price: 6.99,
    store: "SteelClips",
    storeSubscribed: false,
    id: 4,
    socialProof: false,
    scarcity: false,
    urgency: false,
  },
  {
    image: "https://m.media-amazon.com/images/I/81zxqjUukrL._AC_UL320_.jpg",
    name: "750 Paper Clips Assorted Sizes Small, Medium and Large Paper Clips for Paperwork Ideal for Home, School and Office Use",
    price: 7.99,
    store: "KaratClips",
    storeSubscribed: false,
    id: 5,
    socialProof: false,
    scarcity: false,
    urgency: false,
  },
];

export const getProducts = (id) => {
  switch (id) {
    case "1":
      return paperClips;
    default:
      return paperClips;
  }
};
