import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import CustomAlert1 from "../../components/CustomAlert1";
const SignUp = () => {
  // Define the state for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [alert,setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { signUp } = useAuth();

  const validateForm = () => {
    if (!firstName.trim()) return "Enter a valid first name";
    if (!lastName.trim()) return "Enter a valid last name";
    if (!email.includes("@")) return "Enter a valid email address";
    if (!password.trim()) return "Enter a valid password";
    if (password !== confirmPassword) return "Passwords do not match";
  
    const today = new Date();
    const birthDate = new Date(age); // `age` contains the date from the date input
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const ageAdjustment = today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0;
  
    if (calculatedAge - ageAdjustment <= 0) return "Enter a valid birth date";
    if (calculatedAge - ageAdjustment < 18) return "You must be at least 18 years old";
  
    return null; // No errors
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const errorMessage = validateForm();
    if (errorMessage) {
      setAlertMessage(errorMessage);
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      return;
    }
  
    // All validations passed; proceed with form submission
    signUp(firstName, lastName, email, password, gender, age);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setGender("male");
    setAge("");
  };

  return (
    <div className="flex bg-[url('https://wallpapercave.com/wp/wp10117165.png')] bg-cover bg-center px-40 py-10 rounded-lg ">
      {alert && <CustomAlert1 message={alertMessage} color="red-500"/>}
      <div className="flex flex-col items-center justify-center h-fit dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
          <form className="flex flex-col text-sm" onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="First Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Last Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              placeholder="Email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label
              className="text-sm mb-2 text-gray-200 cursor-pointer"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label
              className="text-sm mb-2 text-gray-200 cursor-pointer"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
              id="age"
              type="date"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
              <p className="text-white">Already have an account?</p>
              <a
                className="text-sm text-blue-500 -200 hover:underline"
                href="/signin"
              >
                Login
              </a>
            </div>
            <button
              type="submit"
              className="text-md mx-auto mt-2 w-32 h-12 rounded bg-slate-700 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
            >
              <span className="absolute bg-blue-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-blue-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
