import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import styles from "@/styles/styles.module.css";
import axios from "axios";
import { userDataState } from "@/utils/atom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Repo {
  id: number;
  full_name: string;
  html_url: string;
}

const MyAccount: React.FC = () => {
  // setUserDataを削除するとエラーが発生します
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userRepos, setUserRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (userData) {
      axios
        .get(userData.repos_url)
        .then((res) => setUserRepos(res.data))
        .catch((error) => console.error("リポジトリデータが取得できませんでした", error));
    }
  }, [userData]);

  // empty viewの追加
  if (!userData) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div>
            <h1>マイアカウント詳細</h1>
            <p>GitHubユーザー名を正しく入力してください</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <h1>マイアカウント詳細</h1>
          {userData && (
            <>
              <p>アカウント名 {userData.login}</p>
              <img src={userData.avatar_url} alt="image" />
              {userData && <p>フォロワー数: {userData.followers}</p>}
              {userData && <p>フォロー数: {userData.following}</p>}
              {userRepos && (
                <div>
                  <h2>レポジトリ一覧</h2>
                  {userRepos.length === 0 ? (
                    <p>リポジトリデータはありません</p>
                  ) : (
                    <ul>
                      {userRepos.map((repo) => (
                        <li key={repo.id}>
                          <Link href={repo.html_url}>{repo.full_name}</Link>
                        </li>
                      ))}
                    </ul>
                   )}
                </div>
                )}
              <p>マイアカウントページ {userData.url}</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyAccount;
