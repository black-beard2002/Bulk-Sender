import { useState } from "react";
import Card3 from "../../../components/Card3";
import { useGroup } from "../../../contexts/GroupsProvider";
import { useTemplates } from "../../../contexts/TemplatesProvider";
import Card4 from "../../../components/Card4";
import CustomAlert1 from "../../../components/CustomAlert1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
const SendMessages = () => {
  const { groups } = useGroup();
  const { templates } = useTemplates();

  const [selectedGroup, setSelectedGroup] = useState<null | number>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<null | string>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const handleGroupSelect = (id: number) => {
    setSelectedGroup(id);
  };
  const handleTemplateSelect = (name: string) => {
    setSelectedTemplate(name);
  };
  const handleSubmit = () => {
    if (selectedGroup && selectedTemplate) {
      setAlertMessage("Done");
      setAlertColor("green-500");
      setTimeout(()=>setAlertMessage(""),1000)
      console.log(selectedTemplate,selectedGroup)
    } else {
      setAlertMessage("Please select a group and a template");
      setAlertColor("red-500")
      setTimeout(()=>setAlertMessage(""),3000)
    }
  };
  return (
    <div className="flex flex-1 p-1">
      {alertMessage !== "" ? (
        <CustomAlert1 message={alertMessage} color={alertColor} />
      ) : null}
      <div className="relative flex flex-1 flex-col gap-10">
        <div className="flex flex-col gap-5 w-full text-slate-50">
          <h1 className="text-[#4c5c68] dark:text-white">List Of Groups</h1>
          <div className="flex flex-wrap md:justify-start justify-center gap-3">
            {groups.map((group) => (
              <Card3
                key={group.id}
                group={group}
                isSelected={selectedGroup === group.id}
                onClick={() => handleGroupSelect(group.id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full text-slate-50">
          <h1 className="text-[#4c5c68] dark:text-white">List Of Templates</h1>
          <div className="flex flex-wrap md:justify-start justify-center gap-3">
            {templates.map((template) => (
              <Card4
                key={template.name}
                template={template}
                isSelected={selectedTemplate === template.name}
                onClick={() => handleTemplateSelect(template.name)}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-end items-center pb-5">
          <button onClick={handleSubmit} className="inline-flex group hover:shadow-2xl font-sans flex-row justify-center items-center gap-2 bg-white text-black dark:bg-black dark:text-white">
            <FontAwesomeIcon icon={faPaperPlane} className="transform group-hover:rotate-[50deg] group-hover:-translate-x-1 duration-300"/>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessages;
