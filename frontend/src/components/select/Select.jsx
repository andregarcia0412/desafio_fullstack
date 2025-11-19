import React, { forwardRef } from "react";
import Select from "react-select"

const CategorySelect = forwardRef(({options = [], placeholder = "Select a category"}, ref) => {
  const [selected, setSelected] = React.useState(null);

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "40px",
      minHeight: "40px",
      backgroundColor: "#27272A",
      border: "1px solid #3F3F46",
      borderRadius: "8px",
      boxShadow: "none",
      outline: "none",
      paddingLeft: "0px",
      paddingRight: "10px",
      color: "#FFF",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #3F3F46",
      },
    }),

    valueContainer: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      paddingLeft: "10px",
      paddingTop: 0,
      paddingBottom: 0,
    }),

    singleValue: (base) => ({
      ...base,
      padding: 0,
      margin: 0,
      color: "#FFF",
      lineHeight: "normal",
      transform: "translateY(30px)",
    }),

    placeholder: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      height: "100%",
      margin: 0,
      color: "#FFF",
      opacity: 0.5,
      textAlign: "left",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#FFF",
      padding: "0 8px",
      alignSelf: "center",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#27272A",
      borderRadius: "8px",
      overflow: "hidden",
      zIndex: 10,
      animation: "fadeSlide 0.15s ease-out",
    }),

    menuList: (base) => ({
      ...base,
      paddingTop: 4,
      paddingBottom: 4,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#FFF"
        : state.isFocused
        ? "#FFF"
        : "#27272A",
      color: state.isSelected ? "#000" : state.isFocused ? "#000" : "#FFF",
      padding: "8px 10px",
      cursor: "pointer",
      textAlign: "left",
    }),
  };

  return (
        <Select
          options={options}
          value={selected}
          onChange={(option) => setSelected(option)}
          placeholder={placeholder}
          styles={selectStyles}
          isSearchable={false}
          ref={ref}
        />
  )
})

export default CategorySelect;
