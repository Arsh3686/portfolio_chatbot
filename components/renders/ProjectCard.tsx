
export default function ProjectCard({
    title,
    status,
    description,
    tech
}: {
    title: string,
    status: string,
    description: string,
    tech: string[],
}) {
    return (
        <div className="rounded-xl border p-4 mt-4">

            <div className="flex justify-between">

                <h3 className="font-bold text-lg">
                    {title}
                </h3>

                <span className="text-xs bg-green-100 px-2 py-1 rounded">
                    {status}
                </span>

            </div>

            <p className="mt-2 text-gray-600">
                {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">

                {tech.map(skill => (
                    <span
                        key={skill}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                        {skill}
                    </span>
                ))}

            </div>

        </div>
    );
}