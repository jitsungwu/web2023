//測試內容移到/test下
import styles from './page.module.css'
import ProductList from '@/app/product/productList'
export default function Home() {
  return (<div className={styles.main}>
    <ProductList />
  </div>)
}
