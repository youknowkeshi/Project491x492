import React from 'react';
import { AutoComplete, Button, Flex, Segmented } from 'antd';
import { Col, Divider, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Breadcrumb, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        บทความ
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Gen key
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        แบบประเมิน
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        log out
      </a>
    ),
  },
];

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#f6ffed',
};

const additionalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function Home() {
  return (
    <main>
      <Layout>
        <header style={{ ...headerStyle, ...additionalHeaderStyle }}>
          <div className="navbar" style={{ flex: 1 }}>
            <Flex justify="start" align="start">
              <p>Engineer Mind Friend</p>
            </Flex>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="text">หน้าแรก</Button>
            <Button type="text">รายการนัด</Button>
            <Button type="text">ข้อมูลผู้ใช้</Button>
            <Button type="text">รายงาน</Button>
            <Button type="text">นัดหมาย</Button>
            <Button>
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <MenuOutlined />
                </Dropdown>
              </Space>
            </Button>
          </div>
        </header>
      </Layout>

      <Layout>
        <Content style={{ padding: 48 }}>
          <Breadcrumb style={{ margin: 50 }} />
          <div>Content</div>
          <button className="btn">Button</button>
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
        </Content>
      </Layout>
    </main>
  );
}
