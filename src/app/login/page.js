'use client'
import {signIn} from 'next-auth/react'
import Image from "next/image"
import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)

    async function handleFormSubmit(e){
        e.preventDefault()
        
        await signIn('credentials', {email, password, callbackUrl:'/'})

        
        setLoginInProgress(false)
    }
    return (
        <section className="mt-24">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>

            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email}
                    disabled={loginInProgress}
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" name="password" placeholder="password" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button disabled={loginInProgress} type="submit">Login</button>

                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div> 
                <button type='button' onClick={()=> signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center items-center">
                    <Image src={'/google.png'} alt="google" width={24} height={24} />
                    Login with Google
                </button>
            </form>
        </section>
    )
}