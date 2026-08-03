import axiosClient from "@/shared/api/axiosClient";
import { API } from "@/shared/api/endpoints";
import { SendOtpRequest, VerifyOtpRequest } from "../types/otp";

const otpService = {
  sendOtp(data: SendOtpRequest) {
    return axiosClient.post(API.OTP_SEND, data);
  },

  verifyOtp(data: VerifyOtpRequest) {
    return axiosClient.post(API.OTP_VERIFY, data);
  },
};

export default otpService;