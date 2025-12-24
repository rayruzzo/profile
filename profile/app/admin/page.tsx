"use client";
import { useState } from "react";
import LoginForm from "../../components/loginForm"
import { useEffect } from "react";

export default function AdminPage() {
	const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth");
            setLoggedIn(res.ok);
            setLoading(false);
        };
        checkAuth();
    }, []);


	const handleLogin = async (email: string, password: string) => {
		const res = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (res.ok) {
			setLoggedIn(true);
		} else {
			alert("Invalid email or password");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!loggedIn) {
		return <LoginForm onLogin={handleLogin} />;
	}

	return (
		<><main>
			<h1>Admin Portal</h1>
			<h2>Existing Content</h2>
			<ul>
				<li><a href="/admin/education">Manage Education</a></li>
				<li><a href="/admin/jobs">Manage Jobs</a></li>
				<li><a href="/admin/projects">Manage Projects</a></li>
				<li><a href="/admin/editResume">Edit Resume</a></li>
				{/* Add more management links as needed */}
			</ul>

			<h2>Manage Content</h2>
			<ul>
				<li><a href="/admin/addEducation">Add Education</a></li>
				<li><a href="/admin/addJobs">Add Job</a></li>
				<li><a href="/admin/addProject">Add Project</a></li>
				{/* Add more admin links as needed */}
			</ul>
	</main>
	</>
	);
}
