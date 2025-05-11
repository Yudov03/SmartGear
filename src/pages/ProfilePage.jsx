import { useState, useEffect } from "react";
import { Sun, Moon, Edit2, Save, User, Info, BookOpen, Mail } from "lucide-react";
import ChatBox from "../components/ChatBox.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import AxiosInstance from "../axios/AxiosInstance";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    AxiosInstance.get('users/me')
      .then(res => {
        setUser(res.data);
        setEditedUser(res.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      });
  }, []);

  const handleSave = async () => {
    try {
      await AxiosInstance.patch('users', {
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        email: editedUser.email
      });
      setUser(editedUser);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await AxiosInstance.patch('users/password', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setChangePasswordMode(false);
      setPasswords({ oldPassword: "", newPassword: "" });
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  const sections = [
    { key: 'about', title: 'About Me', icon: <User size={20} /> },
    { key: 'info', title: 'Personal Info', icon: <Info size={20} /> },
    { key: 'education', title: 'Education', icon: <BookOpen size={20} /> },
    { key: 'contact', title: 'Contact', icon: <Mail size={20} /> },
  ];
  const [activeTab, setActiveTab] = useState(sections[0].key);

  return (
    <div className={darkMode ? 'bg-dark text-light' : ''}>
      <div className={`container-fluid min-vh-100 d-flex flex-column p-0 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Header />

        {/* Theme & Edit Toggles */}
        <div className="d-flex justify-content-end p-3">
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-light me-2"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <button
            aria-label="Toggle Edit Mode"
            onClick={() => {
              if (editMode) handleSave();
              setEditMode(!editMode);
            }}
            className="btn btn-light"
          >
            {editMode ? <Save /> : <Edit2 />}
          </button>
        </div>

        {/* Hero & Profile Section */}
        <div className={`py-5 text-center ${darkMode ? 'bg-secondary text-light' : 'bg-light text-white'}`}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="card mx-auto" style={{ maxWidth: '900px' }}
          >
            <div className={`card-body ${darkMode ? 'bg-dark text-light' : ''}`}>            
              <div className="row align-items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="col-md-3 text-center mb-3 mb-md-0"
                >
                  <div className="position-relative d-inline-block">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
                      alt="Avatar"
                      className="rounded-circle img-fluid border border-light"
                      style={{ width: '128px', height: '128px', objectFit: 'cover' }}
                    />
                  </div>
                </motion.div>
                <div className="col-md-9 text-md-start text-center">
                  <motion.h1
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="display-6 fw-bold text-dark"
                  >
                    {editMode ? (
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          value={editedUser?.firstName || ''}
                          onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          value={editedUser?.lastName || ''}
                          onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                          placeholder="Last Name"
                        />
                      </div>
                    ) : (
                      `${user?.firstName || ''} ${user?.lastName || ''}`
                    )}
                  </motion.h1>
                  <motion.p
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-2 text-dark"
                  >
                    {editMode ? (
                      <input
                        type="email"
                        className="form-control"
                        value={editedUser?.email || ''}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        placeholder="Email"
                      />
                    ) : (
                      user?.email
                    )}
                  </motion.p>
                  <div className="d-flex justify-content-center justify-content-md-start gap-2">
                    {['Software Engineer','Student'].map((role, idx) => (
                      <span key={idx} className="badge bg-secondary text-wrap">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content with Tabs */}
        <main className="flex-grow-1 container py-4">
          {/* Tab Nav */}
          <ul className="nav nav-tabs mb-3 justify-content-center">
            {sections.map(({ key, title, icon }) => (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link text-secondary ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className="me-2">{icon}</span>
                  {title}
                </button>
              </li>
            ))}
          </ul>

          {/* Sections */}
          {activeTab === 'about' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="card mb-4"
            >
              <div className="card-header">
                <h2 className="h5 mb-0 d-flex align-items-center gap-2">
                  <User size={20} /> About Me
                </h2>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  I am a passionate developer with a keen interest in building innovative solutions. Currently pursuing my education at Ho Chi Minh City University of Technology, I specialize in full-stack development and have a particular fondness for creating intuitive user interfaces.
                </p>
              </div>
            </motion.div>
          )}

          {['info', 'education', 'contact'].includes(activeTab) && (
            <div className="row g-3 d-flex align-items-center justify-content-center">
              {[
                {
                  key: 'info',
                  title: 'Personal Info',
                  icon: <Info size={20} />,
                  items: [
                    { label: 'First Name', value: user?.firstName || 'N/A', editable: true },
                    { label: 'Last Name', value: user?.lastName || 'N/A', editable: true },
                    { label: 'Email', value: user?.email || 'N/A', editable: true },
                    {
                      label: 'Password',
                      value: '********',
                      action: () => setChangePasswordMode(true)
                    },
                  ],
                },
                {
                  key: 'education',
                  title: 'Education',
                  icon: <BookOpen size={20} />,
                  items: [
                    { label: 'University', value: 'HCMUT' },
                    { label: 'Major', value: 'Computer Science' },
                    { label: 'Graduation', value: '2025' },
                  ],
                },
                {
                  key: 'contact',
                  title: 'Contact',
                  icon: <Mail size={20} />,
                  items: [
                    { label: 'Email', value: user?.email, isLink: true, href: `mailto:${user?.email}` },
                    { label: 'GitHub', value: 'github.com/duydottrue', isLink: true, href: 'https://github.com/duydottrue' },
                    { label: 'LinkedIn', value: 'vo-ly-dac-duy', isLink: true, href: '#'},
                  ],
                },
              ]
                .filter(sec => sec.key === activeTab)
                .map((section) => (
                  <motion.div
                    key={section.key}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="col-md-4"
                  >
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center gap-2">
                        {section.icon} {section.title}
                      </div>
                      <ul className="list-group list-group-flush">
                        {section.items.map(({ label, value, isLink, href, editable, action }) => (
                          <li className="list-group-item d-flex justify-content-between" key={label}>
                            <strong>{label}:</strong>
                            {editable && editMode ? (
                              <input
                                type="text"
                                className="form-control"
                                value={editedUser[label.toLowerCase().replace(' ', '')] || ''}
                                onChange={(e) => setEditedUser({
                                  ...editedUser,
                                  [label.toLowerCase().replace(' ', '')]: e.target.value
                                })}
                              />
                            ) : isLink ? (
                              <a href={href} target="_blank" rel="noopener noreferrer">
                                {value}
                              </a>
                            ) : action ? (
                              <button 
                                className="btn btn-link p-0" 
                                onClick={action}
                              >
                                Change Password
                              </button>
                            ) : (
                              <span>{value}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
          
          {/* Password Change Modal */}
          {changePasswordMode && (
            <div className="modal" style={{ display: 'block' }} tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className={`modal-title ${darkMode ? "text-dark" : "text-dark"}`}>Change Password</h5>
                    <button type="button" className="btn-close" onClick={() => setChangePasswordMode(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className={`form-label ${darkMode ? "text-dark" : "text-dark"}`}>Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwords.oldPassword}
                        onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={`form-label ${darkMode ? "text-dark" : "text-dark"}`}>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setChangePasswordMode(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <div className="fixed bottom-[50px] right-[50px] z-50">
          {<ChatBox />}
        </div>
        <Footer />
      </div>
    </div>
  );
}