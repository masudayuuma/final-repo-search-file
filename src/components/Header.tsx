import Link from "next/link";
import styles from '@/styles/styles.module.css';
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { usernameState, userState } from "@/utils/atom";

export const Header: React.FC = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const username = useRecoilValue(usernameState);

  useEffect(() => {
    if (username) {
      axios.get(`https://api.github.com/users/${username}`)
        .then((res) => { setUserData(res.data) })
        .catch((error) => console.error(error));
    }
  }, [username]);

  return (
    <header>
      <div className={styles.header}>
        <Link href="/home">
          <p>&larr; 戻る</p>
        </Link>
        {userData && userData.avatar_url && (
          <Link href={`/myacount/${username}`}>
            <img src={userData.avatar_url} alt="アイコン" className={styles.headerIcon} />
          </Link>
        )}
      </div>
    </header>
  );
};
