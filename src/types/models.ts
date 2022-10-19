export type Topic = {
    id: string;
    title: string;
    description?: string;
    icon: string;
    level: number;
    progress: number;
    resources?: ResourceItem[];
}

export type ResourceItem = {
    id: string;
    title: string;
    icon: string;
    completed?: boolean;
}
