import { useTheme } from '../../../Context/ThemeContext/themeContext';

const DashboardPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 bg-background" >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg font-semibold"
            style={{
              backgroundColor: "var(--color-primary-500)",
              color: "var(--color-plain-b)"
            }}
          >
            Current Theme: {theme}
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample cards to show theme */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-neutral-700 text-foreground"
             
            >
              <h3 className="text-xl font-semibold mb-2">Card {i}</h3>
              <p>This card demonstrates the theme colors</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
