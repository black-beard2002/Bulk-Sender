import { useState } from "react";
import CustomAlert1 from "../../components/CustomAlert1";
import { useNavigate } from "react-router-dom";

const NewTemplate = () => {
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlert2, setShowAlert2] = useState<boolean>(false);
  const [CharCount, setCharCount] = useState<number>(0);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if(category===""){
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      return;
    }
    if (name.trim().length <5) {
      setShowAlert2(true);
      return;
    }
    navigate("/createtemplate/build",{state:{name,category}});

  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div className="flex flex-1 p-1 justify-center overflow-y-scroll">
      {showAlert&&(<CustomAlert1 message="choose a category!" color="red-500"/>)}
      {showAlert2&&(<CustomAlert1 message="name must contain at least 5 characters!" color="red-500"/>)}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 p-6 pb-10 dark:g-[bg-gray-800 text-white] bg-[#1985a1] rounded-lg w-3/4 shadow-xl shadow-black"
      >
        <h2 className="text-lg font-semibold">CATEGORY</h2>
        <p className="text-sm  text-[#46494c] dark:text-gray-400 mb-4">
          Choose a category that best describes your message template.
        </p>

        <label className="relative flex items-center gap-4 p-4 border rounded-lg cursor-pointer bg-[#c5c3c6] hover:bg-[#b2b2b2] dark:g-[bg-gray-700 hover:bg-gray-600]">
          <input
            type="radio"
            name="category"
            value="marketing"
            className="sr-only peer"
            onChange={handleCategoryChange}
          />
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-gray-200">
            <div className="w-3 h-3 rounded-full bg-blue-500 scale-0 transition-transform peer-checked:scale-100"></div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Marketing</h3>
            <p className="text-xs text-[#46494c] dark:text-gray-400">
              Promotions or information about business, products, or services.
            </p>
          </div>
        </label>

        <label className="relative flex items-center gap-4 p-4 border rounded-lg cursor-pointer bg-[#c5c3c6] hover:bg-[#b2b2b2] dark:g-[bg-gray-700 hover:bg-gray-600]">
          <input
            type="radio"
            name="category"
            value="utility"
            className="sr-only peer"
            onChange={handleCategoryChange}
          />
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-gray-200">
            <div className="w-3 h-3 rounded-full bg-blue-500 scale-0 transition-transform peer-checked:scale-100"></div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Utility</h3>
            <p className="text-xs text-[#46494c] dark:text-gray-400">
              Messages about a specific transaction, account, order, or customer
              request.
            </p>
          </div>
        </label>

        <label className="relative flex items-center gap-4 p-4 border rounded-lg cursor-pointer bg-[#c5c3c6] hover:bg-[#b2b2b2] dark:g-[bg-gray-700 hover:bg-gray-600]">
          <input
            type="radio"
            name="category"
            value="authentication"
            className="sr-only peer"
            onChange={handleCategoryChange}
          />
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-gray-200">
            <div className="w-3 h-3 rounded-full bg-blue-500 scale-0 transition-transform peer-checked:scale-100"></div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Authentication</h3>
            <p className="text-xs text-[#46494c] dark:text-gray-400">
              One-time passwords your customers use to authenticate a
              transaction or login.
            </p>
          </div>
        </label>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">TEMPLATE NAME</h2>
          <p className="text-sm text-gray-400 mb-2">
            Name your message template ({CharCount}/512)<br/><span className="text-xs font-light text-gray-300">Make sure the name is unique across your account and clearly indicates the purpose of the template.</span>
          </p>
          <input
            type="text"
            placeholder="eg. order_update"
            required
            maxLength={512}
            minLength={1}
            onChange={(e) => {
              setName(e.target.value);
              setCharCount(e.target.value.length)
            }}
            className="w-full px-4 py-2 rounded-lg bg-[#c5c3c6] text-[#46494c] dark:g-[bg-gray-700 text-white] border border-gray-600 focus:ring dark:focus:ring-blue-500 focus:ring-zinc-400 outline-none"
          />
        </div>

        <button type="submit" className="mt-4 px-6 py-2 mb-5 dark:bg-blue-500 bg-[#4c5c68] text-white rounded-lg hover:bg-[#414e58] dark:hover:bg-blue-600">
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default NewTemplate;
