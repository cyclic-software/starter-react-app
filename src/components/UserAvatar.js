import React from "react";
import Avatar from "boring-avatars";

export default function UserAvatar(props) {
  const { name, size, textColor } = props;

  return (
    <div className="avatar-box">
      <Avatar
        size={size}
        name={name}
        variant="beam"
        colors={["#0e2603", "#628c07", "#97bf06", "#daa520", "#b8d9b0"]}
      />
      <h6 className={`avatar-name ${textColor}`}>{name}</h6>
    </div>
  );
}
