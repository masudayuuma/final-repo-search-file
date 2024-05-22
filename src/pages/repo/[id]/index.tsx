import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import styles from '@/styles/styles.module.css'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Repository {
  name: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  owner: {
    avatar_url: string;
  };

}


const RepositoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchRepositoryData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repositories/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRepository(data);
        }
      } catch (error) {
        console.error("レポジトリデータの取得はできませんでした",error);
      }
    };
    if (id) {
      fetchRepositoryData();
    }
  }, [id]);

  return (
    <>
    <Header />
    <main className={styles.main}>
    <div>
      <h1>Repository詳細</h1>
      {repository ? (
        <div>
          <p>リポジトリ名: {repository.name}</p>
          <p>オーナーアイコン: </p>
          <Link href={repository.html_url}>
          <img src={repository.owner.avatar_url} alt="ユーザーアイコン" />
          </Link>
          <p>プロジェクト言語: {repository.language}</p>
          <p>Star数: {repository.stargazers_count}</p>
          <p>Watcher数: {repository.watchers_count}</p>
          <p>Fork数: {repository.forks_count}</p>
          <p>Issues数: {repository.open_issues_count}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </main>
    <Footer />
    </>
  );
}

export default RepositoryPage;
