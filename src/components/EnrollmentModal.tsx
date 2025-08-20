import React, { useState } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  duration: string;
  level: string;
  language: string;
  description: string;
  originalPrice?: number;
}

interface EnrollmentStepProps {
  course: Course;
  onClose: () => void;
  onComplete: () => void;
}

type EnrollmentStep = 'course-info' | 'user-details' | 'payment' | 'confirmation' | 'success';

const EnrollmentModal: React.FC<EnrollmentStepProps> = ({ course, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>('course-info');
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    goals: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 'course-info', title: 'Course Overview', icon: '📚' },
    { id: 'user-details', title: 'Your Details', icon: '👤' },
    { id: 'payment', title: 'Payment', icon: '💳' },
    { id: 'confirmation', title: 'Confirmation', icon: '✓' },
    { id: 'success', title: 'Success', icon: '🎉' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNext = () => {
    const stepOrder: EnrollmentStep[] = ['course-info', 'user-details', 'payment', 'confirmation', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: EnrollmentStep[] = ['course-info', 'user-details', 'payment', 'confirmation', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setCurrentStep('success');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'course-info':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">by {course.instructor}</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                🎯 What You'll Learn
              </h4>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p>• Master all concepts required for {course.title}</p>
                <p>• Get hands-on practice with real examples</p>
                <p>• Access lifetime course materials and updates</p>
                <p>• Receive completion certificate</p>
                <p>• Join exclusive student community</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                <div className="font-semibold text-gray-900 dark:text-white">{course.duration}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
                <div className="font-semibold text-gray-900 dark:text-white">{course.level}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Language</div>
                <div className="font-semibold text-gray-900 dark:text-white">{course.language}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Price</div>
                <div className="font-semibold text-primary-600 dark:text-primary-400">
                  ₹{course.price.toLocaleString()}
                  {course.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                📱 Access on all devices • 🔄 Lifetime updates • 📞 24/7 support
              </p>
            </div>
          </div>
        );

      case 'user-details':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tell Us About Yourself
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Help us personalize your learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={userDetails.fullName}
                  onChange={(e) => setUserDetails({...userDetails, fullName: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="your.email@learninghub.edu"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Education Level
                </label>
                <select
                  id="education"
                  value={userDetails.education}
                  onChange={(e) => setUserDetails({...userDetails, education: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  title="Select your education level"
                >
                  <option value="">Select your education</option>
                  <option value="high-school">High School (12th)</option>
                  <option value="undergraduate">Undergraduate (B.Tech/B.Sc)</option>
                  <option value="graduate">Graduate (M.Tech/M.Sc)</option>
                  <option value="postgraduate">Postgraduate (PhD)</option>
                  <option value="working">Working Professional</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Previous Experience
              </label>
              <textarea
                id="experience"
                value={userDetails.experience}
                onChange={(e) => setUserDetails({...userDetails, experience: e.target.value})}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Tell us about your background in this subject..."
              />
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Learning Goals
              </label>
              <textarea
                id="goals"
                value={userDetails.goals}
                onChange={(e) => setUserDetails({...userDetails, goals: e.target.value})}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="What do you want to achieve with this course?"
              />
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Payment Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your preferred payment method
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label 
                  className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-300"
                  aria-label="Credit/Debit Card payment method"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">💳 Credit/Debit Card</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                  </div>
                </label>
                <label 
                  className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-300"
                  aria-label="UPI payment method"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">📱 UPI</div>
                    <div className="text-xs text-gray-500">PhonePe, Paytm, GPay</div>
                  </div>
                </label>
                <label 
                  className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-300"
                  aria-label="Net Banking payment method"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">🏦 Net Banking</div>
                    <div className="text-xs text-gray-500">All major banks</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Card Details Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white">Card Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      placeholder="123"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="holderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      id="holderName"
                      type="text"
                      value={paymentDetails.holderName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, holderName: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      placeholder="Name as on card"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Course Fee</span>
                  <span>₹{course.price.toLocaleString()}</span>
                </div>
                {course.originalPrice && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{(course.originalPrice - course.price).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(course.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 font-bold text-lg">
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span>₹{Math.round(course.price * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Confirm Your Enrollment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please review your details before completing the enrollment
              </p>
            </div>

            <div className="space-y-6">
              {/* Course Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">📚 Course Details</h4>
                <div className="space-y-2">
                  <div><strong>Course:</strong> {course.title}</div>
                  <div><strong>Instructor:</strong> {course.instructor}</div>
                  <div><strong>Duration:</strong> {course.duration}</div>
                  <div><strong>Level:</strong> {course.level}</div>
                </div>
              </div>

              {/* Student Details */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">👤 Your Details</h4>
                <div className="space-y-2">
                  <div><strong>Name:</strong> {userDetails.fullName}</div>
                  <div><strong>Email:</strong> {userDetails.email}</div>
                  <div><strong>Phone:</strong> {userDetails.phone}</div>
                  {userDetails.education && <div><strong>Education:</strong> {userDetails.education}</div>}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4">💳 Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-lg">₹{Math.round(course.price * 1.18).toLocaleString()}</span>
                  </div>
                  <div>Payment Method: {paymentMethod.toUpperCase()}</div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" required />
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">
                    I agree to the <button type="button" className="underline hover:text-yellow-900 dark:hover:text-yellow-100" onClick={() => alert('Terms and Conditions: By enrolling, you agree to our course policies and payment terms.')}>Terms and Conditions</button> and understand that this enrollment is final. 
                    I will have lifetime access to this course content.
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <div className="text-4xl">🎉</div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Enrollment Successful!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome to {course.title}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-left">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-4">🚀 What's Next?</h4>
              <div className="space-y-3 text-sm text-green-800 dark:text-green-200">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Check your email for course access details</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Visit your dashboard to start learning</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Download the mobile app for learning on-the-go</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Join the exclusive student community</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => alert('Redirecting to course dashboard...')}
              >
                Start Learning Now
              </button>
              <button 
                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={onComplete}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 'user-details':
        return !userDetails.fullName || !userDetails.email || !userDetails.phone;
      case 'payment':
        return !paymentMethod;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Course Enrollment
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close enrollment modal"
              title="Close enrollment modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {index < currentStepIndex ? '✓' : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 'course-info' || currentStep === 'success'}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <div className="space-x-4">
            {currentStep === 'confirmation' && (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Complete Payment'
                )}
              </button>
            )}

            {currentStep !== 'confirmation' && currentStep !== 'success' && (
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 'payment' ? 'Review Order' : 'Continue'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
