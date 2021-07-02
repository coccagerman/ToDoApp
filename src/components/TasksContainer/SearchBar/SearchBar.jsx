import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/bi/search';

export default function SearchBar ({setSearchParams}) {
    return (
        <article className="searchBar">
            <div className="barContainer">
                <Icon icon={searchIcon} flip="horizontal" className='iconify'/>
                <input type="text" className="textBox" placeholder='Search task tittles' onChange={e => setSearchParams(e.target.value.toLowerCase())}/>
            </div>
        </article>
    )
}