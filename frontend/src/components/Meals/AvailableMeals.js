import { useEffect, useState, useMemo } from 'react';
import MealItem from './MealItem/MealItem';
import MealsSummary from './MealsSummary';
import Loading from '../UI/Loading';
import classes from './AvailableMeals.module.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AvailableMeals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/meals`);
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((m) => m.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [products]);

  const filteredMeals = useMemo(() => {
    const list = products.filter((meal) => {
      const matchesCategory =
        selectedCategory === 'All' || meal.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        meal.name?.toLowerCase().includes(q) ||
        meal.restaurant?.toLowerCase().includes(q) ||
        meal.description?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'rating') {
      return [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (sortBy === 'priceLow') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <>
      <MealsSummary />

      <section className={classes.mealsSection}>
        <div className={classes.toolbar}>
          <div>
            <span className={classes.eyebrow}>CURATED MENU</span>
            <h2 className={classes.heading}>What Are You Craving? 🔥</h2>
          </div>

          <div className={classes.controlsRight}>
            <div className={classes.searchBox}>
              <span className={classes.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search biryani, pizza, burgers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classes.searchInput}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className={classes.clearBtn}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={classes.sortSelect}
              aria-label="Sort meals"
            >
              <option value="featured">✨ Featured</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="priceLow">💸 Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className={classes.categoryBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`${classes.catPill} ${
                selectedCategory === cat ? classes.catPillActive : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <Loading />
        ) : filteredMeals.length === 0 ? (
          <div className={classes.emptyState}>
            <h3>No cravings matched &ldquo;{searchTerm}&rdquo;</h3>
            <p>Try switching categories or clearing your search.</p>
          </div>
        ) : (
          <ul className={classes.mealsGrid}>
            {filteredMeals.map((meal) => (
              <MealItem
                key={meal._id}
                id={meal._id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                restaurant={meal.restaurant}
                image={meal.image}
                rating={meal.rating}
                category={meal.category}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default AvailableMeals;