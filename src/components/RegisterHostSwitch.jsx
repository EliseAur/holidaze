import { Switch } from "@headlessui/react";
import PropTypes from "prop-types";

/**
 * SwitchField component renders a toggle switch with a label.
 * It allows users to toggle between two states (checked/unchecked).
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text displayed next to the switch.
 * @param {boolean} props.checked - The current state of the switch (true for checked, false for unchecked).
 * @param {Function} props.onChange - Function to handle the state change of the switch.
 * @param {string} [props.textColor] - Optional text color for the label.
 * @param {string} [props.textShadow] - Optional text shadow for the label.
 * @returns {JSX.Element} The toggle switch with a label.
 *
 * @example
 * <SwitchField
 *   label="Enable Notifications"
 *   checked={isEnabled}
 *   onChange={handleToggle}
 *   textColor="text-black"
 *   textShadow="shadow-md"
 * />
 */
export default function SwitchField({
  label,
  checked,
  onChange,
  textColor,
  textShadow,
}) {
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
      <label
        className={`text-md font-bold text-left ml-2 ${textShadow} ${textColor}`}
      >
        {label}
      </label>
    </div>
  );
}

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  textShadow: PropTypes.string,
};
