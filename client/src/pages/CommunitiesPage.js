import { useEffect, useState } from "react";
import axios from "axios";
import CommunityCard from "../components/CommunityCard";

function CommunitiesPage() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/communities")
      .then((res) => {
        console.log("Fetched communities:", res.data); // Debug log
        setCommunities(res.data);
      })
      .catch((err) => console.error("Error fetching communities:", err));
  }, []);


  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-gray-300 mb-6">Communities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((c) => (
          <CommunityCard
            key={c._id}
            name={c.name}
            description={c.description}
            members={c.members}
            trending={c.trending}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunitiesPage;
