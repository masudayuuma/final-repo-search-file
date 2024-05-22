import React from "react";
import styles from '@/styles/styles.module.css'
import Link from 'next/link';
import { truncStr } from "@/utils/utils";

interface RepositoryProps {
  item: {
    full_name: string;
    html_url: string;
    id: number;
  };
}

const Repository: React.FC<RepositoryProps> = ({ item }) => {
  const { full_name, html_url, id } = item;

  return (
    <Link href={`/repo/${id}`} className={styles.repo}>
        <div className={styles.dFlex}>
          <div>
            <h3>{truncStr(full_name, 30)}</h3>
            <p>{truncStr(html_url, 40)}</p>
          </div>
        </div>
    </Link>
  );
};

interface ResultsProps {
  repositories: Array<{ full_name: string; html_url: string; id: number }>;
}

export const Results: React.FC<ResultsProps> = ({ repositories }) => {
  let cards: JSX.Element | JSX.Element[] = <h3>Loading...</h3>;

  if (repositories && repositories.length > 0) {
    cards = repositories.map((m, i) => <Repository key={i} item={m} />);
  }
  return (
    <div className={styles.grid}>
      {cards}
    </div>
  );
};

export default Results;

