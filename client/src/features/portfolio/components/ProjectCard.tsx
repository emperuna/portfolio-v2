import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      {project.image && (
        <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
           {/* Placeholder for now, can be replaced with optimized Image later if using Astro Image in React (complex) or regular img */}
           <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform hover:scale-105" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {project.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={project.link}>View Project</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
