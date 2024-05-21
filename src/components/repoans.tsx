// import React from "react";
// import styles from '../styles/styles.module.css'
// import Link from 'next/link';

// interface RepositoryProps {
//   item: {
//     full_name: string;
//     html_url: string;
//     id: number;
//   };
// }

// const Repository: React.FC<RepositoryProps> = ({ item }) => {
//   const { full_name, html_url, id } = item;

//   return (
//     <Link href={`/repo/${id}`} className={styles.repo}>
//         <div className={styles.dFlex}>
//           <div>
//             <h3>{full_name}</h3>
//             <p>{html_url}</p>
//           </div>
//         </div>
//     </Link>
//   );
// };

// interface ResultsProps {
//   repositories: any[];
// }

// export const Results: React.FC<ResultsProps> = ({ repositories }) => {
//   let cards = <h3>Loading...</h3>;

//   if (repositories) {
//     cards = repositories.map((m, i) => <Repository key={i} item={m} />);
//   }
//   return (
//     <div className={styles.grid}>
//       <div className={styles.grid}>{cards}</div>
//     </div>
//   );
// };

// export default Results;

import React from "react";
import styles from '@/styles/styles.module.css'
import Link from 'next/link';

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
            <h3>{full_name}</h3>
            <p>{html_url}</p>
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

