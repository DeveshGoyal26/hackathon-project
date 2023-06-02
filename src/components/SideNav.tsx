import React from "react";
import Select from "react-select";

const SideNav = ({ isDarkMode }: any) => {
  return (
    <div className="p-[32px]">
      <form
        onSubmit={() => {
          console.log("Submit");
        }}
      >
        <h1 className="text-2xl leading-7 font-bold">Curriculum Generator</h1>

        <p className="mt-[16px] text-[#374151] dark:text-inherit text-base leading-5 font-normal">
          Fill the following fields to generate the curriculum plan of choice
        </p>

        <div className="flex flex-col mt-[24px]">
          <label
            className="text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
            htmlFor="language"
          >
            Coding Language
          </label>
          <input
            type="text"
            name="language"
            placeholder="Enter coding language (Eg: React)"
            className="h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
          />
        </div>

        <p className="mt-[12px] text-sm leading-5 font-normal text-[#4B5563] dark:text-inherit">
          Suggested:
        </p>

        <div className="mt-[8px] flex flex-wrap gap-[8px] md:gap-[16px]">
          <button
            type="button"
            className="inline-flex items-center rounded-xl bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-gray-500/10"
          >
            React
          </button>

          <button
            type="button"
            className="inline-flex items-center rounded-xl bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-gray-500/10"
          >
            Javascript
          </button>
        </div>

        <div className="flex flex-col mt-[24px]">
          <label
            className="mb-[4px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
            htmlFor="time"
          >
            Time Period
          </label>
          {/* <input
            type="text"
            name="time"
            placeholder="Enter coding language (Eg: React)"
            className="h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
          /> */}
          <Select
            placeholder="Select"
            name="time"
            styles={{
              input: (provided, state) => ({
                ...provided,
                color: "inherit",
              }),
              control: (provided, state) => ({
                ...provided,
                minHeight: "42px",
                border: "1px solid #D1D5DB",
                background: "field",
                color: "inherit",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                "&:hover'": {
                  border: "1px solid #D1D5DB",
                },
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: isDarkMode ? "inherit" : "#6B7280",
              }),
              menu: (provided, state) => ({
                ...provided,
                background: "field",
                color: "inherit",
              }),
            }}
          />
        </div>

        <div className="mt-[24px]">
          <label className="mt-[24px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit">
            Expertise Level
          </label>

          <div className="flex flex-wrap mt-[8px]">
            <button
              type="button"
              style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
              className="rounded-[6px] border-[#D1D5DB] hover:bg-[#F9FAFB] dark:hover:bg-[#222222] text-[#374151] dark:text-inherit border p-[9px_17px]"
            >
              Beginner
            </button>
          </div>
        </div>

        <div className="mt-[24px]">
          <label className="mt-[24px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit">
          Curriculum Plan
          </label>

          <div className="flex flex-wrap mt-[8px]">
            <button
              type="button"
              style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
              className="rounded-[6px] border-[#D1D5DB] hover:bg-[#F9FAFB] dark:hover:bg-[#222222] text-[#374151] dark:text-inherit border p-[9px_17px]"
            >
              Lesson Plan
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-[24px]">
          <label
            className="text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
            htmlFor="comments"
          >
            Additional Comments (Optional)
          </label>
          <textarea
            name="comments"
            rows={4}
            placeholder="Enter coding language (Eg: React)"
            className="px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-[32px] transition-colors ring-offset-1 focus:ring-2 focus-visible:ring-2 rounded-[6px] bg-[#2563EB] hover:bg-[#225bd7] h-[50px] text-white dark:text-inherit"
        >
          Generate Curriculum Plan
        </button>
      </form>
    </div>
  );
};

export default SideNav;
