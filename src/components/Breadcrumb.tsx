import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
  ];

  pathnames.forEach((segment, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    
    // Handle specific routes
    if (segment === "curriculum") label = "Curriculum";
    else if (segment === "day" && pathnames[index + 1]) return;
    else if (!isNaN(Number(segment)) && pathnames[index - 1] === "day") {
      label = `Day ${segment}`;
    } else if (segment === "week" && pathnames[index + 1]) return;
    else if (!isNaN(Number(segment)) && pathnames[index - 1] === "week") {
      label = `Week ${segment}`;
    } else if (segment === "lesson") return; // Skip "lesson" from breadcrumb
    
    breadcrumbItems.push({
      label,
      href: index === pathnames.length - 1 ? undefined : href,
    });
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              {index === 0 && <Home className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
