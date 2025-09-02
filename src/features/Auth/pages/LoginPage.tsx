import { useTheme } from '../../../Context/ThemeContext/themeContext';

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <div className="mb-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border"
          style={{ backgroundColor: 'var(--color-neutral-700)', color: 'var(--color-foreground)' }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border"
          style={{ backgroundColor: 'var(--color-neutral-700)', color: 'var(--color-foreground)' }}
        />
        <button
          className="w-full p-3 rounded font-semibold"
          style={{ backgroundColor: 'var(--color-primary-500)', color: 'var(--color-plain-b)' }}
        >
          Login
        </button>
      </div>
      <button
        onClick={toggleTheme}
        className="w-full p-3 rounded font-semibold"
        style={{ backgroundColor: 'var(--color-secondary-500)', color: 'var(--color-plain-b)' }}
      >
        Current Theme: {theme}
      </button>
    </div>
  );
};

export default LoginPage;
