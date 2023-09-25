import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface CategoryDropdownProps {
  options: string[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string | null) => {
    setSelectedOption(option);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedOption || "Search books based on category"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option} onSelect={() => handleSelect(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;
