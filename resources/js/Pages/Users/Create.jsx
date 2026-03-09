import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Create () {

    const [form , setForm] = useState({
        name:'',
        email:'',
        password:'',
        role:'parent',
    })

    const [errors, setErrors] = useState({});
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post('/users', form, {
            onError:(err)=> setErrors(err),
            onSuccess:() => setForm({
                name: '',
                email:'',
                password:'',
                role:'parent'}),
        });
    }

    return (
        <AuthenticatedLayout 
            header = {
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add user
                </h2>
            }
        >
            <Head title="Create User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 w-1/2">
                           
                            <form 
                                onSubmit={handleSubmit}
                             >
                                <div>
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput 
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={handleChange}
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
                                        value={form.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required/>
                                        <InputError 
                                        message={errors.email} 
                                        className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password"/>
                                    <TextInput 
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        type='password'
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required/>
                                        <InputError 
                                        message={errors.name} 
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
                                                    value={form.role === 'admin'}
                                                    name="role" 
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-admin" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Admin</label>
                                            </div>
                                            <div className="flex items-center ps-4 rounded-base">
                                                <input 
                                                    id="role-manager" 
                                                    type="radio" 
                                                    value={form.role === 'manager'} 
                                                    name="role" 
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-manager" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Manager</label>
                                            </div>
                                            <div className="flex items-center ps-4 rounded-base">
                                                <input 
                                                    defaultChecked 
                                                    id="role-parent" 
                                                    type="radio" 
                                                    value={form.role === 'parent'} 
                                                    name="role" 
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label htmlFor="role-parent" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Parent</label>
                                            </div>
                                        </div>
                                        {errors.role && <div className="text-red-600">{errors.role}</div>}
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <PrimaryButton >
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