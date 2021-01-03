import styles from "./mega-banner.module.scss";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const type = "1";

function MegaBanner() {
  return (
    <div id={siteId}>
      {isProduction ? (
        <>
          <script src={`//ads.themoneytizer.com/s/gen.js?type=${type}`} />
          <script
            src={`//ads.themoneytizer.com/s/requestform.js?siteId=${siteId}&formatId=${formatId}`}
          />
        </>
      ) : (
        <div className={styles.megaBanner}>Mega Banner</div>
      )}
    </div>
  );
}

export default MegaBanner;
