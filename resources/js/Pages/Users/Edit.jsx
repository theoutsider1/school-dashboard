import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit ({user}){

    const {data, setData, put, processing, errors} = useForm({
        name: user.name || '',
        email: user.email || '',
        password : '',
        role: user.role || '',
    })
    const handleSubmit = (e)=> {
        e.preventDefault();

        put(`/users/${user.id}`)

    }
    return (
        <AuthenticatedLayout
        header = {
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Edit User 
            </h2>
        }
    >
     <Head title="Edit User " />
     <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="w-full p-4 border-b-2 ">
                        <h3 className="font-semibold">
                             Edit User Information:
                        </h3>
                        <p className="text-sm transform opacity-70">
                            User : {user.id} 
                        </p>
                    </div>
                <div className="p-6 text-gray-900 w-1/2">
                        {/* form */}
                        <form 
                                onSubmit={handleSubmit}
                             >
                                <div>
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput 
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required/>
                                        <InputError 
                                        message={errors.name} 
                                        className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email"/>
                                    <TextInput 
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required/>
                                        <InputError 
                                        message={errors.email} 
                                        className="mt-2"/>
                                </div>
                                
                                <div className="mt-4">
                                    <span>Role</span>
                                    <div className="flex flex-col ps-4">
                                        <div className="flex">
                                            <div className="flex items-center ps-4">
                                                <input 
                                                    id="role-admin" 
                                                    type="radio" 
                                                    value='admin'
                                                    checked={data.role === "admin"}
                                                    name="role" 
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-admin" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Admin</label>
                                            </div>
                                            <div className="flex items-center ps-4 rounded-base">
                                                <input 
                                                    id="role-manager" 
                                                    type="radio" 
                                                    value='manager' 
                                                    name="role"
                                                    checked={data.role === "manager"} 
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-manager" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Manager</label>
                                            </div>
                                            <div className="flex items-center ps-4 rounded-base">
                                                <input 
                                                    // defaultChecked 
                                                    id="role-parent" 
                                                    type="radio" 
                                                    value='parent'
                                                    checked={data.role === "parent"} 
                                                    name="role" 
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-parent" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Parent</label>
                                            </div>
                                        </div>
                                        {errors.role && <div className="text-red-600">{errors.role}</div>}
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>
                </div>
            </div>          
        </div>
     </div>
    </AuthenticatedLayout>
    )
}