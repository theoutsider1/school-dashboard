import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function index ({classes}) {


    const columns = [
        {key:"id" , label: "ID"},
        {key: "name", label: "Name"},
        {
            key:"created_by", 
            label: "Create By",
            render:(classe) => classe.created_by || "Unknow",
        },
        {
            key: "action",
            label:"Action",
            render: (classe) => (
                <div>
                    <Link
                        href={`/classe/${classe.id}/edit`}
                        className="font-medium text-fg-brand hover:underline bg-yellow-500 text-white rounded hover:bg-yellow-600 px-2 py-1 mx-2">
                        Edit
                    </Link>
                    
                    <form
                        method="POST"
                        action={`/classes/${classe.id}`}
                        className="inline"
                        onSubmit={(e) => {
                            if (!confirm('Are you sure?')) e.preventDefault();
                        }}
                    >
                        <input type="hidden" name="_method" value="DELETE" />
                        <input type="hidden" name="_token" value={window.csrfToken} />
                        <button
                        type="submit"
                        className="px-2 py-0.5 bg-red-600 text-white font-medium text-fg-brand rounded hover:bg-red-700 mx-2"
                        >
                        Delete
                        </button>
                    </form>
                 </div>
              )
        }
    ]
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Classes
                </h2>
            }
            >
            <div className="mx-auto max-w-7xl m-4 relative py-12 px-8 overflow-x-auto bg-white shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="bg-neutral-secondary-soft border-b border-default">
                    <tr>
                    {columns.map(col => 
                        <th key={col.key} scope="col" className="px-6 py-3 font-medium">
                            {col.label}
                        </th>
                       
                        )}
                        </tr>
                </thead>
                <tbody>
                    {classes.map((classe) => (
                    <tr key={classe.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        {columns.map(col => (
                            <td key={col.key} scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {col.render ? col.render(classe) : classe[col.key]}
                            </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
    )

}