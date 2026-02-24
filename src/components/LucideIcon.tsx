"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
    name: string;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
    // Cast everything to any to avoid TS errors with dynamic strings
    const IconComponent = (Icons as any)[name];

    if (!IconComponent) {
        // Fallback to a default icon if not found
        return <Icons.HelpCircle {...props} />;
    }

    return <IconComponent {...props} />;
};

export default LucideIcon;
