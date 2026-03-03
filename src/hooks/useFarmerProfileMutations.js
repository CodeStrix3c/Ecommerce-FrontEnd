import { useMutation, useQuery } from "@tanstack/react-query";
import {
  saveProfileSection,
  saveAddressSection,
  saveEducationSection,
  saveProfessionSection,
  verifyUserOtp,
  getUserProfile,
  getProfileSection,
  getAddressSection,
  getEducationSection,
  getProfessionSection,
  login,
  verifyUserEmailandPhone,
  sendOtp,
} from "@/services/farmerProfileService";

// 🔐 LOGIN
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};

// 🧍 PROFILE SECTION
export const useProfileMutation = () =>
  useMutation({
    mutationFn: saveProfileSection,
  });

export const useProfileQuery = (userId) =>
  useQuery({
    queryKey: ["profileSection", userId],
    queryFn: () => getProfileSection(userId),
    enabled: !!userId,
  });

//send otp
export const useSendOtpMutation = () =>
  useMutation({
    mutationFn: sendOtp,
  });
// 🔢 OTP VERIFY
export const useOtpVerifyMutation = () =>
  useMutation({
    mutationFn: verifyUserOtp,
  });

export const useEmailandPhoneNumberMutation = () =>
  useMutation({
    mutationFn: verifyUserEmailandPhone,
  });

// 🏠 ADDRESS SECTION
export const useAddressMutation = () =>
  useMutation({
    mutationFn: saveAddressSection,
  });

export const useAddressQuery = (profileId) =>
  useQuery({
    queryKey: ["addressSection", profileId],
    queryFn: () => getAddressSection(profileId),
    enabled: !!profileId,
  });

// 🎓 EDUCATION SECTION
export const useEducationMutation = () =>
  useMutation({
    mutationFn: saveEducationSection,
  });

export const useEducationQuery = (profileId) =>
  useQuery({
    queryKey: ["educationSection", profileId],
    queryFn: () => getEducationSection(profileId),
    enabled: !!profileId,
  });

// 💼 PROFESSION SECTION
export const useProfessionMutation = () =>
  useMutation({
    mutationFn: saveProfessionSection,
  });

export const useProfessionQuery = (profileId) =>
  useQuery({
    queryKey: ["professionSection", profileId],
    queryFn: () => getProfessionSection(profileId),
    enabled: !!profileId,
  });
