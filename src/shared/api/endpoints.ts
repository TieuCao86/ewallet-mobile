export const API = {
  AUTH: "/api/auth",
  DASHBOARD: "/api/dashboard",
  WALLET: "/api/wallet",
  TRANSACTIONS: "/api/transactions",
  USER: "/api/users",

  // Bank API
  BANKS: "/api/banks",
  BANKS_MASTER: "/api/banks/master",
  BANKS_LINK: "/api/banks/link",

  // TopUp API
  TOPUP_INITIATE: "/api/topup/initiate",
  TOPUP_CONFIRM: "/api/topup/confirm",

  // Withdraw API
  WITHDRAW_INITIATE: "/api/withdraw/initiate",
  WITHDRAW_CONFIRM: "/api/withdraw/confirm",

  // OTP API
  OTP_SEND: "/api/otp/send",
  OTP_VERIFY: "/api/otp/verify",

  // PIN API
  PIN_CREATE: "/api/pins",
  PIN_CHANGE: "/api/pins",
  PIN_VERIFY: "/api/pins/verify",

} as const;