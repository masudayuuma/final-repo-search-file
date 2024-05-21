import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { search } from "@/utils/utils";
import React, { useState, ChangeEvent } from "react";
// import { search } from "../../utils";
// import Results from "../../components/Results";
import styles from '@/styles/styles.module.css';
import Results from "@/components/repoans";
// import { Header } from "../../components/Header";
// import { Footer } from "../../components/Footer";

const RepositoriesSearch: React.FC = () => {
  const [repositories, setRepositories] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1); // ページ番号を管理する状態

  const performSearch = async (val: string, page: number = 1) => {
    setLoading(true);
    const items = await search(
      `https://api.github.com/search/repositories?q=${val}&per_page=20&page=${page}`
    );
    setRepositories(items);
    setLoading(false);
  };

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1); // 検索クエリが変更されたらページをリセット
    performSearch(e.target.value, 1);
    setValue(e.target.value);
  };

  const onPageChange = async (newPage: number) => {
    setPage(newPage);
    performSearch(value, newPage);
  };

  const renderRepositories = () => {
    if (!repositories) {
      return <h1>検索結果はありません</h1>;
    }
    return (
      <>
        <Results repositories={repositories} />
        <div className={styles.pagination}>
          <button 
            onClick={() => onPageChange(page - 1)} 
            disabled={page === 1}
          >
            前のページ
          </button>
          <span>ページ {page}</span>
          <button onClick={() => onPageChange(page + 1)}>
            次のページ
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <input
          value={value}
          onChange={e => onChangeHandler(e)}
          placeholder="調べ物はなんですか"
          className={styles.input}
        />
        {loading ? <h3>Loading...</h3> : renderRepositories()}
      </main>
      <Footer />
    </>
  );
}

export default RepositoriesSearch;
