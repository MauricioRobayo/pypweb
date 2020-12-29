import styles from "./mega-banner.module.scss";

const isProduction = process.env.NODE_ENV === "production";
const id = "71116-1";

export default () => (
  <div id={id}>
    {isProduction ? (
      <>
        <script src="//ads.themoneytizer.com/s/gen.js?type=1" />
        <script src="//ads.themoneytizer.com/s/requestform.js?siteId=71116&formatId=1" />
      </>
    ) : (
      <div className={styles.megaBanner}>Mega Banner</div>
    )}
  </div>
);
