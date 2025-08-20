import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card/Card';
import { ROUTES } from '../utils/constants';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          India's Leading Online Learning Platform
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto">
          Master competitive exams, develop in-demand skills, and advance your career with courses designed 
          specifically for Indian students. Transform your future with quality education.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.COURSES}>
            <Button size="lg" className="w-full sm:w-auto">
              Explore Courses
            </Button>
          </Link>
          <Link to="/competitive-exams">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Competitive Exam Prep
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Join Learning Hub
            </Button>
          </Link>
        </div>

        {/* Platform Highlight */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            🎓 Start Your Learning Journey
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Join thousands of students and professionals advancing their careers through our comprehensive learning platform.
          </p>
          <Link to="/signup">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Get Started Today →
            </Button>
          </Link>
        </div>
        
        {/* Course Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">JEE</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">Engineering Prep</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">NEET</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">Medical Prep</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">GATE</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">PG Preparation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">UPSC</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">Civil Services</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Why Indian Students Choose E Learning Platform?
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Designed for the Indian education system and job market
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle>Competitive Exam Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-600 dark:text-secondary-400">
                Specialized preparation for JEE, NEET, UPSC, SSC, Banking, and other major Indian competitive exams
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <CardTitle>Government Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-600 dark:text-secondary-400">
                Courses aligned with Skill India, NSDC, and PM Kaushal Vikas Yojana for recognized certifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <CardTitle>Industry-Relevant Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-600 dark:text-secondary-400">
                Learn skills demanded by Indian companies - from coding to digital marketing to soft skills
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Most Popular Categories
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="/competitive-exams?exam=jee" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">⚗️</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">JEE</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/competitive-exams?exam=neet" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">🩺</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">NEET</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/competitive-exams?exam=upsc" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">🏛️</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">UPSC</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/skill-development?category=programming" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">💻</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">Coding</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/skill-development?category=digital-marketing" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">📱</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">Digital Marketing</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/skill-development?category=communication" className="group">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">🗣️</div>
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600">English</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Career?
        </h2>
        <p className="text-xl mb-6 text-orange-100">
          Start your journey towards academic and career success
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.SIGNUP}>
            <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
              Start Learning Free
            </Button>
          </Link>
          <Link to="/skill-development">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 w-full sm:w-auto">
              Explore Skills Training
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
