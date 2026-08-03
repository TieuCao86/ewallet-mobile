import { useMutation } from "@tanstack/react-query";
import otpService from "../services/otp.service";


export const useVerifyOtp = () => {

    return useMutation({

        mutationFn: otpService.verifyOtp

    });
};