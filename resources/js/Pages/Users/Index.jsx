import React from 'react';
import { Head, Link } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index ({users}){

  
    return (
        <AuthenticatedLayout
            header = {
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
            }
        >
        <Head title="Users" />
        <div className="mx-auto max-w-7xl m-4 relative py-12 px-8 overflow-x-auto bg-white shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="bg-neutral-secondary-soft border-b border-default">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            {user.id}
                        </th>
                        <td className="px-6 py-4">
                            {user.name}
                        </td>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            {user.role}
                        </td>
                        <td className="px-6 py-4">
                            <Link 
                                href={`/users/${user.id}/edit`}
                                className="font-medium text-fg-brand hover:underline bg-yellow-500 text-white rounded hover:bg-yellow-600 px-2 py-1 mx-2">
                                    Edit
                            </Link>
                            <form
                                method="POST"
                                action={`/users/${user.id}`}
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
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
    );
}