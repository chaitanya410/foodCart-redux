import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.heroSection}>
      <div className={classes.bentoContainer}>
        {/* Main Left Glass Bento */}
        <div className={classes.primaryGlassCard}>
          <div className={classes.topBadges}>
            <span className={classes.livePill}>
              <span className={classes.dot}></span> DROP LIVE • 22 MIN DELIVERY
            </span>
            <span className={classes.promoPill}>CODE: CRAVE50</span>
          </div>

          <h1 className={classes.heroTitle}>
            Midnight Munchies &amp;{' '}
            <span className={classes.neonGradient}>Chef-Grade Drops.</span>
          </h1>

          <p className={classes.heroSubtitle}>
            Handcrafted dum biryanis, double-stacked smash burgers, wood-fired
            pizzas &amp; molten desserts—delivered piping hot in frosted-fresh
            packaging.
          </p>

          <div className={classes.metricsStrip}>
            <div className={classes.metricBox}>
              <strong>22 min</strong>
              <span>Avg Drop Time</span>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.metricBox}>
              <strong>4.9 ★</strong>
              <span>Verified Rating</span>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.metricBox}>
              <strong>₹0 Fee</strong>
              <span>Orders Above ₹499</span>
            </div>
          </div>
        </div>

        {/* Right Visual Food Showcase Card */}
        <div className={classes.visualShowcaseCard}>
          <img
            src="/home_banner.jpg"
            alt="Signature gourmet spread"
            className={classes.showcaseImg}
          />
          <div className={classes.imgOverlay}></div>

          <div className={classes.floatingTopTag}>
            🔥 #1 Trending Tonight
          </div>

          <div className={classes.floatingGlassCard}>
            <div className={classes.dishPreviewThumb}>
              <img src="/images/biryani.jpeg" alt="Royal Biryani" />
            </div>
            <div className={classes.dishPreviewInfo}>
              <span className={classes.previewEyebrow}>CHEF&apos;S PICK</span>
              <h4>Smoky Hyderabadi Dum Feast</h4>
              <span className={classes.previewMeta}>Freshly sealed • Extra raita included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Flavor Marquee */}
      <div className={classes.marqueeWrapper}>
        <div className={classes.marqueeTrack}>
          <span>🔥 SMOKY DUM BIRYANI</span>
          <span>•</span>
          <span>🍔 DOUBLE SMASH BURGERS</span>
          <span>•</span>
          <span>🍕 WOOD-FIRED THIN CRUST</span>
          <span>•</span>
          <span>🥪 BOMBAY MASALA GRILL</span>
          <span>•</span>
          <span>🍱 ROYAL VEG THALI</span>
          <span>•</span>
          <span>🧁 BELGIAN LAVA PASTRIES</span>
          <span>•</span>
          <span>🔥 SMOKY DUM BIRYANI</span>
          <span>•</span>
          <span>🍔 DOUBLE SMASH BURGERS</span>
          <span>•</span>
          <span>🍕 WOOD-FIRED THIN CRUST</span>
          <span>•</span>
          <span>🥪 BOMBAY MASALA GRILL</span>
          <span>•</span>
          <span>🍱 ROYAL VEG THALI</span>
          <span>•</span>
          <span>🧁 BELGIAN LAVA PASTRIES</span>
        </div>
      </div>
    </section>
  );
};

export default MealsSummary;