"use client"

import { loginUserAction } from "@/actions"
import { FormElement } from "@/components/common/formElement/page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loginFormInitials, userLoginFormControls } from "@/util"
import { useState } from "react"

const SignIn = () => {
  const [signInFormData, setsignInFormData] = useState(loginFormInitials);

  const handleDisabledForm = () => {
    return Object.values(setsignInFormData).every((key) => key.trim() !== "");
  }

  const handleSubmit = async () => {
    const result = await loginUserAction(signInFormData);
    console.log(result)
  }

  return (
    <div className="max-w-full min-h-screen">
      <div className="flex justify-start p-5">
        <h2 className="font-bold text-2xl">Sign In</h2>
      </div>
      <form action={handleSubmit}>
        <div className="w-3/4 grid gap-4 items-start justify-start py-4 border border-red-500">
          {
            userLoginFormControls ? userLoginFormControls?.map((controlItem, index) => (
              <div className="grid grid-cols-4 items-center border border-green-400 gap-4" key={controlItem?.id}>
                <Label htmlFor={controlItem?.name} className="text-right">
                  {controlItem?.label}
                </Label>
                <FormElement
                  controlItem={controlItem}
                  value={signInFormData[controlItem?.name]}
                  onChange={(e) => {
                    setsignInFormData((pre) => {
                      const { name, value } = e?.target;
                      return ({ ...pre, [name]: value })
                    })
                  }}
                />
              </div>
            )) : null
          }
          <Button type="submit" disabled={!handleDisabledForm()} className="disabled:opacity-20 w-fit">Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn