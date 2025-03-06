import { Switch } from "@headlessui/react";
import PropTypes from "prop-types";

export default function SwitchField({ label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? "bg-lightGreen" : "bg-gray-200"}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 shadow-custom-dark `}
      >
        <span
          aria-hidden="true"
          className={`${checked ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
      <label className="text-md text-beige font-bold text-left ml-2 text-shadow">
        {label}
      </label>
    </div>
  );
}

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
