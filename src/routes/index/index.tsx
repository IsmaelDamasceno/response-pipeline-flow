import { FaFileUpload } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";

export function Index() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center shadow shadow-thick-hover p-10 hover:p-12 rounded-[2rem] transition-all">
        <h1 className="text-gray-50">Welcome to Response Pipeline Flow</h1>
        <h2 className="text-gray-400">To get started:</h2>
        <ul className="list-disc p-10 text-gray-500 selection-list">
          <li
            className="flex !px-5 items-center gap-x-2 hover-scale"
            data-scale="2"
          >
            <FaFileCirclePlus size="1.25rem" />
            <p>Create new Flow</p>
          </li>
          <li
            className="flex !px-5 items-center gap-x-2 hover-scale"
            data-scale="2"
          >
            <FaFileUpload size="1.25rem" />
            <p>Load existing Flow</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
