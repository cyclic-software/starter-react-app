import React from 'react';
import { FloatButton } from 'antd';
import { MenuOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
const MenuButton = () => (
  <FloatButton.Group icon={<MenuOutlined />} type="primary" trigger="click" >
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
    <FloatButton icon={<LogoutOutlined />} />
  </FloatButton.Group>
);
export default MenuButton;