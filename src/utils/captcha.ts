export interface CaptchaData {
  id: string;
  challenge: string;
  answer: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isUsed: boolean;
}

/**
 * Generate a 6-digit CAPTCHA with only numbers
 */
export const generateCaptcha = (): { challenge: string; answer: string; id: string } => {
  try {
    const numbers = '0123456789';
    
    // Generate 6 random numbers
    const answerArray = [];
    for (let i = 0; i < 6; i++) {
      answerArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    
    const answer = answerArray.join('');
    const id = `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create visual challenge (distorted text representation)
    const challenge = createVisualChallenge(answer);
    
    return { challenge, answer, id };
  } catch (error) {
    console.error('Error generating CAPTCHA:', error);
    // Fallback to simple generation
    const answer = Math.floor(100000 + Math.random() * 900000).toString();
    const id = `captcha_${Date.now()}_fallback`;
    return { challenge: answer, answer, id };
  }
};

/**
 * Create a visual text-based CAPTCHA challenge with only numbers
 */
const createVisualChallenge = (text: string): string => {
  // Simple visual challenge with spacing and occasional styling
  return text.split('').map((char, index) => {
    // Add some spacing between characters for readability
    const spacing = index < text.length - 1 ? ' ' : '';
    
    // Occasionally add some visual noise (simple characters only)
    const noise = Math.random() > 0.9 ? '.' : '';
    
    return char + noise + spacing;
  }).join('');
};

/**
 * Store CAPTCHA in session storage
 */
export const storeCaptcha = (captchaData: CaptchaData): void => {
  const existingCaptchas = JSON.parse(sessionStorage.getItem('captchas') || '{}');
  existingCaptchas[captchaData.id] = captchaData;
  sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
  
  console.log(`� CAPTCHA generated (6 numbers only): ${captchaData.answer}`);
};

/**
 * Verify CAPTCHA input
 */
export const verifyCaptcha = (captchaId: string, userInput: string): { success: boolean; message: string } => {
  const existingCaptchas = JSON.parse(sessionStorage.getItem('captchas') || '{}');
  const captchaData = existingCaptchas[captchaId];
  
  if (!captchaData) {
    return { success: false, message: 'CAPTCHA not found. Please refresh and try again.' };
  }
  
  if (captchaData.isUsed) {
    return { success: false, message: 'This CAPTCHA has already been used.' };
  }
  
  if (Date.now() > captchaData.expiresAt) {
    return { success: false, message: 'CAPTCHA has expired. Please refresh to get a new one.' };
  }
  
  captchaData.attempts += 1;
  
  if (captchaData.attempts > 3) {
    captchaData.isUsed = true;
    sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
    return { success: false, message: 'Too many failed attempts. Please refresh for a new CAPTCHA.' };
  }
  
  // Case-sensitive comparison
  if (captchaData.answer !== userInput.trim()) {
    sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
    return { 
      success: false, 
      message: `Incorrect CAPTCHA. ${3 - captchaData.attempts} attempts remaining.` 
    };
  }
  
  // Mark as used
  captchaData.isUsed = true;
  sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
  
  return { success: true, message: 'CAPTCHA verified successfully!' };
};

/**
 * Create and store a new CAPTCHA
 */
export const createCaptcha = (): CaptchaData => {
  const { challenge, answer, id } = generateCaptcha();
  
  const captchaData: CaptchaData = {
    id,
    challenge,
    answer,
    createdAt: Date.now(),
    expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes expiry
    attempts: 0,
    isUsed: false
  };
  
  storeCaptcha(captchaData);
  return captchaData;
};

/**
 * Refresh CAPTCHA (create new one and remove old)
 */
export const refreshCaptcha = (oldCaptchaId?: string): CaptchaData => {
  if (oldCaptchaId) {
    const existingCaptchas = JSON.parse(sessionStorage.getItem('captchas') || '{}');
    delete existingCaptchas[oldCaptchaId];
    sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
  }
  
  return createCaptcha();
};

/**
 * Clean up expired CAPTCHAs
 */
export const cleanupExpiredCaptchas = (): void => {
  const existingCaptchas = JSON.parse(sessionStorage.getItem('captchas') || '{}');
  const now = Date.now();
  
  Object.keys(existingCaptchas).forEach(id => {
    if (existingCaptchas[id].expiresAt < now) {
      delete existingCaptchas[id];
    }
  });
  
  sessionStorage.setItem('captchas', JSON.stringify(existingCaptchas));
};
