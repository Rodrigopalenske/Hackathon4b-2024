import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { validateToken } from '../utils/token';
import Loading from './Loading';

// HOC para proteger páginas
const PrivateRoute = ({ children, requiredPermissions }: any) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const cargo = localStorage.getItem('cargo');
        if (!token) {
            router.push('/');
        } else {
            const checkToken = async () => {
                const user = await validateToken(token);
                if (user) {
                    // Verifique as permissões do usuário
                    if (requiredPermissions && !requiredPermissions.some((permission: string) => user.cargo.includes(permission))) {
                        setHasPermission(false);
                        router.push('/dashboard'); // Redireciona caso não tenha permissão necessária
                    } else if (cargo !== 'admin' && !requiredPermissions.includes(cargo)) {
                        setHasPermission(false);
                        router.push('/dashboard'); // Redireciona se o cargo não for permitido
                    } else {
                        setHasPermission(true);
                    }
                } else {
                    localStorage.clear()
                    setHasPermission(false);
                    router.push('/'); // Redireciona caso o token não seja válido
                }
                setLoading(false);
            };

            checkToken();
        }
    }, [router, requiredPermissions]);

    if (loading) {
        return <Loading></Loading>; // Adicionar um loading melhor
    }

    if (!hasPermission) {
        return null; // Ou exibe uma mensagem de erro/sem permissão
    }

    return <>{children}</>; // Renderiza os filhos (a página protegida)
    };

export default PrivateRoute;
