"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface FilterBarProps {
  onFilter: (filterType: string, value: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-wrap gap-3 justify-end items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filter by Price</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg border border-gray-200 rounded-md">
          <DropdownMenuItem onClick={() => onFilter("reset", null)}>
            Show all
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("price", "low-to-high")}>
            Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("price", "high-to-low")}>
            High to Low
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filter by Industry</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg border border-gray-200 rounded-md">
          <DropdownMenuItem onClick={() => onFilter("reset", null)}>
            Show all
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("industry", "Technology")}>
            Technology
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("industry", "Healthcare")}>
            Healthcare
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("industry", "Finance")}>
            Finance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("industry", "Education")}>
            Education
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex w-96 gap-2 border p-2 rounded-md">
        <Input
          type="text"
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => onFilter("keyword", searchTerm)}>Search</Button>
      </div>
    </div>
  );
};

export default FilterBar;
