import React, { useState } from "react";
import Card3 from "../../../components/Card3";
import { useGroup } from "../../../contexts/GroupsProvider";
import { useTemplates } from "../../../contexts/TemplatesProvider";
import Card4 from "../../../components/Card4";
import CustomAlert1 from "../../../components/CustomAlert1";
const SendMessages = () => {
  const { groups } = useGroup();
  const { templates } = useTemplates();

  const [selectedGroup, setSelectedGroup] = useState<null | number>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<null | string>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleGroupSelect = (id: number) => {
    setSelectedGroup(id);
  };
  const handleTemplateSelect = (name: string) => {
    setSelectedTemplate(name);
  };
  const handleSubmit = () => {
    if (selectedGroup && selectedTemplate) {
      alert("done")
    } else {
      setAlertMessage("Please select a group and a template");
    }
  };
  return (
    <div className="flex flex-1 p-1">
      {alertMessage !== "" ? (
        <CustomAlert1 message={alertMessage} color={"red-500"} />
      ) : null}
      <div className="flex flex-1 flex-col gap-10">
        <div className="flex flex-col gap-5 w-full text-slate-50">
          <h1 className="text-[#4c5c68] dark:text-white">List Of Groups</h1>
          <div className="flex flex-wrap justify-start gap-3">
            {groups.map((group) => (
              <Card3
                key={group.id}
                group={group}
                onClick={() => handleGroupSelect(group.id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full text-slate-50">
          <h1 className="text-[#4c5c68] dark:text-white">List Of Templates</h1>
          <div className="flex flex-wrap justify-start gap-3">
            {templates.map((template) => (
              <Card4
                key={template.name}
                template={template}
                onClick={() => handleTemplateSelect(template.name)}
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SendMessages;
