import { CiCirclePlus } from "react-icons/ci";

const Navbar = ({ handleOpen, setUser, onSearch }) => {
  const handleSearchTerm = (e) => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  const handleAdd = () => {
    handleOpen("add");
    setUser([
      {
        name: "",
        email: "",
        job: "",
        rate: "",
        isactive: "",
      },
    ]);
  };

  return (
    <div className="py-8 px-5">
      <div className="flex justify-between">
        {/** Logo */}
        <a
          href="#"
          className="absolute top-0 h-20 text-white text-2xl px-6 py-4 bg-gradient-to-br from-blue-900 to-gray-500 rounded-b-full font-bold"
        >
          CRUD
        </a>
        <div>
          {" "}
        </div>

        {/** Input */}
        <input
          type="text"
          onChange={handleSearchTerm}
          className="border rounded-2xl outline-none px-5 py-2 border-gray-500 text-white"
          placeholder="Search Some Thing....."
        />

        {/** Add Button */}
        <button
          onClick={handleAdd}
          className="text-white font-semibold flex items-center gap-1 px-3 rounded-2xl bg-green-700 cursor-pointer hover:bg-green-800"
        >
          <CiCirclePlus size={20} />
          Add post
        </button>
      </div>
    </div>
  );
};

export default Navbar;
