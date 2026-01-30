import * as React from "react";

interface CategoryBadgeProps {
    category: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
    const getBadgeClass = (cat: string): string => {
        const normalized = cat.toLowerCase();

        if (normalized.includes('ai')) return 'badge badge-ai';
        if (normalized.includes('security')) return 'badge badge-security';
        if (normalized.includes('librar')) return 'badge badge-libraries';
        return 'badge badge-general';
    };

    return (
        <span className={getBadgeClass(category)}>
            {category}
        </span>
    );
};
