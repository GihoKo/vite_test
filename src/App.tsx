import { useEffect, useState } from "react";
import "./App.css";
import { UserResponse } from "./test/mocks/handler";

function App() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user");
            if (!response.ok) throw new Error("에러 발생");
            const data = await response.json();
            setUser(data);
        } catch (error) {
            if (error instanceof Error) setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error...</div>;

    return (
        <>
            {user && (
                <div>
                    <h1>User</h1>
                    <p>Username: {user.username}</p>
                </div>
            )}
        </>
    );
}

export default App;
