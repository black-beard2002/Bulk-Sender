import React, { useState } from "react";
import CustomButton1 from "../../components/CustomButton1";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useTemplates } from "../../contexts/TemplatesProvider";
import TemplateDetails from "../../components/TemplateDetails";
import Card2 from "../../components/Card2";
import CustomAlert1 from "../../components/CustomAlert1";
import { useAuth } from "../../contexts/AuthProvider";
const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message,setMessage] = useState("");
  const [color,setColor] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { templates, removeTemplate } = useTemplates();
 const {user} = useAuth();
  const revealTemplate = (template) => {
    setSelectedTemplate(template);
    setShowTemplate(true);
  };
  const handleDeletion = (template) => {
    setSelectedTemplate(template);
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowTemplate(false);
    setSelectedTemplate(null);
  };

  const handleUsage=()=>{
    navigate("/sendmessage")
  }

  const handleEdit = () => {
    navigate("/createtemplate/build", { state: { selectedTemplate } });
  };

  const handleDelete = (password:string) => {

    if(password===user?.password){
      removeTemplate(selectedTemplate.name);
      setShowConfirmation(false);
      setMessage("template removed ✅")
      setColor("green-500")
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
    }
    else{
      setMessage("wrong password!")
      setColor("red-500")
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }

  };

  const handleCancel2 = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-1 p-1 flex-col gap-4">
      {alert && <CustomAlert1 message={message} color={color} />}
      {showTemplate && selectedTemplate && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
          <TemplateDetails
            template={selectedTemplate}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
        </div>
      )}
      {showConfirmation && selectedTemplate && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
          <Card2 onConfirm={handleDelete} onCancel={handleCancel2} target={selectedTemplate.name}/>
        </div>
      )}

      <div className="w-48 h-10 sm:w-56 sm:h-14 sm:text-xs">
        <Link to={"/createtemplate"}>
          <CustomButton1 text="CREATE NEW TEMPLATE" />
        </Link>
      </div>
      <div className="p-3">
        <p className="text-base text-[#4c5c68] dark:text-gray-100 sm:text-xs md:text-m lg:text-5xl">
          My Templates
        </p>
      </div>
      <div className="flex flex-wrap gap-10 justify-center pb-14">
        {templates.map((template, index) => (
          <Card
            key={index}
            cardTitle={template.name}
            onClick={() => revealTemplate(template)}
            onDelete={() => handleDeletion(template)}
            onUse={()=> handleUsage(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default Templates;
