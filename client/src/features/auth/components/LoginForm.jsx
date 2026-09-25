import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
    const { actionLoading, handleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await handleLogin({ email, password });
            const from = location.state?.from?.pathname;
            navigate(from || "/dashboard", { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-800"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-800"
                />
            </div>

            <button
                type="submit"
                disabled={actionLoading}
                className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                {actionLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-neutral-500">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-neutral-900">
                    Create one
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
