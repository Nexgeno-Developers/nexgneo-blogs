"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface MultiSelectOption {
  value: string;
  label: string;
  category?: string;
  image?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        option.category?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  // Get selected options for display
  const selectedOptions = React.useMemo(() => {
    return options.filter((option) => selected.includes(option.value));
  }, [options, selected]);

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelectAll = () => {
    const allFilteredValues = filteredOptions.map((option) => option.value);
    const newSelected = Array.from(
      new Set([...selected, ...allFilteredValues])
    );
    onChange(newSelected);
  };

  const handleDeselectAll = () => {
    const filteredValues = filteredOptions.map((option) => option.value);
    onChange(selected.filter((value) => !filteredValues.includes(value)));
  };

  const isAllSelected = filteredOptions.every((option) =>
    selected.includes(option.value)
  );
  const isSomeSelected = filteredOptions.some((option) =>
    selected.includes(option.value)
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Selected Items Display */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedOptions.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {option.image && (
                <Image
                  src={option.image}
                  alt={option.label}
                  width={16}
                  height={16}
                  className="rounded-sm"
                />
              )}
              <span className="text-xs">{option.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemove(option.value)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Multi-Select Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">
                {selected.length > 0
                  ? `${selected.length} portfolio${
                      selected.length > 1 ? "s" : ""
                    } selected`
                  : placeholder}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search portfolios..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              {/* Bulk Actions */}
              {filteredOptions.length > 0 && (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      if (isAllSelected) {
                        handleDeselectAll();
                      } else {
                        handleSelectAll();
                      }
                    }}
                    className="font-medium"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isAllSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {isAllSelected ? "Deselect All" : "Select All"}
                    {isSomeSelected && !isAllSelected && " (Partial)"}
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Options */}
              <CommandEmpty>
                <div className="text-center py-6">
                  <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No portfolios found
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try adjusting your search terms
                  </p>
                </div>
              </CommandEmpty>

              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center gap-3 p-3"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={option.label}
                        width={32}
                        height={32}
                        className="rounded-sm object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {option.label}
                      </p>
                      {option.category && (
                        <p className="text-xs text-muted-foreground truncate">
                          {option.category}
                        </p>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
