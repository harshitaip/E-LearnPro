import React from 'react';
import Card from '../components/Card/Card';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Personal Data
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Usage Data
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                E Learning Platform uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To provide personalized course recommendations</li>
                <li>To process payments and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may disclose your Personal Data in the good faith belief that such action is necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of E Learning Platform</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information and data stored on our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track the activity on our Service and store certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Service</li>
                <li><strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings</li>
                <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes</li>
                <li><strong>Analytics Cookies:</strong> We use Analytics Cookies to help us analyze how the Service is used</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may use third-party Service Providers to monitor and analyze the use of our Service:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Google Analytics:</strong> For tracking user behavior and site performance</li>
                <li><strong>Hotjar:</strong> For understanding user interaction through heatmaps and recordings</li>
                <li><strong>Mixpanel:</strong> For advanced user analytics and funnel analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Your Data Protection Rights (GDPR)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. E Learning Platform aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Your Rights Include:
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>The right to access:</strong> You have the right to request copies of your personal data</li>
                <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate</li>
                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions</li>
                <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data</li>
                <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data</li>
                <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Data Retention
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                E Learning Platform will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. International Transfers
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> privacy@learninghub.edu<br/>
                  <strong>Data Protection Officer:</strong> dpo@learninghub.edu<br/>
                  <strong>Address:</strong> IIT Patna Campus, Bihta, Patna, Bihar 801106, India<br/>
                  <strong>Phone:</strong> +91 612 302 8000
                </p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
