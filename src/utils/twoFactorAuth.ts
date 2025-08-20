export interface TwoFactorCode {
  code: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isUsed: boolean;
}

export const generate2FACode = (): string => {
  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const specialChars = '!@#$%&*';
  
  // Ensure at least one of each type
  const mustHave = [
    numbers[Math.floor(Math.random() * numbers.length)],
    letters[Math.floor(Math.random() * letters.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)]
  ];
  
  // Fill remaining positions with random characters from all sets
  const allChars = numbers + letters + specialChars;
  const remaining = [];
  for (let i = 0; i < 3; i++) {
    remaining.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }
  
  // Combine and shuffle
  const codeArray = [...mustHave, ...remaining];
  for (let i = codeArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [codeArray[i], codeArray[j]] = [codeArray[j], codeArray[i]];
  }
  
  return codeArray.join('');
};

/**
 * Store 2FA code in localStorage (in production, this would be sent via email/SMS)
 */
export const store2FACode = (email: string, code: string): void => {
  const twoFactorData: TwoFactorCode = {
    code,
    email,
    createdAt: Date.now(),
    expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes expiry
    attempts: 0,
    isUsed: false
  };
  
  // Store in localStorage (simulate email sending)
  const existingCodes = JSON.parse(localStorage.getItem('twoFactorCodes') || '{}');
  existingCodes[email] = twoFactorData;
  localStorage.setItem('twoFactorCodes', JSON.stringify(existingCodes));
  
  console.log(`🔐 2FA Code for ${email}: ${code}`);
};

/**
 * Verify 2FA code
 */
export const verify2FACode = (email: string, inputCode: string): { success: boolean; message: string } => {
  const existingCodes = JSON.parse(localStorage.getItem('twoFactorCodes') || '{}');
  const codeData = existingCodes[email];
  
  if (!codeData) {
    return { success: false, message: 'No verification code found. Please request a new code.' };
  }
  
  if (codeData.isUsed) {
    return { success: false, message: 'This verification code has already been used.' };
  }
  
  if (Date.now() > codeData.expiresAt) {
    return { success: false, message: 'Verification code has expired. Please request a new code.' };
  }
  
  codeData.attempts += 1;
  
  if (codeData.attempts > 3) {
    codeData.isUsed = true;
    localStorage.setItem('twoFactorCodes', JSON.stringify(existingCodes));
    return { success: false, message: 'Too many failed attempts. Please request a new code.' };
  }
  
  if (codeData.code !== inputCode) {
    localStorage.setItem('twoFactorCodes', JSON.stringify(existingCodes));
    return { success: false, message: `Invalid verification code. ${3 - codeData.attempts} attempts remaining.` };
  }
  
  // Mark code as used
  codeData.isUsed = true;
  localStorage.setItem('twoFactorCodes', JSON.stringify(existingCodes));
  
  return { success: true, message: 'Verification successful!' };
};

/**
 * Check if 2FA is required for an email
 */
export const is2FARequired = (email: string): boolean => {
  // In production, this would check user preferences or security requirements
  // For now, require 2FA for all @learninghub.edu emails
  return email.endsWith('@learninghub.edu') || email.includes('admin') || email.includes('instructor');
};

/**
 * Simulate sending 2FA code via email
 */
export const send2FACodeViaEmail = (email: string, code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate email sending delay
    setTimeout(() => {
      console.log(`📧 Sending 2FA code to ${email}: ${code}`);
      // In production, integrate with email service (SendGrid, AWS SES, etc.)
      resolve(true);
    }, 1000);
  });
};
