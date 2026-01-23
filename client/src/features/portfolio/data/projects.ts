export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'A cutting-edge web application built with modern technologies.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'Mobile-first responsive design for a global client.',
    tags: ['React', 'Framer Motion'],
    link: '#',
  },
  {
    id: '3',
    title: 'Project Gamma',
    description: 'Full-stack dashboard with real-time data visualization.',
    tags: ['Vue', 'D3.js', 'Node.js'],
    link: '#',
  }
];
