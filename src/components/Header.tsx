import Link from "next/link";
import styles from '@/styles/styles.module.css';
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { usernameState, userDataState } from "@/utils/atom";
import { useRouter } from 'next/router';

export const Header: React.FC = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const username = useRecoilValue(usernameState);
  const router = useRouter();

  useEffect(() => {
    if (username) {
      axios.get(`https://api.github.com/users/${username}`)
        .then((res) => { setUserData(res.data) })
        .catch((error) => console.error("ユーザーデータが取得できませんでした", error));
    }
  }, [username]);

  const goBack = () => {
    router.back();
  };

  return (
    <header>
      <div className={styles.header}>
        <button onClick={goBack} className={styles.backButton}>
          &larr; 戻る
        </button>
        {userData && userData.avatar_url && (
          <Link href={`/myAccount/${username}`}>
            <img src={userData.avatar_url} alt="アイコン" className={styles.headerIcon} />
          </Link>
        )}
      </div>
    </header>
  );
};
