import { useMutation } from "@tanstack/react-query";
import otpService from "../services/otp.service";

export const useSendOtp = () => {

    return useMutation({
        mutationFn: otpService.sendOtp

    });
};