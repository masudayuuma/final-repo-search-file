import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/styles.module.css';
// import { Footer } from '@/components/Footer';
import { useRecoilValue } from 'recoil';
import { usernameState } from '@/utils/atom'; // パスを確認してください
import { Footer } from '@/components/Footer';

export default function Home() {
  const username = useRecoilValue(usernameState);

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Repositories Search</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {username}ようこそ
        </h1>

        <p className={styles.description}>
          Githubにあるリポジトリを検索できます
        </p>

        <div className={styles.grid}>
          <Link href={`/myacount/${username}`} className={styles.card}>
              <h3>Acount &rarr;</h3>
              <p>あなたのアカウントページへ</p>
          </Link>

          <Link href="/search" className={styles.card}>
              <h3>Repositories &rarr;</h3>
              <p>あなたにぴったりのリポジトリ探しましょう</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
