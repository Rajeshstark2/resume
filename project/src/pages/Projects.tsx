import React from 'react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    name: 'Clip Hunt',
    url: 'https://cliphunt.in',
    description: 'A platform for discovering and sharing video content.',
  },
  {
    name: 'Ebook Store',
    url: 'https://ebookcart.in',
    description: 'Digital bookstore offering a wide range of ebooks.',
  },
  {
    name: 'Chat Mate',
    url: 'https://chatmate-dc97.onrender.com',
    description: 'Real-time chat application with modern features.',
  },
];

export const Projects: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Our Projects
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Explore our latest innovations and technological solutions
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="mt-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};