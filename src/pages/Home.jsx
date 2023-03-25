import React from "react";
import { Input, useTheme } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
const Home = () => {
  const { theme } = useTheme();
  const handleSearch = () => {
    console.log("Search Button clicked");
    alert("To be implemented!");
  };
  return (
    <div
      className="container"
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        }}
      >
        <Input
          placeholder="Search for a file"
          width="100%"
          aria-label="Search for a file"
          style={{ paddingLeft: "2rem" }}
          contentRightStyling={false}
          contentRight={
            <FaSearch
              style={{ cursor: "pointer", marginRight: "1rem" }}
              onClick={() => {
                console.log("first");
                handleSearch();
              }}
              color={theme.colors.accents5}
            />
          }
        />
      </div>
    </div>
  );
};

export default Home;
