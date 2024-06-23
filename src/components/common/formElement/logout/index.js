"use client"
import { logoutAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const { toast } = useToast();
    const router = useRouter()

    const handleLogout = async () => {
        const result = await logoutAction();
        toast({
            title: result?.message
        })
        if (result?.success) {
            router.push('/sign-in');
        }
    }

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default Logout