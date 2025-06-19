import AddBtn from "./Buttons/AddBtn";
import DelBtn from "./Buttons/DelBtn";
import DetailsBtn from "./Buttons/DetailsBtn";
import EditBtn from "./Buttons/EditBtn";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg text-gray-700">
          This is the home page of your application.
        </p>
      </div>
      <AddBtn onClick={() => console.log("Add button clicked")} />
      <DelBtn onClick={() => console.log("Delete button clicked")} />
      <EditBtn onClick={() => console.log("Edit button clicked")} />
      <DetailsBtn onClick={() => console.log("Details button clicked")} />
    </>
  );
}
