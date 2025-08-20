import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { Card } from '../Card';

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: number;
  prerequisites?: string;
  learningObjectives: string;
  tags: string;
}

interface InstructorCourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<void>;
  initialData?: Partial<CourseFormData>;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const schema = yup.object().shape({
  title: yup.string().required('Course title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  category: yup.string().required('Category is required'),
  level: yup.string().required('Level is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
  duration: yup.number().required('Duration is required').min(1, 'Duration must be at least 1 hour'),
  prerequisites: yup.string().optional().nullable(),
  learningObjectives: yup.string().required('Learning objectives are required'),
  tags: yup.string().required('Tags are required'),
}) as yup.ObjectSchema<CourseFormData>;

const InstructorCourseForm: React.FC<InstructorCourseFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
  isSubmitting = false
}) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [modules, setModules] = useState<Array<{ title: string; description: string }>>([
    { title: '', description: '' }
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CourseFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      setModules(modules.filter((_, i) => i !== index));
    }
  };

  const updateModule = (index: number, field: 'title' | 'description', value: string) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const handleFormSubmit: SubmitHandler<CourseFormData> = async (data) => {
    try {
      await onSubmit({
        ...data,
        // Add modules and thumbnail to the data if needed
      });
      if (!isEditing) {
        reset();
        setThumbnail(null);
        setModules([{ title: '', description: '' }]);
      }
      toast.success(isEditing ? 'Course updated successfully!' : 'Course created successfully!');
    } catch (error) {
      console.error('Failed to save course:', error);
      toast.error('Failed to save course. Please try again.');
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Title *
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter course title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select 
              id="category" 
              {...register('category')} 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select category</option>
              <option value="programming">Programming</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="data-science">Data Science</option>
              <option value="ai-ml">AI & Machine Learning</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="language">Language</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty Level *
            </label>
            <select 
              id="level" 
              {...register('level')} 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            {errors.level && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.level.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price ($) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (hours) *
            </label>
            <input
              id="duration"
              type="number"
              {...register('duration')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Hours"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags * <span className="text-gray-500">(comma separated)</span>
            </label>
            <input
              id="tags"
              type="text"
              {...register('tags')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., JavaScript, React, Frontend, Beginner"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.tags.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="md:col-span-2">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Thumbnail
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {thumbnail && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail preview"
                  className="w-32 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Description *
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe what students will learn in this course"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Prerequisites */}
          <div className="md:col-span-2">
            <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prerequisites (Optional)
            </label>
            <textarea
              id="prerequisites"
              {...register('prerequisites')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="What should students know before taking this course?"
            />
            {errors.prerequisites && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.prerequisites.message}
              </p>
            )}
          </div>

          {/* Learning Objectives */}
          <div className="md:col-span-2">
            <label htmlFor="learningObjectives" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Learning Objectives *
            </label>
            <textarea
              id="learningObjectives"
              {...register('learningObjectives')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="What will students achieve after completing this course?"
            />
            {errors.learningObjectives && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.learningObjectives.message}
              </p>
            )}
          </div>
        </div>

        {/* Course Modules Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Course Modules</h3>
            <Button 
              type="button" 
              onClick={addModule}
              variant="outline"
              className="text-sm"
            >
              Add Module
            </Button>
          </div>
          
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Module {index + 1}
                  </h4>
                  {modules.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeModule(index)}
                      variant="outline"
                      className="text-xs text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Module Title
                    </label>
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter module title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Module Description
                    </label>
                    <textarea
                      value={module.description}
                      onChange={(e) => updateModule(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Describe what this module covers"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Course' : 'Create Course')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default InstructorCourseForm;
