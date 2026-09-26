import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RegisterForm() {
    const { actionLoading, handleRegister } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await handleRegister(form);
            navigate("/dashboard", { replace: true });
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
                <label htmlFor="register-username" className="text-sm font-semibold">Username</label>
                <input
                    id="register-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    minLength={3}
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-800"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="register-email" className="text-sm font-semibold">Email</label>
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-800"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="register-password" className="text-sm font-semibold">Password</label>
                <input
                    id="register-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-800"
                />
            </div>

            <button
                type="submit"
                disabled={actionLoading}
                className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                {actionLoading ? "Creating account..." : "Create account"}
            </button>

        </form>
    );
}

export default RegisterForm;
