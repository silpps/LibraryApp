import { useEffect, useState } from "react";
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;


const Filter = ({ onFilterChange, refreshFilters }) => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [readingStatusFilter, setReadingStatusFilter] = useState('all');
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);


    useEffect(() => {
        const fetchFilterData = async () => {
            const userDataString = localStorage.getItem('userData');
        if (!userDataString) throw new Error('Data not found in localstorage (login again?)');
  
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const path = location.pathname === '/library'
        ? `${apiUrl}/library/userLibrary/filter/lib`
        : `${apiUrl}/library/userLibrary/filter/wish`;

            try {
                const res = await fetch(path, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

                const data = await res.json();
                setCategories(data.categories);
                setAuthors(data.authors);  
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };
        fetchFilterData();
    }, [refreshFilters]);

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        onFilterChange({ category: e.target.value, author: authorFilter, readingStatus: readingStatusFilter });
      };
    
      const handleAuthorChange = (e) => {
        setAuthorFilter(e.target.value);
        onFilterChange({ category: categoryFilter, author: e.target.value, readingStatus: readingStatusFilter });
      };
    
      const handleReadingStatusChange = (e) => {
        setReadingStatusFilter(e.target.value);
        onFilterChange({ category: categoryFilter, author: authorFilter, readingStatus: e.target.value });
      };

      const handleResetFilters = () => {
        setCategoryFilter('');
        setAuthorFilter('');
        setReadingStatusFilter('all');
        onFilterChange({ category: '', author: '', readingStatus: 'all' });
      };

    return (
        <div >
                    <h2>Filters</h2>
                    <div className='filter'>
                        <label htmlFor="category"><strong>Category:  </strong></label>
                        <select value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                            {category}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className='filter'>
                        <label htmlFor="author"><strong>Author:  </strong></label>
                        <select value={authorFilter} onChange={handleAuthorChange}>
                            <option value="">All</option>
                            {authors.map((author) => (
                                <option key={author} value={author}>
                                {author}
                            </option>
                                ))}
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="readingStatus"><strong>Reading Status:</strong></label>
                        <select value={readingStatusFilter} onChange={handleReadingStatusChange}>
                            <option value="all">All</option>
                            <option value="reading">Reading</option>
                            <option value="notReading">Not Reading</option>
                            </select>
                    </div>

                    <button onClick={handleResetFilters
                        }>Reset Filters</button>
                </div>
    );
}
export default Filter;