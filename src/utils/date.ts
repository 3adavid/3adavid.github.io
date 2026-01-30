import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
};

export const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
};

export const calculateReadTime = (html: string): number => {
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '');

    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, readTime); // Minimum 1 minute
};
