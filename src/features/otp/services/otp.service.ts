export enum OtpType {
  REGISTER = "REGISTER",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  TOP_UP = "TOP_UP",
  WITHDRAW = "WITHDRAW",
  TRANSFER = "TRANSFER",
}

class OtpService {
  async sendOtp(type: OtpType): Promise<void> {
    // Mock gửi OTP
    console.log("Mock send OTP:", type);
  }
}

export default new OtpService();