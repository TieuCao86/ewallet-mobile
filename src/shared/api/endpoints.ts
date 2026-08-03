export const API = {
  AUTH: "/api/auth",
  DASHBOARD: "/api/dashboard",
  WALLET: "/api/wallet",
  TRANSACTIONS: "/api/transactions",
  USER: "/api/user",

  // Bank API
  BANKS: "/api/banks",
  BANKS_MASTER: "/api/banks/master",
  BANKS_LINK: "/api/banks/link",

  // TopUp API
  TOPUP_INITIATE: "/api/topup/initiate",
  TOPUP_CONFIRM: "/api/topup/confirm",

  // OTP API
  OTP_SEND: "/api/otp/send",
  OTP_VERIFY: "/api/otp/verify",
} as const;