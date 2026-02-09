import { Link } from "react-router";

export function mapperComponents() {
  const linkClass = "text-blue-600 underline";

  return {
    a: ({ href, children, ...props }) => {
      // Seguridad: algunos nodos markdown pueden no traer href
      if (!href) {
        return <span className={linkClass}>{children}</span>;
      }

      const origin = window.location.origin;

      // Link interno (ruta relativa o misma origin)
      if (href.startsWith("/") || href.startsWith(origin)) {
        const path = href.startsWith(origin) ? href.replace(origin, "") : href;

        return (
          <Link to={path} {...props} className={linkClass}>
            {children}
          </Link>
        );
      }

      // Link externo
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {children}
        </a>
      );
    },
  };
}
