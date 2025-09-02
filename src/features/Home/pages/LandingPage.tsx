import { useTheme } from "../../../Context/ThemeContext/themeContext";


const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{
      backgroundColor: "var(--color-background)",
      color: "var(--color-foreground)"
    }}>
      <h1 className="text-4xl font-bold mb-8">Welcome to Reepls Landing Page</h1>
      <button
        onClick={toggleTheme}
        className="px-6 py-3 rounded-lg font-semibold"
        style={{
          backgroundColor: "var(--color-primary-500)",
          color: "var(--color-plain-b)"
        }}
      >
        Current Theme: {theme}
      </button>
    </div>
  );
};

export default LandingPage;
