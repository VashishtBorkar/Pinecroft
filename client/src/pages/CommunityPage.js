import { useContext, useEffect, useState } from 'react';
import { useParams } from'react-router-dom';  // Assuming you're using react-router-dom
import { UserContext } from '../components/Login/UserContext';
import PostCard from '../components/PostCard';
import axios from 'axios';

function formatMarketCap(num) {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9)  return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6)  return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}

function formatVolume(num) {
  return num.toLocaleString();
}

function FundamentalItem({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-base font-medium text-white">{value}</span>
    </div>
  );
}
function CommunityPage() {
  const { id: communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [stockData, setStockData] = useState({
    price: 0,
    change: 0,
    changePercent: 0,
    yearHigh: 0,
    yearLow: 0,
    marketCap: 0,
    volume: 0,
    eps: 0,
    pe: 0,
  });

  // const stockData = {
  //   price: 199.03,
  //   change: 2.78,
  //   changePercent: 1.41656,
  //   yearHigh: 260.1,
  //   yearLow: 169.21,
  //   marketCap: 2976407717580,
  //   volume: 32435062,
  //   eps: 7.09,
  //   pe: 28.07,
  // };
  

  const fetchCommunity = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/communities/${id}`);  
        console.log("Fetched community:", response.data);
        setCommunity(response.data);

        if (user && user.id) {
          setIsMember(response.data.members.includes(user.id));
        }

        if (response.data.ticker) {
          fetchStock(response.data.ticker);
        }

    } catch(err){
        console.error("Failed to fetch community", err);
    }
  }

  const fetchStock = async (ticker) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/stocks/${ticker}`
      );

      setStockData({
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        yearHigh: data.yearHigh,
        yearLow: data.yearLow,
        marketCap: data.marketCap,
        volume: data.volume,
        eps: data.eps,
        pe: data.pe,
      });
    } catch (err) {
      console.error('Failed to fetch stock data', err);
    }
  };
    
  const toggleMembership = async() => {
    setIsMember(prevState => !prevState);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/communities/${communityId}/membership`, 
        {}, 
        { withCredentials: true }
      );
      
      // Update with actual server response
      setIsMember(response.data.isMember);
      
      // Update community member count if needed
      setCommunity(prev => ({
        ...prev,
        members: Array.isArray(prev.members) 
          ? (response.data.isMember 
            ? [...prev.members, user.id] 
            : prev.members.filter(id => id !== user.id))
          : prev.members
      }));

    } catch (err) {
      console.error("Failed to toggle community membership", err);
      // Revert the optimistic update on error
      setIsMember(prevState => !prevState);
    }
  }

  const fetchPosts = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/posts/community/${communityId}?page=${page}&limit=10`,
        {withCredentials: true}
      );
      const newPosts = res.data.posts;

      setPosts((prev) => {
        const combined = [...prev, ...newPosts];
        const unique = Array.from(new Map(combined.map(p => [p._id, p])).values());
        return unique;
      });

      setHasNextPage(res.data.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
      if (communityId) {
      fetchCommunity(communityId);
      setPosts([]);      // clear previous posts if navigating between communities
      setPage(1);
      setHasNextPage(true);
      }
    }, [communityId]);

    useEffect(() => {
        if (communityId) {
          fetchPosts(); // initial fetch
        }
      }, [communityId, user]);
    

    if (!community) {
        return <div>Loading community...</div>;
    }

    return (
      <div className="max-w-3xl px-4">
        <div className="flex w-full justify-between mb-2">
        {/* Top header: name, price, change, join button */}
          <span className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold text-gray-200">
              {community.name} 
            </h1>
            <h1 className='text-3xl text-gray-400'>| {community.ticker} </h1>
          </span>

          {/* Join Button */}
          <button
            className={`border-2 rounded-full px-4 py-2 font-bold transition ${isMember ? 'border-red-400 text-red-400 hover:bg-red-200' : 'border-green-400 text-green-400 hover:bg-green-200'}`}
            onClick={toggleMembership}
          >
            {isMember ? 'Leave' : 'Join'}
          </button>
        </div>

        {/* <div className="h-px bg-border-color my-6" /> */}

        <div className='flex justify-items-center my-4'>
          <div className=''>
            <div className="text-2xl font-semibold text-white">
              ${stockData.price.toFixed(2)}
            </div>
            <div className={`text-lg font-medium ${stockData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
            </div>
          </div>
          
          

          {/* Stock details below description */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mb-6 justify-items-center items-center">
            <FundamentalItem label="Mkt Cap" value={formatMarketCap(stockData.marketCap)} />
            <FundamentalItem label="Volume" value={formatVolume(stockData.volume)} />
            <FundamentalItem label="52W High" value={`$${stockData.yearHigh.toFixed(2)}`} />
            <FundamentalItem label="52W Low" value={`$${stockData.yearLow.toFixed(2)}`} />
            <FundamentalItem label="PE Ratio" value={stockData.pe.toFixed(2)} />
            <FundamentalItem label="EPS" value={stockData.eps.toFixed(2)} />
          </div>
        </div>

        <div className="h-px bg-border-color my-6" />

        

        {posts.length === 0 && !loading && (
        <p className="text-center text-gray-400 mt-6">No posts yet in this community.</p>
        )}

        {posts.map((post) => (
        <div key={post._id}>
            <PostCard post={post} />
            <div className="h-px bg-border-color my-4" />
        </div>
        ))}

        {loading && (
            <p className="text-center text-gray-400 mt-4">Loading...</p>
        )}

        {posts.length > 0 && !loading && hasNextPage && (
        <button
          onClick={fetchPosts}
          className="block mx-auto mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
        >
          Load More
        </button>
        )}



        {!hasNextPage && (
          <p className="text-center text-gray-500 mt-6">You’ve reached the end</p>
        )}

      </div>
    );

}

export default CommunityPage;