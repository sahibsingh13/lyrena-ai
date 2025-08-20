import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import SettingsModal from "../settings/SettingsModal";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
	const [extended, setExtended] = useState(true);
	const [showSettings, setShowSettings] = useState(false);
	const { onSent, prevPrompts, setRecentPrompt, newChat, username } = useContext(Context);

	const loadPreviousPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};
	return (
		<>
			{mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />}
			<div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
				<div className="top">
				<div className="sidebar-header">
					<img
						src={assets.menu_icon}
						className="menu"
						alt="menu-icon"
						onClick={() => {
							setExtended((prev) => !prev);
						}}
						title={extended ? "Collapse sidebar" : "Expand sidebar"}
					/>
					{extended && (
						<div className="sidebar-title">
							<h3>Lyrena AI</h3>
						</div>
					)}
				</div>
				{extended && username && (
					<div className="username-display">
						<p>
							<div className="user-avatar">
								{username.charAt(0).toUpperCase()}
							</div>
							{username}
						</p>
					</div>
				)}
				<div className="new-chat">
					<img src={assets.plus_icon} alt="" onClick={()=>{
                        newChat()
                    }} />
					{extended ? <p>New Chat</p> : null}
				</div>
				{extended ? (
					<div className="recent">
						<p className="recent-title">Recent Chats</p>
						{prevPrompts.length > 0 ? (
							prevPrompts.map((item, index) => {
								return (
									<div 
										key={index}
										onClick={()=>{
											loadPreviousPrompt(item)
										}} 
										className="recent-entry"
										title={item}
									>
										<img src={assets.message_icon} alt="" />
										<p>{item.length > 60 ? item.slice(0, 60) + '...' : item}</p>
									</div>
								);
							})
						) : (
							<div className="no-recent">
								<p>No recent chats</p>
								<small>Start a new conversation to see it here</small>
							</div>
						)}
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item" title="Help & Support">
					<img src={assets.question_icon} alt="Help" />
					{extended ? <p>Help & Support</p> : null}
				</div>
				<div className="bottom-item" title="Chat History">
					<img src={assets.history_icon} alt="History" />
					{extended ? <p>Chat History</p> : null}
				</div>
				<div className="bottom-item" onClick={() => setShowSettings(true)} title="Settings">
					<img src={assets.setting_icon} alt="Settings" />
					{extended ? <p>Settings</p> : null}
				</div>
			</div>
			
			<SettingsModal 
				isOpen={showSettings} 
				onClose={() => setShowSettings(false)} 
			/>
			</div>
		</>
	);
};

export default Sidebar;
