import React, { useState } from "react";
import styles from "./actionsContainer.module.css";

import users from "../../icons/users.svg";
import graduationCap from "../../icons/graduationCap.svg";

import ActionButton from "../actionButton/actionButton.jsx";
import AdvanceYearButton from "../advanceYearButton/advanceYearButton";

const ActionMenu = ({ onNavigate, onAdvanceYear, currentPage = "home" }) => {
  const menuItems = [
    { id: "school", icon: graduationCap, label: "Escola" },
    { id: "relationship", icon: users, label: "Relacionamentos" },
  ];

  return (
    <nav className={styles.menu}>
      <div>
        {menuItems.slice(0, 1).map((item) => (
          <ActionButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => onNavigate(item.id)}
            isActive={currentPage === item.id}
          />
        ))}
      </div>
      <AdvanceYearButton onClick={onAdvanceYear} />
      <div>
        {menuItems.slice(1, 2).map((item) => (
          <ActionButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => onNavigate(item.id)}
            isActive={currentPage === item.id}
          />
        ))}
      </div>
    </nav>
  );
};

export default ActionMenu;
