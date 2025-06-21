import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Admin Panel</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/users-list">
            <span
              className="icon"
              style={{
                background: page === 'users-list' ? color : '',
              }}
            >
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 0-2.725 1.377c-.136.287.102.58.418.58h1.449c.01-.077.025-.156.045-.237ZM12.847 11.763c.02.08.036.16.046.237h1.446c.316 0 .554-.293.417-.579a2.5 2.5 0 0 0-2.722-1.378c.374.51.653 1.09.813 1.72ZM14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 13c-.552 0-1.013-.455-.876-.99a4.002 4.002 0 0 1 7.753 0c.136.535-.324.99-.877.99H5Z" />
              </svg>
            </span>
            <span className="label">Users List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="2">
          <NavLink to="/devices-list">
            <span
              className="icon"
              style={{
                background: page === 'devices-list' ? color : '',
              }}
            >
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.47 2.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H5.75a.75.75 0 0 1 0-1.5h5.69l-.97-.97a.75.75 0 0 1 0-1.06Zm-4.94 6a.75.75 0 0 1 0 1.06l-.97.97h5.69a.75.75 0 0 1 0 1.5H4.56l.97.97a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="label">Devices List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="3">
          <NavLink to="/categories-list">
            <span
              className="icon"
              style={{
                background: page === 'categories-list' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              </svg>
            </span>
            <span className="label">Categories List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="4">
          <NavLink to="/articles-list">
            <span
              className="icon"
              style={{
                background: page === 'articles-list' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="label">Articles List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="5">
          <NavLink to="/ai-list">
            <span
              className="icon"
              style={{
                background: page === 'ai-list' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M10.618 10.26c-.361.223-.618.598-.618 1.022 0 .226-.142.43-.36.49A6.006 6.006 0 0 1 8 12c-.569 0-1.12-.08-1.64-.227a.504.504 0 0 1-.36-.491c0-.424-.257-.799-.618-1.021a5 5 0 1 1 5.235 0ZM6.867 13.415a.75.75 0 1 0-.225 1.483 9.065 9.065 0 0 0 2.716 0 .75.75 0 1 0-.225-1.483 7.563 7.563 0 0 1-2.266 0Z" />
              </svg>
            </span>
            <span className="label">Ai List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="6">
          <NavLink to="/price-list">
            <span
              className="icon"
              style={{
                background: page === 'price-list' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z"
                  clipRule="evenodd"
                />
                <path d="M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z" />
              </svg>
            </span>
            <span className="label"> Price List</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/banner">
            <span
              className="icon"
              style={{
                background: page === 'banner' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.89 4.111a5.5 5.5 0 1 0 0 7.778.75.75 0 1 1 1.06 1.061A7 7 0 1 1 15 8a2.5 2.5 0 0 1-4.083 1.935A3.5 3.5 0 1 1 11.5 8a1 1 0 0 0 2 0 5.48 5.48 0 0 0-1.61-3.889ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="label">Banner List</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="user-prompt">
          <NavLink to="/user-prompt">
            <span
              className="icon"
              style={{
                background: page === 'user-prompt' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M8 1a7 7 0 1 0 7 7A7.008 7.008 0 0 0 8 1Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" />
                <path d="M10.5 6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.25 6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </span>
            <span className="label">User Prompt Data</span>
          </NavLink>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="8">
          <NavLink to="/alla-category-list">
            <span
              className="icon"
              style={{
                background: page === 'alla-category-list' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              </svg>
            </span>
            <span className="label">Alla Categories List</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9">
          <NavLink to="/alla-audio">
            <span
              className="icon"
              style={{
                background: page === 'alla-audio' ? color : '',
              }}
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M8 1a7 7 0 1 0 7 7A7.008 7.008 0 0 0 8 1Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" />
                <path d="M10.5 6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.25 6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </span>
            <span className="label">Alla Audio</span>
          </NavLink>
        </Menu.Item>


      </Menu>
    </>
  );
}

export default Sidenav;
