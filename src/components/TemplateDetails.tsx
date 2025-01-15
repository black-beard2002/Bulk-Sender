import {
  faCopy,
  faPhone,
  faReplyAll,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TemplateDetails = ({ template, onEdit, onCancel }) => {
  if (!template) return null; // No template provided, do nothing.

  const { name, components } = template;

  const renderHeader = () => {
    const headerComponent = components.find((comp) => comp.type === "HEADER");
    if (!headerComponent) {
      return null;
    }

    switch (headerComponent.format) {
      case "LOCATION":
        return <p>Location: location aletnative text</p>;
      case "IMAGE":
        return (
          <img
            src={
              "https://i.pinimg.com/236x/ed/32/19/ed3219fbbff82f2b4a5c28bf48ea6526.jpg"
            }
            alt="header image alt"
            className="rounded-lg"
          />
        );
      case "TEXT":
        return (
          <p className="font-bold break-words">
            {headerComponent.text}
          </p>
        );
      case "VIDEO":
        return (
          <video controls className="w-full rounded-lg mx-auto">
            <source
              src={headerComponent.example.header_handle[0]}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        );
      case "DOCUMENT":
        return (
          <iframe
            src={headerComponent.example.header_handle[0]}
            title="Document Viewer"
            className="w-full rounded-lg mx-auto"
          />
        );
      default:
        return null;
    }
  };

  const renderBody = () => {
    const bodyComponent = components.find((comp) => comp.type === "BODY");
    if (bodyComponent) {
      return (
        <p className="break-words">
          {bodyComponent.text}
        </p>
      );
    }
    return null;
  };

  const renderFooter = () => {
    const footerComponent = components.find((comp) => comp.type === "FOOTER");
    if (footerComponent) {
      return (
        <p className="text-gray-500 break-words font-semibold">
          {footerComponent.text}
        </p>
      );
    }
    return null;
  };

  const renderButtons = () => {
    const buttonsComponent = components.find((comp) => comp.type === "BUTTONS");
    if (buttonsComponent) {
      return (
        <div className="flex w-full flex-col">
          {buttonsComponent.buttons.map((button, index) => (
            <button
              key={index}
              disabled
              className={`w-full inline-flex flex-row justify-center items-center gap-2 h-11 text-sm font-semibold ${
                buttonsComponent.buttons.length > 1
                  ? index === 1
                    ? "rounded-b-xl"
                    : "rounded-b-none"
                  : "rounded-b-xl"
              }  border-t-2 border-zinc-300 rounded-t-none text-blue-500/90 font-sans tracking-wide bg-slate-50`}
            >
              {button.type === "QUICK_REPLY" ? (
                <>
                  <FontAwesomeIcon
                    icon={faReplyAll}
                    className="w-4 h-4 text-blue-500"
                  />
                  {button.example}
                </>
              ) : (
                <>
                  {button.type === "PHONE_NUMBER" ? (
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-blue-500"/>
                  ) : button.type === "URL" ? (
                    <FontAwesomeIcon icon={faWebAwesome} className="w-4 h-4 text-blue-500"/>
                  ) : (
                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4 text-blue-500"/>
                  )}
                  {button.text}
                </>
              )}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-72 gap-1">
      <div
        className="bg-cover bg-center relative w-full h-[30rem] p-3 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/14/ea/f7/14eaf7ddf7e9d66df8ff845a5f6d502a.jpg")`,
        }}
      >
        <div
          className={`w-fit max-w-full flex gap-2 flex-col p-1 bg-slate-50 text-sm text-black ${
            renderButtons() ? "rounded-b-none" : ""
          } rounded-xl rounded-tl-none`}
        >
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </div>
        {renderButtons()}
      </div>
      <div className=" flex flex-wrap justify-around w-full">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-sm rounded-md text-slate-200 hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={onCancel}
          className="bg-blue-600 text-sm rounded-md text-slate-200 hover:bg-blue-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TemplateDetails;
