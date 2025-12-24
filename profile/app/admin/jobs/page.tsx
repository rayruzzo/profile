"use client";
import { useEffect, useState } from "react";
import JobDisplay from "@/components/job";
import AdminFooter from "@/components/adminFooter";

export default function AdminJobsPage() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {

			const res = await fetch("/api/job");
			const data = res.ok ? await res.json() : [];
			setJobs(Array.isArray(data) ? data : []);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
            <h1>Manage Jobs</h1>
            <a href="/admin/addJobs" style={{ display: 'block', marginBottom: '1rem' }}>Add New Job</a>

			<section>
				<h2>Jobs</h2>
				{jobs.map((job: any) => (
					<div key={job._id}>
						<JobDisplay {...JSON.parse(JSON.stringify(job))} />
						<a href={`/admin/addJobs?id=${job._id}`}>Edit</a>
					</div>
				))}
			</section>
			<AdminFooter />
		</div>
	);
}
