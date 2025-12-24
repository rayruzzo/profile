"use client";
import { useEffect, useState } from "react";
import EducationDisplay from "@/components/education";
import AdminFooter from "@/components/adminFooter";

export default function AdminEducationPage() {
	const [education, setEducation] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {

            const res = await fetch("/api/education");
			const data = res.ok ? await res.json() : { education: [] };
			setEducation(data.education || []);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h1>Manage Education</h1>
			<a href="/admin/addEducation" style={{ display: 'block', marginBottom: '1rem' }}>Add New Education</a>
			<section>
				<h2>Education</h2>
				{education.map((edu: any) => (
					<div key={edu._id}>
						<EducationDisplay {...JSON.parse(JSON.stringify(edu))} />
						<a href={`/admin/addEducation?id=${edu._id}`}>Edit</a>
					</div>
				))}
			</section>
			<AdminFooter />
		</div>
	);
}
