import { createContext, ReactNode, useContext, useMemo, useState } from "react";

const initialGroups = [
  {
    id: 1,
    name: "group1",
    createdDate: "26/5/2024 19:40:32",
    groupMembers: 2000,
    groupType: "public",
    groupDescription: "this is a public group",
    groupCoverImage: "https://media.istockphoto.com/id/2184065582/photo/letter-p.webp?a=1&b=1&s=612x612&w=0&k=20&c=5nyQ0pqSaDUQbPAlQtqOUZrXPkxkF3U2BFppdmK04mc=",
    lastUpdated: "26/5/2024 19:40:32",
  },
  {
    id: 2,
    name: "group2",
    createdDate: "19/7/2024 19:40:32",
    groupMembers: 500,
    groupType: "market",
    groupDescription: "this is a market group",
    groupCoverImage: "https://images.unsplash.com/photo-1482518959754-849528791087?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0b3JlfGVufDB8fDB8fHww",
    lastUpdated: "19/7/2024 19:40:32",
  },
  {
    id: 3,
    name: "group3",
    createdDate: "06/3/2024 19:40:32",
    groupMembers: 10000,
    groupType: "grocery shop",
    groupDescription: "this is a grocery store updates group",
    groupCoverImage: "https://media.istockphoto.com/id/848188628/photo/fast-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=RD_B54CFqd6Qm_PI18K7isqGcpN-udHn-bicIw4rqsI=",
    lastUpdated: "06/3/2024 19:40:32",
  },
  
  {
    id: 4,
    name: "group4",
    createdDate: "11/5/2023 19:40:32",
    groupMembers: 7000,
    groupType: "mustache",
    groupDescription: "this is a mustache sales and offers group,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    groupCoverImage: "https://images.unsplash.com/photo-1637228393246-c38a4b3d2011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoZXMlMjBzaG9wfGVufDB8fDB8fHww",
    lastUpdated: "11/5/2023 19:40:32",
  },
  {
    id: 5,
    name: "group5",
    createdDate: "14/1/2024 19:40:32",
    groupMembers: 20000,
    groupType: "news",
    groupDescription: "this is a news group",
    groupCoverImage: "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    lastUpdated: "14/1/2024 19:40:32",
  },
];

// Define context value type
interface GroupContextType {
  groups: typeof initialGroups;
  updateGroup: (groupId: number, updatedFields: Partial<typeof initialGroups[number]>) => void;
  deleteGroup: (groupId: number) => void;
  createGroup:(groupFields:Partial<typeof initialGroups[number]>)=>void
}

// Create the context
const GroupContext = createContext<GroupContextType | undefined>(undefined);

// Provider props type
interface GroupProviderProps {
  children: ReactNode;
}

// Provider component
export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState(initialGroups);

  // Function to update group fields with error handling
  const updateGroup = (groupId: number, updatedFields: Partial<typeof initialGroups[number]>) => {
    const currentDate = new Date().toLocaleString();

    if (!updatedFields || !Object.keys(updatedFields).length) {
      console.error("Invalid update fields");
      return;
    }

    setGroups((prevGroups) => {
      const groupExists = prevGroups.some((group) => group.id === groupId || group.name === updatedFields.name);
      if (!groupExists) {
        console.error(`Group with id ${groupId} not found or group name already exist`);
        return prevGroups;
      }
      console.log(groupId,updatedFields)
      return prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, ...updatedFields, lastUpdated: currentDate }
          : group
      );
      
    });
  };
  const createGroup = (groupdFields: Partial<typeof initialGroups[number]>) => {
    const currentDate = new Date().toLocaleString();

    if (!groupdFields || !Object.keys(groupdFields).length) {
      console.error("Invalid fields");
      return "Invalid fields";
    }

    setGroups((prevGroups) => {
      const groupExists = prevGroups.some((group) => group.name === groupdFields.name);
      if (groupExists) {
        console.error(`Group with name ${groupdFields.name} already exist`);
        return prevGroups;
      }
      return [...prevGroups, { ...groupdFields, id: prevGroups.length + 1,createdDate:currentDate,lastUpdated:currentDate}]

    });
  };

  const deleteGroup=(groupId:number)=>{
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId));
  }

  const contextValue = useMemo(() => ({ groups, updateGroup,deleteGroup,createGroup }), [groups]);

  return (
    <GroupContext.Provider value={contextValue}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom hook to use the context
export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};