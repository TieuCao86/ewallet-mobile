import { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Nhận tiền từ Nguyễn Văn A",
    amount: 2600000,
    type: "IN",
    createdAt: "18/07/2026 09:00",
  },
  {
    id: "2",
    title: "Thanh toán Shopee",
    amount: 500000,
    type: "OUT",
    createdAt: "18/07/2026 10:15",
  },
  {
    id: "3",
    title: "Nạp tiền",
    amount: 1000000,
    type: "IN",
    createdAt: "17/07/2026 14:20",
  },
  {
    id: "4",
    title: "Chuyển khoản MB Bank",
    amount: 1200000,
    type: "OUT",
    createdAt: "17/07/2026 18:45",
  },
  {
    id: "5",
    title: "Hoàn tiền Lazada",
    amount: 350000,
    type: "IN",
    createdAt: "16/07/2026 11:10",
  },
];