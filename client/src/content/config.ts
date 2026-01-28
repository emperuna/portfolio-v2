import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        incident_id: z.string(), // e.g. "INC-2024-001"
        impact_level: z.enum(['CRITICAL', 'HIGH', 'MODERATE', 'LOW']),
        status: z.enum(['RESOLVED', 'MONITORING', 'CLOSED', 'ARCHIVED']),
        root_cause: z.string(), // One-line summary
        resolution: z.enum(['SHIPPED', 'ABANDONED', 'REFACTORED', 'IN_PROGRESS']),
        affected_systems: z.array(z.string()), // Tech stack
        timeline: z.object({
            start: z.string().or(z.date()), // Flexible date input
            end: z.string().or(z.date()).optional()
        }),
        description: z.string(),
        image: z.string().optional(),
    })
});

export const collections = {
    'projects': projectsCollection,
};
