import { ReactNode } from "react";

const SubTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return <span className={`slideUp ${className}`}>{children}</span>;
};

const Title = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <h2 className={`slideUp ${className}`} data-delay=".3">
            {children}
        </h2>
    );
};

const SectionTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return <div className={`section-title ${className}`}>{children}</div>;
};

SectionTitle.SubTitle = SubTitle;
SectionTitle.Title = Title;

export default SectionTitle;
