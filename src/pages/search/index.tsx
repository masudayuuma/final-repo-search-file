import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { search } from "@/utils/utils";
import React, { ChangeEvent, useEffect } from "react";
import styles from '@/styles/styles.module.css';
import Results from "@/components/repoans";
import { useRecoilState } from "recoil";
import { searchValueState, repositoriesState, pageState, hasMoreRepoState } from "@/utils/atom";

// リポジトリの型を定義します
type Repository = {
  full_name: string;
  html_url: string;
  id: number;
};

const RepositoriesSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [repositories, setRepositories] = useRecoilState<Repository[] | null>(repositoriesState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMoreRepo, setHasMoreRepo] = useRecoilState(hasMoreRepoState);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (searchValue) {
      performSearch(searchValue, page);
    }
  }, [searchValue, page]);

  const performSearch = async (val: string, page: number = 1) => {
    setLoading(true);
    const items: Repository[] = await search(
      `https://api.github.com/search/repositories?q=${val}&per_page=20&page=${page}`
    );
    setRepositories(items);
    setLoading(false);
    setHasMoreRepo(items && items.length === 20);
  };

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchValue(e.target.value);
  };

  const onPageChange = async (newPage: number) => {
    setPage(newPage);
  };

  const renderRepositories = () => {
    if (!searchValue ) {
      return <h1>検索してください</h1>;
    }
    else if (!repositories || repositories.length === 0) {
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
          <button 
            onClick={() => onPageChange(page + 1)}
            disabled={!hasMoreRepo || page === 5}
          >
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
          value={searchValue}
          onChange={onChangeHandler}
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

