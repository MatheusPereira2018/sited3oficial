import { Link, type LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...(props as LinkProps)}
        className={className}
        activeProps={{ className: cn(activeClassName) }}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
