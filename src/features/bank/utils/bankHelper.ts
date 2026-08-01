import { BANK_LOGOS, DEFAULT_BANK_LOGO } from "../constants/bankLogos";

export const getBankLogo = (logoFileName?: string) => {
    if (!logoFileName) return DEFAULT_BANK_LOGO;

    const key = logoFileName.trim().toLowerCase();

    // Kiểm tra tên file trong object mapping (acb.jpg, bidv.jpg...)
    return BANK_LOGOS[key] || DEFAULT_BANK_LOGO;
};