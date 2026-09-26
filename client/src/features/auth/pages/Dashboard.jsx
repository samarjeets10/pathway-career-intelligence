import { useAuth } from "../hooks/useAuth";

function Dashboard() {
    const { user, handleLogout, actionLoading } = useAuth();

    return (
        <main className="min-h-screen w-full">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
                <header className="flex items-center justify-between border-b border-neutral-200 pb-6">
                    <div>
                        <p className="text-sm text-neutral-500">Welcome back</p>
                        <h1 className="text-2xl font-semibold">{user?.username}</h1>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={actionLoading}
                        className="rounded-full border border-neutral-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {actionLoading ? "Logging out..." : "Logout"}
                    </button>
                </header>

                <section className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Your career workspace</h2>
                        <p className="mt-2 text-sm text-neutral-500">
                            The authenticated Pathway workspace will live here.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;
