import { Button } from "./button";
import Link from 'next/link'

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between px-4 max-w-7xl w-full m-auto">
        <Link href={"/"} className="text-2xl flex flex-col justify-center font-bold text-blue-600">
                PayZee
        </Link>
        <div className="flex flex-col justify-center pt-2">
            {
                user ? (
                    <Button onClick={() => onSignout({ callbackUrl: '/', redirect:true })}> Logout</Button>
                ):
                (
                    <div className="flex gap-4">
                        <Link href='/login'>
                            <Button onClick={() => {}}>Sign Up</Button>
                        </Link>
                        <Link href='/signup'>
                            <Button onClick={() => {}}>Join Payzee</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    </div>
}