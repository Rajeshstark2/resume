import React from 'react';
import type { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
  {
    name: 'Rajesh',
    role: 'Full Stack Web Developer',
    description: 'Hacking & Cybersecurity Expert with a passion for building secure web applications.',
  },
  {
    name: 'Thirumoorthy',
    role: 'Marketing & Game Developer',
    description: 'Marketing strategist and game developer with expertise in sales and web development.',
  },
  {
    name: 'Saur Basha',
    role: 'Full Stack Developer',
    description: 'Full Stack Web Developer specializing in graphic design and app development.',
  },
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Stark Cloudie
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            A team of passionate college students working on innovative tech projects
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <div className="text-center">
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  {member.role}
                </p>
                <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Our Mission
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-3xl mx-auto">
            At Stark Cloudie, we're dedicated to creating innovative technology solutions
            that make a difference. As college students, we bring fresh perspectives
            and cutting-edge skills to every project we undertake.
          </p>
        </div>
      </div>
    </div>
  );
};