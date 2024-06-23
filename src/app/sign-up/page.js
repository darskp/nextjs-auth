"use client"

import { registerUserAction } from "@/actions"
import { FormElement } from "@/components/common/formElement/page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { registrationFormInitials, userRegistrationFormControls } from "@/util"
import { useState } from "react"

const SignUp = () => {
    const [signupFormData, setsignUpFormData] = useState(registrationFormInitials);

    const handleDisabledForm=()=>{
        return Object.values(setsignUpFormData).every((key)=>key.trim()!=="");
    }

    const handleSubmit=async()=>{
        const result= await registerUserAction(signupFormData);
        console.log(result)
    }
    return (
        <div className="max-w-full min-h-screen">
         <div className="flex justify-start p-5">
                <h2 className="font-bold text-2xl">Sign Up</h2>
            </div>
            <form action={handleSubmit}>
                <div className="w-3/4 grid gap-4 items-start justify-start py-4 border border-red-500">
                    {
                        userRegistrationFormControls ? userRegistrationFormControls?.map((controlItem, index) => (
                            <div className="grid grid-cols-4 items-center border border-green-400 gap-4" key={controlItem.id}>
                                <Label htmlFor={controlItem.name} className="text-right">
                                    {controlItem?.label}
                                </Label>
                                <FormElement
                                    controlItem={controlItem}
                                    value={signupFormData[controlItem?.name]}
                                    onChange={(e) => {
                                        setsignUpFormData((pre) => {
                                            const { name, value } = e?.target;
                                            return ({ ...pre, [name]: value })
                                        })
                                    }}
                                />
                            </div>
                        )) : null
                    }
                <Button type="submit" disabled={!handleDisabledForm()} className="disabled:opacity-20 w-fit">Button</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp