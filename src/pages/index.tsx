import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import styles from '@/styles/styles.module.css';
import Link from 'next/link';
import { usernameState, emailState } from '@/utils/atom';

export default function Signup() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [email, setEmail] = useRecoilState(emailState);

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
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
            <Link href={`/home`} className={styles.button}>
                Signup
            </Link>
        </main>
    );
}

