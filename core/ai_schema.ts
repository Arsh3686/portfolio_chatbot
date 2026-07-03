export interface AIResponse {
    blocks: Block[];
}

export type Block =
    | HeadingBlock
    | ParagraphBlock
    | ListBlock
    | ProjectCardBlock
    | SkillsGridBlock
    | ExperienceCardBlock
    | TimelineBlock
    | ContactBlock
    | QuoteBlock
    | DividerBlock
    | CodeBlock;

export interface HeadingBlock {
    type: "heading";
    level: 1 | 2 | 3;
    text: string;
}

export interface ParagraphBlock {
    type: "paragraph";
    text: string;
}

export interface ListBlock {
    type: "list";
    ordered?: boolean;
    items: string[];
}

export interface ProjectCardBlock {
    type: "project-card";
    title: string;
    status: string;
    description: string;
    tech: string[];
}

export interface SkillsGridBlock {
    type: "skills-grid";
    categories: {
        title: string;
        skills: string[];
    }[];
}

export interface ExperienceCardBlock {
    type: "experience-card";
    company: string;
    role: string;
    duration: string;
    achievements: string[];
}

export interface TimelineBlockType {
    type: "timeline";
    items: {
        title: string;
        subtitle: string;
        duration: string;
    }[];
}

export interface TimelineBlock {
    type: "timeline";
    items: {
        title: string;
        subtitle: string;
        duration: string;
    }[];
}

export interface ContactBlock {
    type: "contact";
    email?: string;
    github?: string;
    linkedin?: string;
}

export interface QuoteBlock {
    type: "quote";
    text: string;
}

export interface DividerBlock {
    type: "divider";
}

export interface CodeBlock {
    type: "code";
    language: string;
    code: string;
}