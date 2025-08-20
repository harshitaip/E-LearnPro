import React from 'react';
import Card from '../components/Card/Card';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = [
    'All', 'Technology', 'Business', 'Design', 'Data Science', 
    'Marketing', 'Photography', 'Music', 'Health & Fitness', 'Language'
  ];

  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'John Smith',
      rating: 4.8,
      students: 15420,
      duration: '52 hours',
      level: 'Beginner',
      price: '$89.99',
      originalPrice: '$149.99',
      category: 'Technology',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more to become a full-stack web developer.',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'Digital Marketing Masterclass',
      instructor: 'Sarah Johnson',
      rating: 4.7,
      students: 8930,
      duration: '28 hours',
      level: 'Intermediate',
      price: '$69.99',
      originalPrice: '$99.99',
      category: 'Marketing',
      description: 'Master SEO, social media marketing, PPC, email marketing, and analytics.',
      tags: ['SEO', 'Social Media', 'PPC', 'Email Marketing']
    },
    {
      id: '3',
      title: 'UI/UX Design Complete Course',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 12750,
      duration: '35 hours',
      level: 'Beginner',
      price: '$79.99',
      originalPrice: '$129.99',
      category: 'Design',
      description: 'Learn user interface and user experience design from scratch using Figma and Adobe XD.',
      tags: ['UI Design', 'UX Design', 'Figma', 'Adobe XD']
    },
    {
      id: '4',
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.6,
      students: 9870,
      duration: '45 hours',
      level: 'Intermediate',
      price: '$99.99',
      originalPrice: '$179.99',
      category: 'Data Science',
      description: 'Master data science fundamentals with Python, pandas, NumPy, and machine learning.',
      tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning']
    },
    {
      id: '5',
      title: 'Business Management Fundamentals',
      instructor: 'Robert Davis',
      rating: 4.5,
      students: 6540,
      duration: '22 hours',
      level: 'Beginner',
      price: '$59.99',
      originalPrice: '$89.99',
      category: 'Business',
      description: 'Essential business management skills including leadership, strategy, and operations.',
      tags: ['Leadership', 'Strategy', 'Operations', 'Management']
    },
    {
      id: '6',
      title: 'Professional Photography Course',
      instructor: 'Lisa Martinez',
      rating: 4.8,
      students: 4320,
      duration: '18 hours',
      level: 'Beginner',
      price: '$49.99',
      originalPrice: '$79.99',
      category: 'Photography',
      description: 'Learn photography basics, composition, lighting, and post-processing techniques.',
      tags: ['Photography', 'Composition', 'Lighting', 'Editing']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover thousands of courses taught by expert instructors. Learn new skills and advance your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              {/* Course Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                  <p className="text-sm opacity-75">Course Preview</p>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">by {course.instructor}</p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                      +{course.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{course.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs">
                    {course.level}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{course.duration}</span>
                  <div className="flex items-center">
                    <span className="text-gray-500 line-through mr-2">{course.originalPrice}</span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {course.price}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors">
                  Enroll Now
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.47.881-6.083 2.291" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
