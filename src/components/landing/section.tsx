import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ as: Comp = 'section', className, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn('py-16 md:py-20 lg:py-24', className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export default Section;
