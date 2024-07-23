"use client"
import TextField from '@repo/ui/TextField'
import Link from 'next/link'
import { useState } from 'react'

const Login = () => {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const [showPassword,setShowPassword] = useState(false)

    return <div className="flex items-center justify-center min-h-screen w-full p-4">
    <div className="flex flex-col items-center justify-center max-w-[28rem]">
            <p className="font-sans text-3xl text-center">Join & Connect the Fastest Growing Online Community</p>
            <div className="flex flex-col gap-6 w-full mt-12">    
                <TextField type='string' placeholder='Email' onChange={(data) => setFormData({...formData,
                    email:data
                })}/>
                <TextField type='password' placeholder='Password' onChange={(data) => setFormData({...  formData,
                password:data
                })} isPasswordVisible={showPassword} togglePasswordVisibility={() => setShowPassword(!showPassword)} />
            </div>
            <p className='text-xs mt-12'>No Account yet? <Link href="/signin" className='text-sm font-bold'>
            SIGN UP</Link></p>
    </div>
</div>
}

export default Login