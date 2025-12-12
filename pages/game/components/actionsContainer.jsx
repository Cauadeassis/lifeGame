import React, { useState } from "react";
import ActionButton from "./actionButton";
import advanceYearButton from "./advanceYearButton";
import Users from "./icons/Users";
import GraduationCap from "./icons/GraduationCap";
import styles from "./actionsContainer.module.css";
import AdvanceYearButton from "./advanceYearButton";

const ActionMenu = ({ onNavigate, currentPage = "home" }) => {
  const menuItems = [
    { id: "school", icon: GraduationCap, label: "Escola" },
    { id: "relationship", icon: Users, label: "Relacionamentos" },
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
      <AdvanceYearButton />
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
