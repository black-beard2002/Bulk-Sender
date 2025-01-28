import  { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from 'framer-motion';
import { faArrowRight, faCheck, faClose, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const PasswordResetPopup = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to send verification code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(2);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to verify code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to update password
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (onSubmit) {
      await onSubmit(email, newPassword);
    }
    setLoading(false);
    setStep(4);
    // Auto close after 2 seconds
    setTimeout(() => {
      onClose();
      setStep(1); // Reset to first step for next time
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6  max-w-md relative w-96 md:w-full"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faClose} className=' text-white'/>
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="email-step"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailSubmit}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faEnvelope} className="mx-auto mb-2 text-blue-500 w-10 h-10"  />
                <h2 className="text-xl font-semibold">Reset Password</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Enter your email to receive a verification code
                </p>
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 bg-black/90 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Code</span>
                    <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 text-white'/>
                  </>
                )}
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="verification-step"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerificationSubmit}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Enter Verification Code</h2>
                <p className="text-gray-600 text-sm mt-1">
                  We sent a code to {email}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                  className="w-full px-4 py-2 bg-black/90  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify Code</span>
                    <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 text-white'/>
                  </>
                )}
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form
              key="password-step"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faLock} className="mx-auto mb-2 text-blue-500 w-10 h-10" />
                <h2 className="text-xl font-semibold">Set New Password</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Enter your new password
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full px-4 py-2 bg-black/90  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Update Password</span>
                    <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 text-white'/>
                  </>
                )}
              </button>
            </motion.form>
          )}

          {step === 4 && (
            <motion.div
              key="success-step"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-white w-10 h-10"/>
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl font-semibold text-gray-800"
              >
                Password Updated!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 mt-2"
              >
                You can now sign in with your new password
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PasswordResetPopup;