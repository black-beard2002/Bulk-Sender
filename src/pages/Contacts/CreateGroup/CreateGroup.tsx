import React, { useState } from "react";
import CustomButton2 from "../../../components/CustomButton2";
import DocumentsButton from "../../../components/CustomButton3";
import CustomButton4 from "../../../components/CustomButton4";
import * as XLSX from "xlsx";
import { useGroup } from "../../../contexts/GroupsProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

interface ExcelData {
  [key: string]: any;
}
const CreateGroup: React.FC = () => {
  const [ExcelFileName, setExcelFileName] = useState<string>("");
  const [data, setData] = useState<ExcelData[] | null>(null);
  const [filteredData, setFilteredData] = useState<ExcelData[] | null>(null);
  const [removedRows, setRemovedRows] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [groupType, setGroupType] = useState<string>("");
  const [groupCover, setGroupCover] = useState<string>("");
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [showFullTable, setShowFullTable] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
   const navigate = useNavigate();
  const { createGroup } = useGroup();

  const saveGroup = (e) => {
    e.preventDefault();
    if (!data) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      return;
    }
    const newGroup = {
      name: groupName,
      groupType: groupType,
      groupDescription: groupDescription,
      groupMembers: filteredData?.length,
      groupCoverImage: groupCover,
    };
    createGroup(newGroup);
    navigate('../contactsgroups')
  };

  // const test = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  //   axios
  //     .post("http://localhost:8080/customers", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // Display the error message from the backend
  //         alert(error.response.data);
  //     } else {
  //         alert("An unexpected error occurred.");
  //     }
  //     });
  // };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setExcelFileName(selectedFile.name);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const workbook = XLSX.read(event.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const Data = XLSX.utils.sheet_to_json<ExcelData>(worksheet);

            if (Data.length === 0) {
              alert("Excel sheet is empty!");
            } else {
              setData(Data);
              setFilteredData(Data);
              setTableHeaders(Object.keys(Data[0])); // Save table headers
              console.log(Data);
            }
          }
        };
      } else {
        alert("Please select only Excel file types");
      }
    } else {
      alert("Please select your file");
    }
  };

  const handleRestore = () => {
    if (data) {
      setFilteredData(data);
      setRemovedRows(0);
    }
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (filteredData) {
      const updatedData = filteredData.filter((_, index) => index !== rowIndex);
      setFilteredData(updatedData);
      setRemovedRows(removedRows + 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (data) {
      if (query === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(query)
          )
        );
        setFilteredData(filtered.length > 0 ? filtered : []);
      }
    }
  };
  const toggleTableView = () => {
    setShowFullTable(!showFullTable);
  };

  return (
    <div className="flex flex-1 p-1 gap-20 flex-col">
      {/* Alert message */}
      {showAlert && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-500"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Info alert!</span> Select an excel and
            try submitting again.
          </div>
        </div>
      )}
      <p className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-5xl text-[#4c5c68] dark:text-white">
        Create group
      </p>
      <div className="flex flex-wrap gap-10 justify-between">
        <div className="dark:bg-gray-700 bg-[#c5c3c6] rounded-sm flex p-4 min-w-fit  h-fit">
          <form
            onSubmit={saveGroup}
            className="flex flex-col w-full gap-5 "
          >
            <div className="flex flex-wrap gap-2 ">
              <div>
                <label
                  htmlFor="in1"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Group name
                </label>
                <input
                  type="text"
                  required
                  id="in1"
                  minLength={4}
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  className="bg-green-50 border border-green-500 text-[#4c5c68] dark:text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                  placeholder="Group name..."
                />
              </div>
              <div>
                <label
                  htmlFor="in2"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Group type
                </label>
                <input
                  type="text"
                  required
                  id="in2"
                  minLength={1}
                  value={groupType}
                  onChange={(e) => {
                    setGroupType(e.target.value);
                  }}
                  className="bg-green-50 border border-green-500 text-[#4c5c68] dark:text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                  placeholder="Group type..."
                />
              </div>
              <div>
                <label
                  htmlFor="in3"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Group description
                </label>
                <input
                  type="text"
                  value={groupDescription}
                  id="in3"
                  onChange={(e) => {
                    setGroupDescription(e.target.value);
                  }}
                  className="bg-green-50 border border-green-500 text-[#4c5c68] dark:text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                  placeholder="Group description..."
                />
              </div>
              <div>
                <label
                  htmlFor="in4"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Group members
                </label>
                <input
                  type="text"
                  disabled
                  id="in4"
                  required
                  value={
                    ExcelFileName === ""
                      ? "not selected"
                      : `${ExcelFileName} (${filteredData?.length})`
                  }
                  className="bg-green-50 border border-green-500 text-[#4c5c68] dark:text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="in5"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Group cover image url
                </label>
                <input
                  type="text"
                  id="in5"
                  onChange={(e) => setGroupCover(e.target.value)}
                  value={groupCover}
                  placeholder="image URL.."
                  className="bg-green-50 border border-green-500 text-[#4c5c68] dark:text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                />
              </div>
            </div>
            <div className="flex w-36">
              <CustomButton2 text="Save group" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-1 gap-6 flex-wrap mb-3 justify-center">
        <div className="flex w-full flex-col gap-4">
          <DocumentsButton onDocumentChange={handleFile} />
          <CustomButton4 onClick={handleRestore} text="Reset table" />
        </div>
        {data ? (
          <div className="relative shadow-md sm:rounded-lg flex-1">
            <div className="pb-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for contact"
                />
              </div>
            </div>
            <div className="dark:bg-slate-600 bg-[#1985a1] text-center p-2 text-md w-fit mx-auto rounded-t-2xl">
              {ExcelFileName}
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} className="px-6 py-3">
                      {header}
                    </th>
                  ))}
                  <th className="px-6 py-3">Remove</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  (showFullTable ? filteredData : filteredData.slice(0, 2)).map(
                    (individualExcelData, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {tableHeaders.map((header) => (
                          <td key={header} className="px-6 py-4">
                            {individualExcelData[header]}
                          </td>
                        ))}
                        <td className="px-6 py-4">
                          <svg
                            onClick={() => handleRemoveRow(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 p-1 bg-gray-600 rounded-full text-red-500 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={tableHeaders.length + 1}
                      className="text-center px-6 py-4"
                    >
                      No matching data found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  <th scope="row" className="px-6 py-3 text-base">
                    Total
                  </th>
                  <td className="px-6 py-3 flex items-center justify-start ">
                    <div onClick={toggleTableView} className="relative cursor-pointer flex flex-col items-center justify-between w-10 h-10 dark:bg-gray-600 bg-[#1985a1] rounded-full shadow-md">
                      <span className="absolute text-lg font-bold  text-gray-200 m-3">
                        {filteredData?.length || 0}
                      </span>
                      {!showFullTable &&
                        filteredData &&
                        filteredData.length > 2 && (
                          <FontAwesomeIcon icon={faSortDown} className="w-4 h-4 text-slate-50 dark:text-zinc-800"/>
                        )}
                      {showFullTable && (
                        <FontAwesomeIcon icon={faSortUp} className="w-4 h-4 mb-1 text-slate-50 dark:text-zinc-800"/>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-3">{removedRows}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 bg-yellow-100 border-l-4 h-10 border-yellow-500 text-yellow-700 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <div>No data selected!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
