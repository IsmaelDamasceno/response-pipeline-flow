import { ReactNode } from "react";

type GridDivProps = React.ComponentProps<'div'>;

interface Props extends GridDivProps {
    children: ReactNode;
}

export function DataInputGrid({children, ...gridProps }: Props) {

    const { className, ...rest } = gridProps ?? {};

    return (
        <div className={`grid grid-cols-2 ${className ?? ''}`} {...rest}>
            {children}
        </div>
    );
}
