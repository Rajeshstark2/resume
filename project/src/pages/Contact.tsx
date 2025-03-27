import React from 'react';
import { Mail, Github, Instagram, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Get in touch with the Stark Cloudie team
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto grid gap-8">
          <a
            href="mailto:starkcloudie@gmail.com"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-3 text-gray-900 dark:text-white">
              starkcloudie@gmail.com
            </span>
          </a>

          <a
            href="https://instagram.com/starkcloudie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Instagram className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-3 text-gray-900 dark:text-white">
              @starkcloudie
            </span>
          </a>

          <a
            href="https://twitter.com/RajeshCoder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Twitter className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-3 text-gray-900 dark:text-white">
              @RajeshCoder
            </span>
          </a>

          <a
            href="https://github.com/rajeshstark2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Github className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-3 text-gray-900 dark:text-white">
              rajeshstark2
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};