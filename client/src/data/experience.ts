export interface LogItem {
    id: string;
    time: string;
    level: string;
    msg: string;
    status: string;
    details: string;
}

export const EXPERIENCE_RECORDS: LogItem[] = [
    {
        id: '1',
        time: 'Jan 2026 - Present',
        level: 'INFO',
        msg: 'Exploring DevOps, AI, and Machine Learning',
        status: 'RUNNING',
        details: 'Continuing to learn DevOps fundamentals (Docker, Kubernetes) while exploring AI and machine learning to expand skills toward intelligent system development.'
    },
    {
        id: '2',
        time: 'Sep 2025 - Dec 2025',
        level: 'SUCCESS',
        msg: 'Led 9-member Software Engineering team as Fullstack Dev',
        status: 'COMPLETED',
        details: 'Handled system design, architecture, CI/CD pipelines with GitHub Actions, and deployed the live system. This experience sparked an interest in DevOps.'
    },
    {
        id: '3',
        time: 'Jun 2025',
        level: 'INFO',
        msg: 'Upskilled in React and launched first personal portfolio',
        status: 'DEPLOYED',
        details: 'Transitioned to modern component-driven UI development using React.'
    },
    {
        id: '4',
        time: 'Mar 2025 - May 2025',
        level: 'SUCCESS',
        msg: 'Developed mobile e-commerce application',
        status: 'COMPLETED',
        details: 'Fullstack developer using Flutter and Firebase. Managed the frontend and integrated Firebase services for database, authentication, and storage.'
    },
    {
        id: '5',
        time: 'Jan 2025',
        level: 'INFO',
        msg: 'Started UI/UX Design and Data Analytics',
        status: 'ARCHIVED',
        details: 'Began learning Flutter and Figma for design, alongside basic data analytics skills like data cleaning and visualization.'
    },
    {
        id: '6',
        time: 'Sep 2024 - Dec 2024',
        level: 'INFO',
        msg: 'Data Structures, Algorithms, and Frontend Dev',
        status: 'ARCHIVED',
        details: 'Learned Python and DSA. Contributed as frontend developer (HTML, CSS, JS) and Python backend for an e-commerce web app.'
    },
    {
        id: '7',
        time: 'May 2024',
        level: 'INFO',
        msg: 'Built desktop POS app',
        status: 'ARCHIVED',
        details: 'Collaborative project for freshman second-semester finals.'
    },
    {
        id: '8',
        time: 'Sep 2023 - Dec 2023',
        level: 'INFO',
        msg: 'System Init: Began programming in C#',
        status: 'ARCHIVED',
        details: 'Learned basics. Collaborated on a scientific calculator and zodiac sign finder for freshman first-semester finals.'
    }
];
