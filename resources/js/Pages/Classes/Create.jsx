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
        // manager_id:'parent',
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
        Inertia.post('/classes', form, {
            onError:(err)=> setErrors(err),
            onSuccess:() => setForm({
                name: '',
                 // manager_id:'parent',
               }),
        });
    }

    return (
        <AuthenticatedLayout 
            header = {
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Classe
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