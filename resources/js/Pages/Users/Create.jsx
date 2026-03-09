import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
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
    
    const hndleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.target
        })
    }
    function handleSubmit() {
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
                                    <InputLabel htmlForm="name" value="Name"/>
                                    <TextInput 
                                        id="name"
                                        name="name"
                                        value=""
                                        className="mt-1 block w-full"
                                        autoComplet="name"
                                        isFocused={true}
                                        // onChange={}
                                        required/>
                                        <InputError 
                                        message={errors.name} 
                                        className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlForm="email" value="Email"/>
                                    <TextInput 
                                        id="email"
                                        name="email"
                                        value=""
                                        className="mt-1 block w-full"
                                        autoComplet="email"
                                        isFocused={true}
                                        // onChange={}
                                        required/>
                                        <InputError 
                                        message={errors.email} 
                                        className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlForm="password" value="Password"/>
                                    <TextInput 
                                        id="password"
                                        name="password"
                                        value=""
                                        className="mt-1 block w-full"
                                        autoComplet="new-password"
                                        isFocused={true}
                                        // onChange={}
                                        required/>
                                        <InputError 
                                        message={errors.name} 
                                        className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <span>Role</span>
                                    <div className="flex flex-col ps-4">
                                        <div className="flex">
                                            <div class="flex items-center ps-4">
                                                <input 
                                                    id="role-admin" 
                                                    type="radio" 
                                                    value="admin"
                                                    name="role" 
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label for="role-admin" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Admin</label>
                                            </div>
                                            <div class="flex items-center ps-4 rounded-base">
                                                <input 
                                                    id="role-manager" 
                                                    type="radio" 
                                                    value="manager" 
                                                    name="role" 
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label for="role-manager" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Manager</label>
                                            </div>
                                            <div class="flex items-center ps-4 rounded-base">
                                                <input 
                                                    defaultChecked 
                                                    id="role-parent" 
                                                    type="radio" 
                                                    value="parent" 
                                                    name="role" 
                                                    className="w-4 h-4 rounded-full focus:ring-2 focus:ring-brand"/>
                                                <label for="role-parent" className="w-full py-4 select-none ms-2 text-sm font-medium text-heading">Parent</label>
                                            </div>
                                        </div>
                                        {errors.role && <div className="text-red-600">{errors.role}</div>}
                                    </div>
                                </div>
                            </form>
                          
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}