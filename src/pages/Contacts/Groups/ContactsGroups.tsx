import { useState } from "react";

import { useGroup } from "../../../contexts/GroupsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GroupCard from "../../../components/GroupCard";

function ContactsGroup() {
  const { groups } = useGroup();
  const [filteredGroups, setFilteredGroups] = useState(groups); // State to hold filtered groups

  const handleGroupSearch = (e) => {
    const searchFor = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    const filtered = groups.filter(
      (group) => group.name.toLowerCase().includes(searchFor) // Check if group name includes the search string
    );
    setFilteredGroups(filtered);
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-12">
      <div className="p-3 text-base flex items-center gap-10 flex-wrap sm:text-xs md:text-m lg:text-lg">
        <h1 className="dark:text-slate-50 text-[#4c5c68]">My Groups</h1>
        <div className="flex py-3 px-4 w-72 gap-2 items-center dark:bg-gray-700 bg-[#1985a1] rounded-3xl">
          <FontAwesomeIcon icon={faSearch} className="text-gray-200" />
          <input
            className="dark:bg-gray-700 text-white bg-[#1985a1] text-md focus:outline-none"
            placeholder="search group.."
            onChange={handleGroupSearch} // Trigger search logic on input change
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center pb-14">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => <GroupCard key={group.id} group={group} />)
        ) : (
          <p className="text-gray-500 text-lg">No groups found</p> // Display a message if no groups match
        )}
      </div>
    </div>
  );
}

export default ContactsGroup;
