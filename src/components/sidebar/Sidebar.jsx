import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import SettingsModal from "../settings/SettingsModal";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
	const [extended, setExtended] = useState(false);
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
				<img
					src={assets.menu_icon}
					className="menu"
					alt="menu-icon"
					onClick={() => {
						setExtended((prev) => !prev);
					}}
				/>
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
						<p className="recent-title">Recent</p>
						{prevPrompts.map((item, index) => {
							return (
								<div 
									key={index}
									onClick={()=>{
                                    	loadPreviousPrompt(item)
                                	}} 
                                	className="recent-entry"
                                >
									<img src={assets.message_icon} alt="" />
									<p>{item.length > 50 ? item.slice(0, 50) + '...' : item}</p>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry">
					<img src={assets.question_icon} alt="" />
					{extended ? <p>Help desk</p> : null}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.history_icon} alt="" />
					{extended ? <p>History</p> : null}
				</div>
				<div className="bottom-item recent-entry" onClick={() => setShowSettings(true)}>
					<img src={assets.setting_icon} alt="" />
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
