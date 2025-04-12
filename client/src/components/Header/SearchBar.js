import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


function SearchBar(){
    return(
        <div className="flex-grow flex max-w-lg justify-center">
            <form className="flex p-1 w-full max-w-lg bg-gray-800 rounded-full items-center"> 
                <MagnifyingGlassIcon className="h-4 w-4 ml-2 text-text-color "/> 
                <input 
                    type="text" 
                    className="h-7 px-2 bg-transparent text-text-color text-sm w-full" 
                    placeholder="Search for a Stock..." 
                    />
            </form>
        </div>
        
    )
}

export default SearchBar;
