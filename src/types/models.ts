export type Topic = {
    id: string;
    title: string;
    icon: string;
    level: number;
    progress: number;
}

export type ResourceItem = {
    id: string;
    title: string;
    icon: string;
    completed?: boolean;
}
