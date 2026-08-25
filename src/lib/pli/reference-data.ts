import { PolicyType } from './types';

export interface CalibrationPoint {
  age: number; // Effective Age
  duration: number; // Policy Term / Duration
  premium: number; // Monthly Base Premium for ₹1,00,000 SA
}

export const CALIBRATION_DATASET: Record<PolicyType, CalibrationPoint[]> = {
  ENDOWMENT: [
    // Age 19 dataset
    { age: 19, duration: 16, premium: 520 },
    { age: 19, duration: 21, premium: 380 },
    { age: 19, duration: 26, premium: 300 },
    { age: 19, duration: 31, premium: 240 },
    { age: 19, duration: 36, premium: 200 },
    { age: 19, duration: 39, premium: 180 },
    { age: 19, duration: 41, premium: 180 },
    // Age 30 dataset
    { age: 30, duration: 5, premium: 1720 },
    { age: 30, duration: 10, premium: 840 },
    { age: 30, duration: 15, premium: 560 },
    { age: 30, duration: 20, premium: 400 },
    { age: 30, duration: 25, premium: 320 },
    { age: 30, duration: 28, premium: 280 },
    { age: 30, duration: 30, premium: 260 },
  ],
  ANTICIPATED_ENDOWMENT: [
    { age: 19, duration: 15, premium: 655 },
    { age: 19, duration: 20, premium: 500 },
    { age: 30, duration: 15, premium: 660 },
    { age: 30, duration: 20, premium: 500 },
  ],
  CHILDREN: [
    { age: 5, duration: 13, premium: 813 },
    { age: 5, duration: 14, premium: 767 },
    { age: 5, duration: 15, premium: 727 },
    { age: 5, duration: 16, premium: 693 },
    { age: 5, duration: 17, premium: 663 },
    { age: 5, duration: 18, premium: 636 },
    { age: 5, duration: 19, premium: 613 },
    { age: 5, duration: 20, premium: 592 },
  ],
  CONVERTIBLE_WHOLE_LIFE: [
    { age: 19, duration: 16, premium: 395 },
    { age: 19, duration: 21, premium: 289 },
    { age: 19, duration: 26, premium: 228 },
    { age: 19, duration: 31, premium: 182 },
    { age: 19, duration: 36, premium: 152 },
    { age: 19, duration: 39, premium: 140 },
    { age: 19, duration: 41, premium: 140 },
    { age: 30, duration: 30, premium: 200 },
  ],
  WHOLE_LIFE: [
    { age: 19, duration: 16, premium: 395 },
    { age: 19, duration: 21, premium: 289 },
    { age: 19, duration: 26, premium: 228 },
    { age: 19, duration: 31, premium: 182 },
    { age: 19, duration: 36, premium: 160 },
    { age: 19, duration: 39, premium: 140 },
    { age: 19, duration: 41, premium: 140 },
    { age: 30, duration: 25, premium: 220 },
    { age: 30, duration: 28, premium: 220 },
    { age: 30, duration: 30, premium: 200 },
  ],
  JOINT_LIFE: [
    { age: 29, duration: 6, premium: 1590 },
    { age: 29, duration: 7, premium: 1360 },
    { age: 29, duration: 8, premium: 1180 },
    { age: 29, duration: 9, premium: 1050 },
    { age: 29, duration: 10, premium: 940 },
    { age: 29, duration: 11, premium: 840 },
    { age: 29, duration: 12, premium: 770 },
    { age: 29, duration: 13, premium: 700 },
    { age: 29, duration: 14, premium: 650 },
    { age: 29, duration: 15, premium: 600 },
    { age: 29, duration: 16, premium: 560 },
    { age: 29, duration: 17, premium: 520 },
    { age: 29, duration: 18, premium: 480 },
    { age: 29, duration: 19, premium: 450 },
    { age: 29, duration: 20, premium: 430 },
  ],
};
