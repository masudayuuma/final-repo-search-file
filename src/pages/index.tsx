import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '@/styles/styles.module.css';
import Link from 'next/link';
import { usernameState, emailState } from '@/utils/atom';

export default function Signup() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [email, setEmail] = useRecoilState(emailState);
    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (e.target.value) {
            setError(null);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSignupClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!username) {
            e.preventDefault();
            setError("名前を入力してください");
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>Signup Page</h1>
            <input
                className={styles.input}
                type="text"
                placeholder="GitHub Username"
                value={username}
                onChange={handleUsernameChange}
            />
            <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Link href={`/home`} className={styles.button} onClick={handleSignupClick}>
                Signup
            </Link>
        </main>
    );
}

