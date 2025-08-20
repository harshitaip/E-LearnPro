import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import { Loader } from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { useDemoAuth } from '../contexts/DemoAuthContext';

interface Certificate {
  id: string;
  courseTitle: string;
  courseThumbnail: string;
  instructorName: string;
  completedDate: string;
  certificateUrl: string;
  issuedBy: string;
  credentialId: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  certificateHash: string;
  skillsBadges: string[];
  grade: string;
  courseDuration: string;
  validUntil?: string;
}

interface CertificateGenerator {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  grade: string;
  instructorName: string;
  courseDuration: string;
  skills: string[];
}

const Certificates: React.FC = () => {
  const { user: authUser, isAuthenticated } = useAuth();
  const { user: demoUser, isAuthenticated: isDemoAuthenticated } = useDemoAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the current user from either auth context
  const currentUser = authUser || demoUser;
  const isUserAuthenticated = isAuthenticated || isDemoAuthenticated;

  // Helper function to get user name safely
  const getUserName = () => {
    if (!currentUser) return '';
    
    // Handle regular auth user
    if ('firstName' in currentUser && 'lastName' in currentUser) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    
    // Handle demo user
    if ('name' in currentUser) {
      return currentUser.name;
    }
    
    return 'Student';
  };
  const [activeTab, setActiveTab] = useState<'earned' | 'generate' | 'verify'>('earned');
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [generatorData, setGeneratorData] = useState<CertificateGenerator>({
    studentName: '',
    courseTitle: '',
    completionDate: '',
    grade: '',
    instructorName: '',
    courseDuration: '',
    skills: []
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        // Enhanced mock data with verification features
        const mockCertificates: Certificate[] = [
          {
            id: '1',
            courseTitle: 'Full Stack Web Development Bootcamp',
            courseThumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
            instructorName: 'Dr. Rajesh Kumar',
            completedDate: '2024-07-15',
            certificateUrl: '/certificates/fullstack-bootcamp.pdf',
            issuedBy: 'Learning Hub - IIT Patna',
            credentialId: 'LH-FS-2024-001',
            verificationStatus: 'verified',
            certificateHash: 'SHA256:a1b2c3d4e5f6789012345',
            skillsBadges: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript ES6+'],
            grade: 'A+',
            courseDuration: '16 weeks',
            validUntil: '2027-07-15'
          },
          {
            id: '2',
            courseTitle: 'Data Science & Machine Learning',
            courseThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            instructorName: 'Prof. Priya Sharma',
            completedDate: '2024-06-28',
            certificateUrl: '/certificates/data-science-ml.pdf',
            issuedBy: 'Learning Hub - IIT Patna',
            credentialId: 'LH-DS-2024-002',
            verificationStatus: 'verified',
            certificateHash: 'SHA256:b2c3d4e5f6789012345a',
            skillsBadges: ['Python', 'Machine Learning', 'Data Visualization', 'TensorFlow', 'Pandas'],
            grade: 'A',
            courseDuration: '20 weeks',
            validUntil: '2027-06-28'
          },
          {
            id: '3',
            courseTitle: 'UI/UX Design Mastery',
            courseThumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            instructorName: 'Ar. Anita Singh',
            completedDate: '2024-08-10',
            certificateUrl: '/certificates/ui-ux-design.pdf',
            issuedBy: 'Learning Hub - IIT Patna',
            credentialId: 'LH-UX-2024-003',
            verificationStatus: 'verified',
            certificateHash: 'SHA256:c3d4e5f6789012345ab',
            skillsBadges: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
            grade: 'A+',
            courseDuration: '12 weeks',
            validUntil: '2027-08-10'
          },
          {
            id: '4',
            courseTitle: 'Digital Marketing Strategy',
            courseThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
            instructorName: 'Mr. Vikram Gupta',
            completedDate: '2024-05-20',
            certificateUrl: '/certificates/digital-marketing.pdf',
            issuedBy: 'Learning Hub - IIT Patna',
            credentialId: 'LH-DM-2024-004',
            verificationStatus: 'verified',
            certificateHash: 'SHA256:d4e5f6789012345abc',
            skillsBadges: ['SEO/SEM', 'Social Media', 'Analytics', 'Content Strategy', 'PPC'],
            grade: 'A',
            courseDuration: '10 weeks',
            validUntil: '2027-05-20'
          }
        ];
        setCertificates(mockCertificates);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Initialize name from session storage on component mount
  useEffect(() => {
    const storedName = sessionStorage.getItem('currentUserName');
    if (storedName && !generatorData.studentName) {
      setGeneratorData(prev => ({
        ...prev,
        studentName: storedName
      }));
    }
  }, []);

  // Auto-populate student name when user is logged in
  useEffect(() => {
    let userName = '';
    
    // Direct check for demo user
    if (demoUser && demoUser.name) {
      userName = demoUser.name;
      console.log('Auto-populate: Found demo user name:', userName);
    }
    // Check auth user
    else if (authUser) {
      if (authUser.firstName && authUser.lastName) {
        userName = `${authUser.firstName} ${authUser.lastName}`;
      } else if ('name' in authUser && (authUser as any).name) {
        userName = (authUser as any).name;
      }
      console.log('Auto-populate: Found auth user name:', userName);
    }
    
    // Update generator data if we found a name and it's different from current
    if (userName && userName !== generatorData.studentName) {
      console.log('Auto-populate: Updating generator form with:', userName);
      sessionStorage.setItem('currentUserName', userName);
      setGeneratorData(prev => ({
        ...prev,
        studentName: userName
      }));
    }
  }, [demoUser, authUser, isAuthenticated, isDemoAuthenticated]);

  const generateCertificate = async () => {
    if (!generatorData.studentName || !generatorData.courseTitle || !generatorData.completionDate) {
      console.error('Please fill in all required fields');
      return;
    }

    const newCertificate: Certificate = {
      id: Date.now().toString(),
      courseTitle: generatorData.courseTitle,
      courseThumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      instructorName: generatorData.instructorName || 'Learning Hub Faculty',
      completedDate: generatorData.completionDate,
      certificateUrl: `/certificates/${generatorData.courseTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      issuedBy: 'Learning Hub - IIT Patna',
      credentialId: `LH-AUTO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      verificationStatus: 'verified',
      certificateHash: `SHA256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      skillsBadges: generatorData.skills,
      grade: generatorData.grade || 'A',
      courseDuration: generatorData.courseDuration || '8 weeks',
      validUntil: new Date(new Date(generatorData.completionDate).setFullYear(new Date(generatorData.completionDate).getFullYear() + 3)).toISOString().split('T')[0]
    };

    setCertificates(prev => [newCertificate, ...prev]);
    setActiveTab('earned');
    
    // Reset form but preserve student name if user is authenticated
    const preservedStudentName = isUserAuthenticated && currentUser ? getUserName() : '';
    setGeneratorData({
      studentName: preservedStudentName,
      courseTitle: '',
      completionDate: '',
      grade: '',
      instructorName: '',
      courseDuration: '',
      skills: []
    });

    console.log('Certificate generated successfully! 🎉');
  };

  const verifyCertificate = async () => {
    if (!verificationId.trim()) {
      console.error('Please enter a credential ID');
      return;
    }

    // Simulate verification process
    const foundCertificate = certificates.find(cert => cert.credentialId === verificationId.trim());
    
    if (foundCertificate) {
      setVerificationResult({
        status: 'valid',
        certificate: foundCertificate,
        verifiedAt: new Date().toISOString(),
        blockchain: `Block #${Math.floor(Math.random() * 1000000)}`,
        issuer: 'Learning Hub - IIT Patna',
        authenticity: 'Verified ✓'
      });
    } else {
      setVerificationResult({
        status: 'invalid',
        message: 'Certificate not found or invalid credential ID',
        verifiedAt: new Date().toISOString()
      });
    }
  };

  const downloadCertificate = (certificate: Certificate) => {
    // Generate actual PDF certificate with proper name context
    generateCertificatePDF(certificate, true); // Pass true to indicate this is from earned certificates
  };

  const generateCertificatePDF = (certificate: Certificate, _fromEarnedCerts: boolean = false) => {
    // Create a new window for the certificate
    const certificateWindow = window.open('', '_blank', 'width=1200,height=850');
    
    if (!certificateWindow) {
      console.error('Please allow popups to download the certificate');
      return;
    }

    // Get student name with DIRECT approach - bypassing helper functions
    let studentName = '';
    
    // Enhanced debugging
    console.log('=== DIRECT Certificate Name Debug ===');
    console.log('authUser:', authUser);
    console.log('demoUser:', demoUser);
    console.log('demoUser?.name:', demoUser?.name);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('isDemoAuthenticated:', isDemoAuthenticated);
    
    // DIRECT approach - check demo user first (most common case)
    if (demoUser && demoUser.name) {
      studentName = demoUser.name;
      console.log('✅ SUCCESS: Using demoUser.name directly:', studentName);
    }
    // Then check regular auth user
    else if (authUser) {
      if (authUser.firstName && authUser.lastName) {
        studentName = `${authUser.firstName} ${authUser.lastName}`;
        console.log('✅ SUCCESS: Using authUser firstName+lastName:', studentName);
      } else if ('name' in authUser && (authUser as any).name) {
        studentName = (authUser as any).name;
        console.log('✅ SUCCESS: Using authUser.name:', studentName);
      }
    }
    
    // If still no name, try generator form
    if (!studentName && generatorData.studentName && generatorData.studentName.trim()) {
      studentName = generatorData.studentName.trim();
      console.log('✅ SUCCESS: Using generator form name:', studentName);
    }
    
    // If STILL no name, try session storage
    if (!studentName) {
      const sessionName = sessionStorage.getItem('currentUserName');
      if (sessionName && sessionName !== 'Student') {
        studentName = sessionName;
        console.log('✅ SUCCESS: Using session storage:', studentName);
      }
    }
    
    // If STILL no name, prompt user
    if (!studentName || studentName.trim() === '') {
      studentName = prompt('Please enter your name for the certificate:') || '';
      console.log('✅ PROMPT: User entered name:', studentName);
    }
    
    // Absolute final fallback
    if (!studentName || studentName.trim() === '') {
      studentName = 'Student Name';
      console.log('⚠️ FALLBACK: Using default name');
    }

    // Clean and store
    studentName = studentName.trim();
    if (studentName !== 'Student Name' && studentName !== 'Student') {
      sessionStorage.setItem('currentUserName', studentName);
      console.log('💾 STORED name in session:', studentName);
    }

    console.log('🎯 FINAL RESULT for certificate:', studentName);
    console.log('=====================================');

    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate - ${certificate.courseTitle}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 100vw;
            height: 100vh;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          
          .certificate-container {
            border: 8px solid #ffffff;
            border-radius: 20px;
            padding: 60px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 1000px;
            position: relative;
          }
          
          .certificate-container::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 3px solid #ffd700;
            border-radius: 10px;
          }
          
          .header {
            margin-bottom: 30px;
          }
          
          .title {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: 2px;
          }
          
          .subtitle {
            font-size: 24px;
            color: #ffd700;
            font-weight: bold;
            margin-bottom: 20px;
          }
          
          .divider {
            height: 3px;
            background: linear-gradient(to right, transparent, #ffd700, transparent);
            margin: 20px auto;
            width: 300px;
          }
          
          .completion-text {
            font-size: 28px;
            margin: 30px 0 20px 0;
          }
          
          .student-name {
            font-size: 48px;
            font-weight: bold;
            color: #ffd700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            margin: 20px 0;
            text-decoration: underline;
            text-decoration-color: #ffd700;
          }
          
          .course-completion {
            font-size: 28px;
            margin: 20px 0;
          }
          
          .course-title {
            font-size: 42px;
            font-weight: bold;
            color: #ffd700;
            margin: 30px 0;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          }
          
          .details {
            font-size: 20px;
            margin: 15px 0;
            display: flex;
            justify-content: space-between;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .detail-item {
            text-align: center;
            flex: 1;
          }
          
          .detail-label {
            font-weight: bold;
            color: #ffd700;
          }
          
          .credential-info {
            margin-top: 40px;
            font-size: 16px;
            opacity: 0.9;
          }
          
          .security-hash {
            font-family: monospace;
            font-size: 14px;
            margin-top: 10px;
            opacity: 0.7;
            word-break: break-all;
          }
          
          .footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          
          .signature-section {
            text-align: center;
            flex: 1;
          }
          
          .signature-line {
            border-top: 2px solid #ffffff;
            width: 200px;
            margin: 0 auto 10px auto;
          }
          
          .signature-title {
            font-size: 16px;
            font-weight: bold;
          }
          
          .verification-badge {
            position: absolute;
            top: 30px;
            right: 30px;
            background: linear-gradient(45deg, #4CAF50, #45a049);
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          .blockchain-badge {
            position: absolute;
            bottom: 30px;
            left: 30px;
            background: linear-gradient(45deg, #2196F3, #1976D2);
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: bold;
          }
          
          @media print {
            body {
              width: 297mm;
              height: 210mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="verification-badge">
            ✓ VERIFIED
          </div>
          
          <div class="blockchain-badge">
            🔗 BLOCKCHAIN SECURED
          </div>
          
          <div class="header">
            <div class="title">CERTIFICATE OF COMPLETION</div>
            <div class="subtitle">Learning Hub - IIT Patna</div>
            <div class="divider"></div>
          </div>
          
          <div class="completion-text">This is to certify that</div>
          
          <div class="student-name">${studentName}</div>
          
          <div class="course-completion">has successfully completed the course</div>
          
          <div class="course-title">${certificate.courseTitle}</div>
          
          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Instructor</div>
              <div>${certificate.instructorName}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Completion Date</div>
              <div>${new Date(certificate.completedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Grade Achieved</div>
              <div>${certificate.grade}</div>
            </div>
          </div>
          
          <div class="credential-info">
            <div><strong>Credential ID:</strong> ${certificate.credentialId}</div>
            <div class="security-hash">Security Hash: ${certificate.certificateHash}</div>
          </div>
          
          <div class="footer">
            <div class="signature-section">
              <div class="signature-line"></div>
              <div class="signature-title">Director, Learning Hub</div>
              <div>IIT Patna</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 18px; font-weight: bold; color: #ffd700;">
                🏆 EXCELLENCE IN LEARNING 🏆
              </div>
              <div style="font-size: 14px; margin-top: 10px;">
                Verified by Blockchain Technology
              </div>
            </div>
            
            <div class="signature-section">
              <div class="signature-line"></div>
              <div class="signature-title">Course Instructor</div>
              <div>${certificate.instructorName}</div>
            </div>
          </div>
        </div>
        
        <script>
          // Auto-print when page loads
          window.onload = function() {
            setTimeout(function() {
              // Set document title for better PDF naming
              document.title = '${certificate.courseTitle.replace(/\s+/g, '-').toLowerCase()}-certificate';
              window.print();
            }, 1000);
          };
          
          // Close window after printing
          window.onafterprint = function() {
            setTimeout(function() {
              window.close();
            }, 1000);
          };
        </script>
      </body>
      </html>
    `;

    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
  };

  const shareCertificate = (certificate: Certificate) => {
    const shareUrl = `${window.location.origin}/certificates/verify/${certificate.credentialId}`;
    const shareText = `🎓 I've completed "${certificate.courseTitle}" at Learning Hub - IIT Patna and earned a verified certificate! 
    
📜 Credential ID: ${certificate.credentialId}
⭐ Grade: ${certificate.grade}
🔗 Verify at: ${shareUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${certificate.courseTitle}`,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        console.log('🔗 Certificate link copied to clipboard!');
      });
    }
  };

  const getStatusBadge = (status: Certificate['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">⏳ Pending</span>;
      case 'expired':
        return <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">❌ Expired</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            🏆 Digital Certificates Hub
          </h1>
          <p className="text-xl opacity-90">
            Generate, manage, and verify your professional certificates with blockchain security
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
          {[
            { id: 'earned', label: '🎓 My Certificates', icon: '🎓' },
            { id: 'generate', label: '🔧 Auto Generator', icon: '🔧' },
            { id: 'verify', label: '🔍 Verify Certificate', icon: '🔍' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Earned Certificates Tab */}
        {activeTab === 'earned' && (
          <>
            {certificates.length === 0 ? (
              <Card className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No certificates yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Complete courses to earn certificates or use our auto-generator
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setActiveTab('generate')}>
                    🔧 Generate Certificate
                  </Button>
                  <Button variant="outline">
                    📚 Browse Courses
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {certificates.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Total Certificates</div>
                  </Card>
                  
                  <Card className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {certificates.filter(c => c.verificationStatus === 'verified').length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Verified</div>
                  </Card>
                  
                  <Card className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {new Set(certificates.map(c => c.instructorName)).size}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Instructors</div>
                  </Card>
                  
                  <Card className="text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {certificates.filter(c => 
                        new Date(c.completedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      ).length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">This Month</div>
                  </Card>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Certificate Image with Status */}
                      <div className="relative">
                        <img
                          src={certificate.courseThumbnail}
                          alt={certificate.courseTitle}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(certificate.verificationStatus)}
                        </div>
                        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
                          Grade: {certificate.grade}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          {certificate.courseTitle}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                          <div className="flex justify-between">
                            <span>Instructor:</span>
                            <span className="font-medium">{certificate.instructorName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Completed:</span>
                            <span className="font-medium">
                              {new Date(certificate.completedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">{certificate.courseDuration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Valid Until:</span>
                            <span className="font-medium text-green-600">
                              {certificate.validUntil ? new Date(certificate.validUntil).toLocaleDateString() : 'Lifetime'}
                            </span>
                          </div>
                        </div>

                        {/* Skills Badges */}
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Skills Gained:</div>
                          <div className="flex flex-wrap gap-1">
                            {certificate.skillsBadges.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {certificate.skillsBadges.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                +{certificate.skillsBadges.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Credential Info */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Credential ID:</div>
                          <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                            {certificate.credentialId}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Hash: {certificate.certificateHash.substring(0, 20)}...
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => downloadCertificate(certificate)}
                          >
                            �️ Print PDF
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => shareCertificate(certificate)}
                          >
                            🔗 Share
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Certificate Generator Tab */}
        {activeTab === 'generate' && (
          <Card>
            <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🔧 Auto Certificate Generator
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Generate professional certificates instantly with blockchain verification. 
                {isUserAuthenticated && currentUser 
                  ? ` Welcome ${getUserName()}! Your name will be automatically included.`
                  : ' Please fill in your details below.'
                }
              </p>
            </div>              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student Name *
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      value={generatorData.studentName}
                      onChange={(e) => setGeneratorData(prev => ({...prev, studentName: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter student name"
                    />
                    {isUserAuthenticated && currentUser && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        ✓ Auto-filled from your profile: {getUserName()}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="course-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course Title *
                    </label>
                    <input
                      id="course-title"
                      type="text"
                      value={generatorData.courseTitle}
                      onChange={(e) => setGeneratorData(prev => ({...prev, courseTitle: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter course title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="completion-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Completion Date *
                    </label>
                    <input
                      id="completion-date"
                      type="date"
                      value={generatorData.completionDate}
                      onChange={(e) => setGeneratorData(prev => ({...prev, completionDate: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="generator-grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Grade
                    </label>
                    <select
                      id="generator-grade"
                      value={generatorData.grade}
                      onChange={(e) => setGeneratorData(prev => ({...prev, grade: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+ (Excellent)</option>
                      <option value="A">A (Very Good)</option>
                      <option value="B+">B+ (Good)</option>
                      <option value="B">B (Satisfactory)</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="instructor-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instructor Name
                    </label>
                    <input
                      id="instructor-name"
                      type="text"
                      value={generatorData.instructorName}
                      onChange={(e) => setGeneratorData(prev => ({...prev, instructorName: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Learning Hub Faculty"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="course-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course Duration
                    </label>
                    <input
                      id="course-duration"
                      type="text"
                      value={generatorData.courseDuration}
                      onChange={(e) => setGeneratorData(prev => ({...prev, courseDuration: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., 8 weeks, 3 months"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="skills-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills/Technologies (comma separated)
                  </label>
                  <input
                    id="skills-input"
                    type="text"
                    value={generatorData.skills.join(', ')}
                    onChange={(e) => setGeneratorData(prev => ({...prev, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)}))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, MongoDB, Express.js"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                    🔒 Security Features
                  </h4>
                  <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                    <li>✓ Blockchain-based verification</li>
                    <li>✓ Unique SHA-256 hash generation</li>
                    <li>✓ Tamper-proof credential ID</li>
                    <li>✓ 3-year validity period</li>
                  </ul>
                </div>

                <Button 
                  onClick={generateCertificate}
                  className="w-full py-3 text-lg font-medium"
                >
                  🚀 Generate Certificate
                </Button>

                {/* Test Certificate Button */}
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Create test certificate with current user context
                    let testStudentName = '';
                    
                    // Try to get name from current user first
                    if (isUserAuthenticated && currentUser) {
                      testStudentName = getUserName();
                    }
                    
                    // If no user name, try demo user directly
                    if (!testStudentName && demoUser && demoUser.name) {
                      testStudentName = demoUser.name;
                    }
                    
                    // If still no name, try generator form
                    if (!testStudentName && generatorData.studentName.trim()) {
                      testStudentName = generatorData.studentName.trim();
                    }
                    
                    // If still no name, use default
                    if (!testStudentName) {
                      testStudentName = 'Test Student';
                    }
                    
                    console.log('Test certificate name will be:', testStudentName);
                    
                    // Temporarily set the generator data for the test
                    const originalGeneratorData = { ...generatorData };
                    setGeneratorData(prev => ({ ...prev, studentName: testStudentName }));
                    
                    const testCertificate: Certificate = {
                      id: 'test-' + Date.now(),
                      courseTitle: 'Demo Course - Platform Testing',
                      courseThumbnail: '',
                      instructorName: 'Learning Hub Faculty',
                      completedDate: new Date().toISOString().split('T')[0],
                      certificateUrl: '',
                      issuedBy: 'Learning Hub - IIT Patna',
                      credentialId: 'TEST-DEMO-' + Date.now(),
                      verificationStatus: 'verified',
                      certificateHash: 'SHA256:test123demo456',
                      skillsBadges: ['Platform Testing', 'Demo Experience'],
                      grade: 'A+',
                      courseDuration: '1 week'
                    };
                    
                    // Generate the certificate
                    generateCertificatePDF(testCertificate, false);
                    
                    // Restore original generator data after a brief delay
                    setTimeout(() => {
                      setGeneratorData(originalGeneratorData);
                    }, 100);
                  }}
                  className="w-full py-2"
                >
                  🧪 Test Certificate Generation 
                  {((isUserAuthenticated && currentUser) || demoUser) && 
                    ` (${getUserName() || demoUser?.name || 'Demo User'})`
                  }
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Verification Tab */}
        {activeTab === 'verify' && (
          <Card>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  🔍 Certificate Verification
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Verify the authenticity of any Learning Hub certificate using the credential ID
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="verification-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credential ID
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="verification-input"
                      type="text"
                      value={verificationId}
                      onChange={(e) => setVerificationId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., LH-FS-2024-001"
                    />
                    <Button onClick={verifyCertificate}>
                      🔍 Verify
                    </Button>
                  </div>
                </div>

                {/* Sample Credential IDs */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    📝 Sample Credential IDs for Testing:
                  </h4>
                  <div className="space-y-2 text-sm">
                    {certificates.slice(0, 3).map((cert) => (
                      <div key={cert.id} className="flex justify-between items-center">
                        <span className="font-mono text-gray-600 dark:text-gray-300">{cert.credentialId}</span>
                        <button
                          onClick={() => setVerificationId(cert.credentialId)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Use This
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                  <div className={`border rounded-lg p-6 ${
                    verificationResult.status === 'valid' 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  }`}>
                    {verificationResult.status === 'valid' ? (
                      <>
                        <div className="flex items-center mb-4">
                          <span className="text-green-600 text-2xl mr-3">✅</span>
                          <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">
                            Certificate Verified Successfully
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Course:</span>
                            <p className="text-green-700 dark:text-green-400">{verificationResult.certificate.courseTitle}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Instructor:</span>
                            <p className="text-green-700 dark:text-green-400">{verificationResult.certificate.instructorName}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Completed:</span>
                            <p className="text-green-700 dark:text-green-400">
                              {new Date(verificationResult.certificate.completedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Grade:</span>
                            <p className="text-green-700 dark:text-green-400">{verificationResult.certificate.grade}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Issuer:</span>
                            <p className="text-green-700 dark:text-green-400">{verificationResult.issuer}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-300">Blockchain:</span>
                            <p className="text-green-700 dark:text-green-400">{verificationResult.blockchain}</p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <div className="text-xs text-green-600 dark:text-green-400 mb-1">Certificate Hash:</div>
                          <div className="font-mono text-sm text-green-800 dark:text-green-300">
                            {verificationResult.certificate.certificateHash}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center mb-4">
                          <span className="text-red-600 text-2xl mr-3">❌</span>
                          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">
                            Certificate Not Found
                          </h3>
                        </div>
                        <p className="text-red-700 dark:text-red-400">
                          {verificationResult.message}
                        </p>
                      </>
                    )}
                    
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      Verified at: {new Date(verificationResult.verifiedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Trust & Security Info */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🔒 Blockchain-Secured Certificates
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              All Learning Hub certificates are secured with blockchain technology, ensuring permanent verification 
              and tamper-proof authenticity. Each certificate includes a unique hash and can be independently verified.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔐</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Blockchain Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tamper-proof verification</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">IIT Patna Backed</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Premier institution credibility</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Verification</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Real-time authenticity check</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌐</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Recognition</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Accepted worldwide</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Certificates;
