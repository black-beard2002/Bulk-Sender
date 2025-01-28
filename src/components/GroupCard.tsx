import { useState } from "react";
import PropTypes from "prop-types";
import { useGroup } from "../contexts/GroupsProvider";
import CustomDropdown from "./CustomDropdown";
import { Image } from "lucide-react";

function GroupCard({ group,isTargeted }) {

  console.log(isTargeted)
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const { updateGroup, deleteGroup } = useGroup();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [newGroupName, setNewGroupName] = useState(group.name);
  const [newGroupType, setNewGroupType] = useState(group.groupType);
  const [newGroupMembers, setNewGroupMembers] = useState(group.groupMembers);
  const [newGroupDescription, setNewGroupDescription] = useState(
    group.groupDescription
  );
  const [newCoverImage, setNewCoverImage] = useState<string | null>(
    group.groupCoverImage
  );

  const editableList = [
    "group name",
    "group type",
    "members",
    "description",
    "cover image",
  ];

  const handleOnSelect = (item: string) => {
    setIsEditing(true);
    setEditingField(item);
  };

  const handleSave = () => {
    // Placeholder for save logic - you would typically call a context method or API here
    const updatedGroup = {
      name: newGroupName,
      groupType: newGroupType,
      groupMembers: newGroupMembers,
      groupDescription: newGroupDescription,
      groupCoverImage: newCoverImage,
    };
    setIsEditing(false);
    setEditingField(null);
    updateGroup(group.id, updatedGroup);
  };

  const handleGroupDelete = () => {
    const confirmDeletion = confirm(`are you sure you want to remove ${group.name} ?`)
    if (confirmDeletion) {
      deleteGroup(group.id);
      }
  };

  const renderEditField = () => {
    switch (editingField) {
      case "group name":
        return (
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="Enter new group name"
          />
        );
      case "group type":
        return (
          <input
            type="text"
            value={newGroupType}
            onChange={(e) => setNewGroupType(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="Enter new group type"
          />
        );
      case "members":
        return (
          <input
            type="number"
            value={newGroupMembers}
            onChange={(e) => setNewGroupMembers(Number(e.target.value))}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="Enter number of members"
          />
        );
      case "description":
        return (
          <textarea
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="Enter new description"
            rows={3}
          />
        );
      case "cover image":
        return (
          <input
            type="text"
            value={newCoverImage}
            onChange={(e) => setNewCoverImage(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new cover image URL"
          />
        );
      default:
        return null;
    }
  };

  const renderDescription = () => {
    if (group.groupDescription.length > 15 && !isDescriptionExpanded) {
      const words = group.groupDescription.split(" ");
      const preview = words.slice(0, 5).join(" ");
      return (
        <span>
          {preview}...
          <span
            onClick={() => setIsDescriptionExpanded(true)}
            className="font-sans text-sm font-normal text-blue-400 dark:text-slate-300 hover:text-blue-700 cursor-pointer leading-relaxed text-inherit antialiased"
          >
            Read more
          </span>
        </span>
      );
    }

    return (
      <span>
        {group.groupDescription}
        {isDescriptionExpanded && (
          <span
            onClick={() => setIsDescriptionExpanded(false)}
            className="font-sans text-sm text-slate-300 font-normal hover:text-blue-700 cursor-pointer leading-relaxed text-inherit antialiased"
          >
            ..Show less
          </span>
        )}
      </span>
    );
  };

  return (
    <div className={`relative flex w-80 mb-8 flex-col rounded-xl bg-white/50 bg-clip-border text-gray-800 shadow-md ${isTargeted?'shadow-2xl scale-105':''}`}>
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        {group.groupCoverImage ? (
          <img
            src={group.groupCoverImage}
            alt={`${group.name} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="w-full h-full inline-flex flex-col justify-center items-center"><Image/><span>no cover image</span></span>
        )}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {group.name}
        </h5>
        <div className="block font-sans text-base leading-relaxed text-inherit antialiased">
          {isEditing && editingField ? (
            <div className="mb-4">{renderEditField()}</div>
          ) : (
            <>
              <span className="font-normal">Type: <span className="font-light" >{group.groupType}</span></span>
              <br />
              <span className="font-normal">Members: <span className="font-light">{group.groupMembers}</span></span>
              <br />
              <span className="font-normal">Description: <span className="font-light">{renderDescription()}</span></span>
              <br />
              <span className="font-normal">Created Date:<span className="font-light">{group.createdDate}</span> </span>
              <br />
              <span className="font-normal">Last Updated: <span className="font-light">{group.lastUpdated}</span></span>
            </>
          )}
        </div>
      </div>
      <div className="px-6 pt-0 flex flex-wrap items-center justify-start gap-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="mr-2 rounded-lg bg-green-500 py-2 px-4 text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingField(null);
              }}
              className="rounded-lg bg-gray-500 py-2 px-4 text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <CustomDropdown
              list={editableList}
              placeholder="Set a new .."
              onSelect={handleOnSelect}
            />
            <button
              type="button"
              onClick={handleGroupDelete}
              className="select-none rounded-lg bg-red-500 py-3 px-6 mb-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Delete group
            </button>
          </>
        )}
      </div>
    </div>
  );
}

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    groupMembers: PropTypes.number.isRequired,
    groupType: PropTypes.string.isRequired,
    groupDescription: PropTypes.string.isRequired,
    groupCoverImage: PropTypes.string,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupCard;
