import SiteNav from "./SiteNav";

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <SiteNav />
      {children}
    </div>
  );
}
