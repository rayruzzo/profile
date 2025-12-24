"use client";
import { useEffect, useState } from "react";
import ProjectDisplay from "@/components/project";
import AdminFooter from "@/components/adminFooter";

export default function AdminProjectsPage() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {

            const res = await fetch("/api/projects");
			const data = res.ok ? await res.json() : { projects: [] };
			setProjects(data.projects || []);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
            <h1>Manage Projects</h1>
            <a href="/admin/addProject" className="">Add New Project</a>

			<section>
				<h2>Projects</h2>
				{projects.map((proj: any) => (
					<div key={proj._id}>
						<ProjectDisplay {...JSON.parse(JSON.stringify(proj))} />
						<a href={`/admin/editProject/${proj._id}`}>Edit</a>
					</div>
				))}
			</section>
			<AdminFooter />
		</div>
	);
}
