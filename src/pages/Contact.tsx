import React from 'react';
import Card from '../components/Card/Card';

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'general'
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const departments = [
    { value: 'general', label: 'General Inquiry', icon: '❓' },
    { value: 'technical', label: 'Technical Support', icon: '🛠️' },
    { value: 'academic', label: 'Academic Affairs', icon: '🎓' },
    { value: 'admission', label: 'Admissions', icon: '📝' },
    { value: 'collaboration', label: 'Industry Collaboration', icon: '🤝' },
    { value: 'research', label: 'Research & Development', icon: '🔬' }
  ];

  const contactMethods = [
    {
      title: 'Academic Support',
      description: 'Get help with course content and learning resources',
      icon: '📚',
      action: 'Contact Academic Team',
      available: 'Available Mon-Fri 9AM-6PM'
    },
    {
      title: 'Technical Support',
      description: 'Platform issues and technical assistance',
      icon: '💻',
      action: 'Get Technical Help',
      available: 'Response within 24 hours'
    },
    {
      title: 'Research Inquiries',
      description: 'Collaborate on research projects and initiatives',
      icon: '🔬',
      action: 'Contact Research Team',
      available: 'Academic collaboration'
    },
    {
      title: 'Campus Visits',
      description: 'Schedule visits and campus tours',
      icon: '🏛️',
      action: 'Schedule Visit',
      available: 'Advance booking required'
    }
  ];

  const faqs = [
    {
      question: 'How can I access course materials?',
      answer: 'Log into your student portal and navigate to your enrolled courses to access all materials and resources.'
    },
    {
      question: 'What are the admission requirements?',
      answer: 'Visit our admissions page for detailed requirements and application procedures for different programs.'
    },
    {
      question: 'How do I contact my course instructor?',
      answer: 'Use the messaging system within each course or during scheduled office hours.'
    },
    {
      question: 'Are there industry collaboration opportunities?',
      answer: 'Yes, we welcome partnerships with industry for research, internships, and knowledge exchange programs.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Contact Learning Hub
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connect with our academic community at IIT Patna. We're here to support your educational journey 
            and foster meaningful collaborations in technology and research.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">🤝 How Can We Assist You?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <Card key={method.title} className="text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{method.description}</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mb-4">{method.available}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  {method.action}
                </button>
              </Card>
            ))}
          </div>
        </div>

        {/* IIT Patna Address Center Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12 px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl text-white">
                  🏛️
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Hub - IIT Patna
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Indian Institute of Technology Patna - Educational Innovation Center
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="text-2xl mr-3">📍</div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Institute Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Indian Institute of Technology Patna<br/>
                        Bihta, Patna - 801106<br/>
                        Bihar, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="text-2xl mr-3">📞</div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Contact</h3>
                      <p className="text-gray-600 dark:text-gray-300">+91 612 302 8000</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="text-2xl mr-3">📧</div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">contact@learninghub.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="text-2xl mr-3">🌐</div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Website</h3>
                      <p className="text-gray-600 dark:text-gray-300">www.iitp.ac.in</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                  🎓 Advancing Excellence in Technical Education & Research
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-3">✉️</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Send us a Message</h2>
              </div>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                  ✅ Thank you! Your message has been sent successfully. We'll respond within 24-48 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department / Inquiry Type
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.icon} {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                >
                  <span className="mr-2">📤</span>
                  Send Message
                </button>
              </form>
            </Card>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response Times</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">Academic inquiries: Within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">Technical support: Within 4-6 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">Research collaboration: Within 48 hours</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">📞</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Direct Contact</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Academic Support</p>
                  <p>academic@learninghub.edu</p>
                  <p>+91 612 302 8001</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Technical Support</p>
                  <p>tech@learninghub.edu</p>
                  <p>+91 612 302 8002</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🕒</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Emergency support only</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">❓ Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
              📚 View More FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
