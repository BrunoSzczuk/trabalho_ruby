
import styles from '../styles/Home.module.css'
import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1 className={styles['title-red']}>Albion da Deep Web</h1>

      <p>
        <Link
          href={{
            pathname: '/personagems',
          }}
        >
          <a>Personagem</a>
        </Link>
      </p>

      <p>
        <Link
          href={{
            pathname: '/classes',
          }}
        >
          <a>Classes</a>
        </Link>
      </p>
    </>
  )
}
