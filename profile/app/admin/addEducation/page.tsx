"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddEducationForm, { AddEducationFormProps } from "@/components/addEducationForm";
import AdminFooter from "@/components/adminFooter";

export default function AddEducationPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || undefined;
    const [education, setEducation] = useState<AddEducationFormProps["initialData"] | null>(null);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            const fetchEducation = async () => {
                const res = await fetch(`/api/education?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setEducation(data);
                } else {
                    setEducation(null);
                }
                setLoading(false);
            };
            fetchEducation();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1>{education ? "Edit Education" : "Add New Education"}</h1>
            <AddEducationForm id={id} initialData={education || undefined} />
            <AdminFooter />
        </div>
    );
}