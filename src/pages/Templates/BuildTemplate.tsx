import { useRef, useState, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Languages from "../../components/LanguagesDropdown";
import categories from "../../assets/data/categories";
import CustomDropdown from "../../components/CustomDropdown";
import CustomAlert1 from "../../components/CustomAlert1";
import RadioTileGroup from "../../components/CustomRadioButtons";
import {
  Bold,
  Check,
  Copy,
  Edit,
  Italic,
  Link,
  PhoneCall,
  Reply,
  Trash2,
  Underline,
  Upload,
} from "lucide-react";
import { useTemplates } from "../../contexts/TemplatesProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import {
  faMicrophone,
  faFaceSmile,
  faList,
  faFileCirclePlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

type CategoryType = "marketing" | "authentication" | "utility";
type MediaType = "none" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
type HeaderType = "none" | "TEXT" | "MEDIA" | "LOCATION";
type ButtonType = "visit" | "call" | "copy" | "quickReply";
type ReceivedObject = {
  [key: string]: any;
};

interface ButtonConfig {
  type: ButtonType;
  text: string;
  url?: string;
  phoneNumber?: string;
  copyCode?: string;
  quickReply?: string;
}
const BuildTemplate = () => {
  const location = useLocation();
  const receivedData = location.state as ReceivedObject;
  const [language, setLanguage] = useState({
    key: "English",
    value: "en",
  });
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<MediaType>("none");
  const [variables, setVariables] = useState<{ [key: number]: string }>({});
  const [bodyvariables, setBodyVariables] = useState<{ [key: number]: string }>(
    {}
  );
  const {createTemplate} = useTemplates();
  const [messageHeaderType, setMessageHeaderType] =
    useState<HeaderType>("none");
  const [headerCharCount, setHeaderCharCount] = useState<number>(0);
  const [bodyCharCount, setBodyCharCount] = useState<number>(0);
  const [buttons, setButtons] = useState<ButtonConfig[]>([]);
  const [footerCharCount, setFooterCharCount] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [messageBodyText, setMessageBodyText] = useState<string>("");
  const [messageHeaderText, setMessageHeaderText] = useState<string>("");
  const [messageFooterText, setMessageFooterText] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [buttonType, setButtonType] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const length = Object.keys(receivedData).length;
  const [category, setCategory] = useState<CategoryType>("marketing");
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>(name);
  useEffect(() => {
    if (length > 1) {
      setName(receivedData.name);
      setCategory(receivedData.category);
    } else {
      const data = receivedData.selectedTemplate;
      setName(data.name);
      setCategory(data.category);
      const headerComponent = data.components.find(
        (comp) => comp.type === "HEADER"
      );
      const bodyComponent = data.components.find(
        (comp) => comp.type === "BODY"
      );
      const footerComponent = data.components.find(
        (comp) => comp.type === "FOOTER"
      );
      const buttonsComponent = data.components.find(
        (comp) => comp.type === "BUTTONS"
      );
      if (headerComponent) {
        switch (headerComponent.format) {
          case "LOCATION":
            setMessageHeaderType("LOCATION");
            setMediaType("LOCATION");
            break;
          case "IMAGE":
            setMessageHeaderType("MEDIA");
            setMediaType("IMAGE");
            setSelectedFile(headerComponent.example.header_handle[0]);
            break;
          case "TEXT":
            setMessageHeaderType("TEXT");
            setMediaType("none");
            setMessageHeaderText(headerComponent.text);
            setHeaderCharCount(messageHeaderText.length);
            break;
          case "VIDEO":
            setMessageHeaderType("MEDIA");
            setMediaType("VIDEO");
            setSelectedFile(headerComponent.example.header_handle[0]);
            break;
          case "DOCUMENT":
            setMessageHeaderType("MEDIA");
            setMediaType("DOCUMENT");
            setSelectedFile(headerComponent.example.header_handle[0]);
            break;
          default:
            setMessageHeaderType("none");
            setMessageHeaderText("");
            setMediaType("none");
        }
      } else {
        setMessageHeaderType("none");
        setMessageHeaderText("");
        setMediaType("none");
        setHeaderCharCount(0);
      }
      if (bodyComponent) {
        setMessageBodyText(bodyComponent.text);
        setBodyCharCount(messageBodyText.length);
      } else {
        setMessageBodyText("");
        setBodyCharCount(0);
      }
      if (footerComponent) {
        setMessageFooterText(footerComponent.text);
        setFooterCharCount(messageFooterText.length);
      } else {
        setMessageFooterText("");
        setFooterCharCount(0);
      }
      if (buttonsComponent) {
        setButtons(buttonsComponent.buttons);
      } else {
        setButtons([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim().length < 5) {
      setWarning(true);
      setTimeout(() => setWarning(false), 3000);
      return;
    }
    setName(tempName);
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setTempName(name);
    setIsEditing(false);
  };

  const getLanguage = (lang: { key: string; value: string }): void => {
    setLanguage(lang);
  };

  const handleSelect = (selectedItem: CategoryType): void => {
    setCategory(selectedItem);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(fileUrl);
    }
  };

  const handleMessageHeaderType = (value: HeaderType): void => {
    setMessageHeaderType(value);
  };

  const handleAddHeaderVariable = () => {
    // Find the next available sequential index
    const newVarIndex =
      Object.keys(variables).length > 0
        ? Math.max(...Object.keys(variables).map(Number)) + 1
        : 1;

    const newVariableText = `${messageHeaderText} {{${newVarIndex}}} `;
    setMessageHeaderText(newVariableText);

    // Automatically add an entry for the new variable
    setVariables((prev) => ({
      ...prev,
      [newVarIndex]: "",
    }));
  };

  const handleAddBodyVariable = () => {
    // Find the next available sequential index
    const newVarIndex =
      Object.keys(bodyvariables).length > 0
        ? Math.max(...Object.keys(bodyvariables).map(Number)) + 1
        : 1;

    const newVariableText = `${messageBodyText} {{${newVarIndex}}} `;
    setMessageBodyText(newVariableText);

    // Automatically add an entry for the new variable
    setBodyVariables((prev) => ({
      ...prev,
      [newVarIndex]: "",
    }));
  };

  const removeHeaderVariable = (indexToRemove: number) => {
    // Remove the variable from the variables state
    const newVariables: { [key: number]: string } = {};
    let newIndex = 1;

    // Reconstruct variables with sequential indexing
    Object.entries(variables)
      .filter(([key]) => Number(key) !== indexToRemove)
      .forEach(([, value]) => {
        newVariables[newIndex] = value;
        newIndex++;
      });

    // Adjust the text to replace all variable markers with new sequential indices
    let newHeaderText = messageHeaderText;
    Object.keys(variables)
      .filter((key) => Number(key) !== indexToRemove)
      .forEach((oldKey, index) => {
        const oldMarker = `{{${oldKey}}}`;
        const newMarker = `{{${index + 1}}}`;
        newHeaderText = newHeaderText.replace(oldMarker, newMarker);
      });

    setMessageHeaderText(newHeaderText);
    setVariables(newVariables);
  };

  const removeBodyVariable = (indexToRemove: number) => {
    // Remove the variable from the bodyvariables state
    const newBodyVariables: { [key: number]: string } = {};
    let newIndex = 1;

    // Reconstruct variables with sequential indexing
    Object.entries(bodyvariables)
      .filter(([key]) => Number(key) !== indexToRemove)
      .forEach(([, value]) => {
        newBodyVariables[newIndex] = value;
        newIndex++;
      });

    // Adjust the text to replace all variable markers with new sequential indices
    let newBodyText = messageBodyText;
    Object.keys(bodyvariables)
      .filter((key) => Number(key) !== indexToRemove)
      .forEach((oldKey, index) => {
        const oldMarker = `{{${oldKey}}}`;
        const newMarker = `{{${index + 1}}}`;
        newBodyText = newBodyText.replace(oldMarker, newMarker);
      });

    setMessageBodyText(newBodyText);
    setBodyVariables(newBodyVariables);
  };

  const handleTextHeader = (e: ChangeEvent<HTMLInputElement>): void => {
    const newText = e.target.value;
    setMessageHeaderText(newText);
    setHeaderCharCount(newText.length);

    // Find and remove variables that are no longer in the text
    const existingVariables = Object.keys(variables).map(Number);
    existingVariables.forEach((varIndex) => {
      const variableMarker = `{{${varIndex}}}`;
      if (!newText.includes(variableMarker)) {
        const newVariables = { ...variables };
        delete newVariables[varIndex];
        setVariables(newVariables);
      }
    });
  };

  const handleTextBody = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    setMessageBodyText(newText);
    setBodyCharCount(newText.length);

    // Find and remove variables that are no longer in the text
    const existingVariables = Object.keys(bodyvariables).map(Number);
    existingVariables.forEach((varIndex) => {
      const variableMarker = `{{${varIndex}}}`;
      if (!newText.includes(variableMarker)) {
        const newBodyVariables = { ...bodyvariables };
        delete newBodyVariables[varIndex];
        setBodyVariables(newBodyVariables);
      }
    });
  };

  const handleTextFooter = (e: ChangeEvent<HTMLInputElement>): void => {
    const newText = e.target.value;
    setMessageFooterText(newText);
    setFooterCharCount(newText.length);
  };
  const addButton = (type: ButtonType) => {
    // Validate button count and type grouping
    const quickReplyButtons = buttons.filter((b) => b.type === "quickReply");
    const nonQuickReplyButtons = buttons.filter((b) => b.type !== "quickReply");

    if (type === "quickReply" && quickReplyButtons.length >= 10) {
      alert("Maximum 10 quick reply buttons allowed");
      return;
    }

    if (buttons.length >= 10) {
      alert("Maximum 10 buttons allowed");
      return;
    }

    // Validate button type combination
    if (
      (type !== "quickReply" &&
        quickReplyButtons.length > 0 &&
        nonQuickReplyButtons.length > 0) ||
      (type === "quickReply" &&
        nonQuickReplyButtons.length > 0 &&
        quickReplyButtons.length > 0)
    ) {
      alert("Invalid button type combination");
      return;
    }

    const newButton: ButtonConfig = {
      type,
      text: "",
      url: type === "visit" ? "" : undefined,
      phoneNumber: type === "call" ? "" : undefined,
      copyCode: type === "copy" ? "" : undefined,
      quickReply: type === "quickReply" ? "" : undefined,
    };

    setButtons([...buttons, newButton]);
  };

  const updateButton = (
    index: number,
    field: keyof ButtonConfig,
    value: string
  ) => {
    const updatedButtons = [...buttons];

    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    setButtons(updatedButtons);
  };

  const removeButton = (index: number) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    setButtons(updatedButtons);
  };
  const renderButtonPreview = () => {
    // If no buttons, return null
    if (buttons.length === 0) return null;

    // If 1-2 buttons, render all
    if (buttons.length <= 2) {
      return buttons.map((button, index) => (
        <div
          key={index}
          className={`w-full h-11 text-sm font-semibold ${
            buttons.length > 1
              ? index === 1
                ? "rounded-b-xl"
                : ""
              : "rounded-b-xl"
          }  border-t-2 border-zinc-300 text-blue-500/90 font-sans tracking-wide bg-slate-50  inline-flex items-center justify-center gap-2`}
        >
          {button.type === "visit" ? (
            <Link className="w-4 h-4" />
          ) : button.type === "call" ? (
            <PhoneCall className="w-4 h-4" />
          ) : button.type === "copy" ? (
            <>
              <Copy className="w-4 h-4" />
              <span className="font-semibold">Copy</span>
            </>
          ) : (
            <Reply className="w-4 h-4" />
          )}
          {button.text}
        </div>
      ));
    }
    return (
      <>
        {buttons.slice(0, 2).map((button, index) => (
          <div
            key={index}
            className={`w-full h-11 text-sm font-semibold border-t-2 border-zinc-300 text-blue-500/90 font-sans tracking-wide bg-slate-50  inline-flex items-center justify-center gap-2`}
          >
            {button.text}
            {button.type === "visit" ? (
              <Link className="w-4 h-4" />
            ) : button.type === "call" ? (
              <PhoneCall className="w-4 h-4" />
            ) : button.type === "copy" ? (
              <Copy className="w-4 h-4" />
            ) : (
              <Reply className="w-4 h-4" />
            )}
          </div>
        ))}
        <div
          className={`w-full h-11 text-sm rounded-b-xl font-semibold border-t-2 border-zinc-300 text-blue-500/90 font-sans tracking-wide bg-slate-50  inline-flex items-center justify-center gap-2`}
        >
          See all options
          <FontAwesomeIcon icon={faList} className=" w-4 h-4" />
        </div>
      </>
    );
  };
  const UpdateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const submitTemplate = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate template name
    if (name.trim().length < 5) {
      setWarning(true);
      setTimeout(() => setWarning(false), 3000);
      return;
    }

    // Prepare components array
    const components: any[] = [];

    // Header Component
    if (messageHeaderType !== "none") {
      const headerComponent: any = {
        type: "HEADER",
      };

      switch (messageHeaderType) {
        case "TEXT":
          headerComponent.format = "TEXT";
          headerComponent.text = messageHeaderText;
          if (Object.keys(variables).length > 0) {
            headerComponent.example = {
              header_text: Object.values(variables),
            };
          }
          break;
        case "MEDIA":
          headerComponent.format = mediaType;
          if (selectedFile) {
            headerComponent.example = {
              header_handle: ["4::aW..."], // Placeholder for file handle
            };
          }
          break;
        case "LOCATION":
          headerComponent.format = "LOCATION";
          break;
      }

      components.push(headerComponent);
    }

    // Body Component
    if (messageBodyText.trim()) {
      const bodyComponent: any = {
        type: "BODY",
        text: messageBodyText,
      };

      if (Object.keys(bodyvariables).length > 0) {
        bodyComponent.example = {
          header_text: Object.values(bodyvariables),
        };
      }

      components.push(bodyComponent);
    }

    // Footer Component
    if (messageFooterText.trim()) {
      components.push({
        type: "FOOTER",
        text: messageFooterText,
      });
    }

    // Buttons Component
    if (buttons.length > 0) {
      const buttonsComponent = {
        type: "BUTTONS",
        buttons: buttons.map((button) => {
          switch (button.type) {
            case "visit":
              return {
                type: "URL",
                text: button.text,
                url: button.url,
              };
            case "call":
              return {
                type: "PHONE_NUMBER",
                text: button.text,
                phone_number: button.phoneNumber,
              };
            case "copy":
              return {
                type: "COPY_CODE",
                example: button.copyCode,
              };
            case "quickReply":
              return {
                type: "QUICK_REPLY",
                text: button.text,
              };
          }
        }),
      };
      components.push(buttonsComponent);
    }

    // Final template object
    const templateSubmission = {
      name: name.toLowerCase().replace(/\s+/g, "_"),
      language: language.value,
      category: category.toUpperCase(),
      allow_category_change: true,
      components,
    };

    console.log("Template for submission:", templateSubmission);
    createTemplate(templateSubmission);
    navigate("/templates");
    // Here you would typically send the template to your backend or Meta's API
  };

  return (
    <form
      className="flex flex-1 flex-col gap-6"
      onSubmit={length === 1 ? UpdateTemplate : submitTemplate}
    >
      {warning && (
        <CustomAlert1
          message="name must contain at least 5 characters!"
          color="red-500"
        />
      )}
      {isEditing && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Name</h2>
            <input
              type="text"
              value={tempName}
              minLength={1}
              maxLength={512}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-gray-800"
              placeholder="Enter new name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="relative top-0 w-full h-fit">
        <div className="flex flex-wrap w-full rounded-md bg-gray-700 justify-between p-2 gap-4">
          {/* Editable Name Section */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-row items-center gap-2">
              <label className="text-white font-semibold bg-blue-700 px-5 py-2.5 rounded-lg">
                {name}
              </label>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-400 hover:bg-gray-500 rounded-full p-2"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex w-full">
              <p className="text-gray-400 text-xs text-start font-bold">
                Template name
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CustomDropdown
              list={categories}
              onSelect={handleSelect}
              category={category}
            />
            <div className="flex w-full">
              <p className="text-gray-400 text-xs text-start font-bold">
                Template categoty
              </p>
            </div>
          </div>

          {/* Languages Dropdown */}
          <div className="flex flex-col items-center gap-1">
            <Languages func={getLanguage} />
            <div className="flex w-full">
              <p className="text-gray-400 text-xs text-start font-bold">
                Language
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-950 inline-flex flex-wrap gap-1 justify-center items-center text-gray-100 font-serif border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              {length === 1 ? (
                <>
                  Commit
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Submit
                  <Upload className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 sm:flex-col md:flex-col lg:g-[flex-row,justify-between]">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex min-h-48 p-1 bg-gray-700 flex-col">
            <div className="h-auto mb-5 flex flex-col">
              <p className="font-bold text-lg">Header</p>
              <span className=" text-gray-400 text-xs">
                Add a title or choose which type of media you'll use for your
                message header<span className="font-bold">(optional)</span>
              </span>
            </div>
            <div className="flex w-full gap-6  items-center flex-col">
              <RadioTileGroup onSelect={handleMessageHeaderType} />
              <div className="w-full flex px-1">
                {messageHeaderType === "TEXT" && (
                  <div className="w-full">
                    <div className="flex flex-wrap gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Enter header text"
                        value={messageHeaderText}
                        onChange={handleTextHeader}
                        maxLength={60}
                        className="w-1/2 p-2 border text-sm rounded bg-gray-800 text-white"
                      />
                      <div>
                        <ButtonWithTooltip
                          onClick={handleAddHeaderVariable}
                          spanDirection="translate-x-14"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {headerCharCount}/60
                    </p>
                    {Object.keys(variables).length > 0 && (
                      <div className="flex flex-col gap-2">
                        {Object.entries(variables).map(([indexStr, value]) => {
                          const index = Number(indexStr);
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm">
                                Variable {index} value:
                              </span>
                              <input
                                type="text"
                                placeholder="value"
                                value={value}
                                onChange={(e) => {
                                  setVariables((prev) => ({
                                    ...prev,
                                    [index]: e.target.value,
                                  }));
                                }}
                                className="p-2 border text-sm rounded bg-gray-800 text-white"
                              />
                              <button
                                type="button"
                                onClick={() => removeHeaderVariable(index)}
                                className="bg-red-600 p-1 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                {messageHeaderType === "MEDIA" && (
                  <div className="flex w-full gap-1 flex-wrap justify-evenly">
                    {["IMAGE", "VIDEO", "DOCUMENT"].map((type) => (
                      <label
                        key={type}
                        onClick={() => setMediaType(type)}
                        className="p-y-2 w-20 py-2 text-xs sm:g-[w-20 text-xs] md:g-[w-20 text-xs] lg:g-[w-28,text-sm] bg-blue-500 hover:bg-blue-600 text-white rounded text-center cursor-pointer"
                      >
                        <input
                          type="file"
                          name="mediaType"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                )}
                {messageHeaderType === "LOCATION" && (
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Location"
                      value={messageHeaderText}
                      onChange={handleTextHeader}
                      className="w-1/2 p-2 border text-sm rounded bg-gray-800 text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex bg-gray-700 flex-col p-1">
            <div className="h-auto mb-5 flex flex-col">
              <p className="font-bold text-lg">Body</p>
              <span className=" text-gray-400 text-xs">
                Enter the text for your message in the language you've selected
              </span>
            </div>
            <div>
              <textarea
                ref={textareaRef}
                className="w-3/4 h-44 p-2 border rounded text-sm bg-gray-800 text-white"
                onChange={handleTextBody}
                value={messageBodyText}
                maxLength={1024}
                required
                placeholder="body message..."
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm text-gray-500">{bodyCharCount}/1024</p>
                <div className="flex flex-row gap-3">
                  <ButtonWithTooltip
                    onClick={handleAddBodyVariable}
                    spanDirection="-translate-y-7"
                  />
                  <Bold className="w-6 h-6 cursor-pointer bg-blue-600 rounded-full p-1 hover:bg-blue-700" />
                  <Italic className="w-6 h-6 cursor-pointer bg-blue-600 rounded-full p-1 hover:bg-blue-700" />
                  <Underline className="w-6 h-6 cursor-pointer bg-blue-600 rounded-full p-1 hover:bg-blue-700" />
                </div>
              </div>
              {Object.keys(bodyvariables).length > 0 && (
                <div className="flex flex-col gap-2">
                  {Object.entries(bodyvariables).map(([indexStr, value]) => {
                    const index = Number(indexStr);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">Variable {index} value:</span>
                        <input
                          type="text"
                          placeholder="value"
                          value={value}
                          onChange={(e) => {
                            setBodyVariables((prev) => ({
                              ...prev,
                              [index]: e.target.value,
                            }));
                          }}
                          className="p-2 border text-sm rounded bg-gray-800 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeBodyVariable(index)}
                          className="bg-red-600 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex bg-gray-700 flex-col p-1">
            <div className="h-auto mb-5 flex flex-col">
              <p className="font-bold text-lg">Footer</p>
              <span className=" text-gray-400 text-xs">
                Add a short line of text to the buttom of your message template.
                <span className="font-bold">(optional)</span>
              </span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter footer text"
                value={messageFooterText}
                onChange={handleTextFooter}
                maxLength={60}
                className="w-1/2 p-2 border text-sm rounded bg-gray-800 text-white"
              />
              <p className="text-sm text-gray-500">{footerCharCount}/60</p>
            </div>
          </div>

          <div className="flex bg-gray-700 flex-col p-1">
            <div className="h-auto mb-5 flex flex-col">
              <p className="font-bold text-lg">Buttons (Max 10)</p>
              <span className="text-gray-400 text-xs">
                Create buttons that let customers respond to your message or
                take actions.
                <span className="font-bold">(optional)</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {buttons.map((button, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-800 p-2 rounded"
                >
                  <select
                    value={button.type}
                    onChange={(e) =>
                      updateButton(index, "type", e.target.value as ButtonType)
                    }
                    className="bg-gray-700 text-white p-1 rounded"
                  >
                    <option value="visit">Visit Website</option>
                    <option value="call">Call</option>
                    <option value="copy">Copy Code</option>
                    <option value="quickReply">Quick Reply</option>
                  </select>
                  {button.type === "visit" && (
                    <>
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={button.text}
                        onChange={(e) =>
                          updateButton(index, "text", e.target.value)
                        }
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={button.url}
                        onChange={(e) =>
                          updateButton(index, "url", e.target.value)
                        }
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                    </>
                  )}
                  {button.type === "call" && (
                    <>
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={button.text}
                        maxLength={25}
                        onChange={(e) =>
                          updateButton(index, "text", e.target.value)
                        }
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        max={20}
                        value={button.phoneNumber}
                        onChange={(e) =>
                          updateButton(index, "phoneNumber", e.target.value)
                        }
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                    </>
                  )}
                  {button.type === "copy" && (
                    <input
                      type="text"
                      placeholder="message to be copied (max 15 chars)"
                      value={button.copyCode}
                      onChange={(e) =>
                        updateButton(index, "copyCode", e.target.value)
                      }
                      maxLength={15}
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                  )}
                  {button.type === "quickReply" && (
                    <input
                      type="text"
                      placeholder="Reply text"
                      value={button.quickReply}
                      onChange={(e) =>
                        updateButton(index, "quickReply", e.target.value)
                      }
                      maxLength={25}
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeButton(index)}
                    className="bg-red-600 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2 justify-around">
              <button
                type="button"
                onClick={() => addButton("visit")}
                disabled={buttons.length >= 4}
                className="bg-blue-600 text-sm p-2 rounded disabled:opacity-50"
              >
                Add Website Button
              </button>
              <button
                type="button"
                onClick={() => addButton("call")}
                disabled={buttons.length >= 4}
                className="bg-blue-600 text-sm p-2 rounded disabled:opacity-50"
              >
                Add Call Button
              </button>
              <button
                type="button"
                onClick={() => addButton("copy")}
                disabled={buttons.length >= 4}
                className="bg-blue-600 text-sm p-2 rounded disabled:opacity-50"
              >
                Add Copy Button
              </button>
              <button
                type="button"
                onClick={() => addButton("quickReply")}
                disabled={buttons.length >= 4}
                className="bg-blue-600 text-sm p-2 rounded disabled:opacity-50"
              >
                Add Quick Reply
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-72 max-w-72 h-full gap-2 mx-auto flex-col">
          <div className="flex justify-center bg-blue-600 p-1">
            <p className="text-gray-400 font-bold">Message preview</p>
          </div>
          <div className=" rounded-2xl border-zinc-600 h-[35rem] border-2">
            <div
              className="bg-cover bg-center relative h-full pb-3 z-0 p-1 px-2 rounded-2xl"
              style={{
                backgroundImage: `url("https://i.pinimg.com/736x/14/ea/f7/14eaf7ddf7e9d66df8ff845a5f6d502a.jpg")`,
              }}
            >
              <div className="bg-black/90 w-20 h-5 rounded-2xl mx-auto z-30 mb-3"></div>
              <div
                className={`${
                  buttons.length === 0 ? "w-fit" : "w-full"
                } max-w-full flex flex-col p-1 bg-slate-50 rounded-xl rounded-tl-none ${
                  buttons.length === 0 ? "" : "rounded-b-none"
                } text-black`}
              >
                {messageHeaderType === "MEDIA" ? (
                  mediaType === "IMAGE" ? (
                    <img
                      src={selectedFile}
                      className="rounded-lg mx-auto max-w-full h-auto object-contain"
                    />
                  ) : mediaType === "VIDEO" ? (
                    <video controls className="w-full rounded-lg mx-auto">
                      <source src={selectedFile} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : mediaType === "DOCUMENT" ? (
                    <iframe
                      src={selectedFile}
                      title="Document Viewer"
                      className="w-full rounded-lg mx-auto"
                    />
                  ) : mediaType === "LOCATION" ? (
                    <img
                      src={selectedFile}
                      className="w-full rounded-lg bg-contain mx-auto"
                    />
                  ) : null
                ) : messageHeaderType === "TEXT" ? (
                  <p className="font-bold text-sm p-1 break-words">
                    {messageHeaderText}
                  </p>
                ) : null}
                <p className="text-sm p-1 break-words">{messageBodyText}</p>
                <p className="text-sm p-1 text-gray-500 break-words">
                  {messageFooterText}
                </p>
              </div>
              {renderButtonPreview()}
              <div className=" w-full flex flex-row h-10 bottom-1 gap-1 pr-3 justify-center items-center absolute rounded-2xl">
                <div className="bg-gray-100 flex-1 h-full rounded-3xl flex flex-row justify-between items-center px-2">
                  <div className="flex flex-row  gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faFaceSmile}
                      className="text-zinc-600 w-4 h-4"
                    />
                    <span className="text-sm text-zinc-600">Message</span>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      className="text-zinc-600 w-4 h-4"
                    />
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="text-zinc-600 w-4 h-4"
                    />
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className="w-4 h-4 text-gray-100 bg-green-600 p-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BuildTemplate;
